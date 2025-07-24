// src/services/app-update.service.ts
import { App as GApp } from "../types/model.types.js";
export const APP_CATEGORIES: string[] = [
  "Art and Design",
  "Auto and Vehicles",
  "Beauty",
  "Books and Reference",
  "Business",
  "Comics",
  "Communications",
  "Dating",
  "Education",
  "Entertainment",
  "Events",
  "Finance",
  "Food and Drink",
  "Health and Fitness",
  "House and Home",
  "Libraries and Demo",
  "Lifestyle",
  "Maps and Navigation",
  "Medical",
  "Music and Audio",
  "News and Magazines",
  "Parenting",
  "Personalization",
  "Photography",
  "Productivity",
  "Shopping",
  "Social",
  "Sports",
  "Tools",
  "Travel and Local",
  "Video Players and Editors",
  "Weather",
];

export const GAME_CATEGORIES: string[] = [
  "Action",
  "Adventure",
  "Arcade",
  "Board",
  "Card",
  "Casino",
  "Casual",
  "Educational",
  "Music",
  "Puzzle",
  "Racing",
  "Role Playing",
  "Simulation",
  "Sports",
  "Strategy",
  "Trivia",
  "Word",
];

export interface App {
  title: string;
  description: string;
  descriptionHTML: string;
  summary: string;
  installs: string;
  minInstalls: number;
  maxInstalls: number;
  score: number;
  scoreText: string;
  ratings: number;
  reviews: number;
  histogram: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  price: number;
  free: boolean;
  currency: string;
  priceText: string;
  available: boolean;
  offersIAP: boolean;
  IAPRange: string;
  androidVersion: string;
  androidVersionText: string;
  androidMaxVersion: string;
  developer: string;
  developerId: string;
  developerEmail: string;
  developerWebsite: string;
  privacyPolicy: string;
  developerInternalID: string;
  genre: string;
  genreId: string;
  categories: Array<{
    name: string;
    id: string;
  }>;
  icon: string;
  headerImage: string;
  screenshots: string[];
  contentRating: string;
  contentRatingDescription: string;
  adSupported: boolean;
  released: string;
  updated: number; // timestamp in milliseconds
  version: string;
  comments: any[]; // could be more specific if comment structure is known
  preregister: boolean;
  earlyAccessEnabled: boolean;
  isAvailableInPlayPass: boolean;
  appId: string;
  url: string;
  recentChanges: string;
}

interface Updates {
  simpleFields: Record<string, any>;
  timeLine: Change[];
}

class Change {
  date: Date;
  before: any;
  after: any;
  field: string;
  country: string;
  lang: string;

  constructor(
    before: any,
    after: any,
    field: string,
    country: string,
    language: string
  ) {
    this.date = new Date();
    this.before = before;
    this.after = after;
    this.field = field;
    this.country = country;
    this.lang = language;
  }
}

export class AppUpdateService {
  
  public createAppSyntax(app: App) {
    let type = "APP";
    if (
      app.categories?.some((category) => APP_CATEGORIES.includes(category.name))
    ) {
      type = "APP";
    } else if (
      app.categories?.some((category: { name: string; id: string }) =>
        GAME_CATEGORIES.includes(category.name)
      )
    ) {
      type = "GAME";
    } else {
      if (
        app.title?.toLowerCase().includes("game") ||
        app.summary?.toLowerCase().includes("game") ||
        app.description?.toLowerCase().includes("game")
      ) {
        type = "GAME";
      } else {
        type = "APP";
      }
    }

    const dbApp = {
      _id: app.appId,
      name: app.title,
      icon: app.icon,
      summary: app.summary,
      description: app.description,
      published: true,
      released: app.released,
      devName: app.developer,
      devId: app.developerId,
      website: app.developerWebsite,
      devEmail: app.developerEmail,
      installs: app.minInstalls,
      installsExact: app.maxInstalls,
      ratingsValue: Number(app.scoreText) || 0,
      ratingsCount: app.ratings,
      reviewsCount: app.reviews,
      histogram: app.histogram,
      price: app.price,
      currency: app.currency,
      free: app.free,
      offersIAP: app.offersIAP,
      IAPRange: app.IAPRange,
      androidVersion: app.androidVersion,
      headerImage: app.headerImage,
      privacyPolicy: app.privacyPolicy,
      screenshots: app.screenshots,
      ads: app.adSupported,
      genre: app.genre,
      updated: app.updated,
      type,
      version: app.version,
      playstoreUrl: app.url,
      categories: app.categories?.map((category: any) => category.name),
      contentRating: app.contentRating,
      contentRatingDescription: app.contentRatingDescription,
      comments: app.comments?.length > 0 ? app.comments : [],
      preregistered: app.preregister,
      earlyAccessEnabled: app.earlyAccessEnabled,
      isAvailableInPlayPass: app.isAvailableInPlayPass,
      crawled: new Date(),
      updated_at: new Date(),
    };
    return dbApp;
  }

  // Helper methods:

  private validateAppData(app: App): void {
    if (!app) throw new Error("App data is null or undefined");

    // Validate string fields
    const stringFields: ("title" | "description" | "version")[] = [
      "title",
      "description",
      "version",
    ];
    for (const field of stringFields) {
      if (app[field] && !this.isValidUtf8(app[field])) {
        throw new Error(`Invalid UTF-8 characters in ${field}`);
      }
    }

    // Add more validation as needed
  }

  private isBsonError(error: any): boolean {
    return (
      error.message.includes("bad string length in bson") ||
      error.message.includes("Invalid UTF-8 string") ||
      error.message.includes("bad embedded document length") ||
      error.message.includes("Invalid 0x6f type byte") ||
      error.message?.toLowerCase().includes("bson")
    );
  }

  private sanitizeForBson(updates: Updates): Updates {
    const sanitized = JSON.parse(JSON.stringify(updates)); // Deep clone

    // Sanitize strings
    for (const key in sanitized.simpleFields) {
      if (typeof sanitized.simpleFields[key] === "string") {
        sanitized.simpleFields[key] = this.sanitizeString(
          sanitized.simpleFields[key]
        );
      }
    }

    // Sanitize timeline items
    sanitized.timeLine = sanitized.timeLine.map((item: any) => {
      const cleanItem = { ...item };
      for (const key in cleanItem) {
        if (typeof cleanItem[key] === "string") {
          cleanItem[key] = this.sanitizeString(cleanItem[key]);
        }
      }
      return cleanItem;
    });

    return sanitized;
  }

  private aggressiveSanitizeForBson(updates: Updates): Updates {
    const sanitized = this.sanitizeForBson(updates);

    // Truncate very long strings
    for (const key in sanitized.simpleFields) {
      if (
        typeof sanitized.simpleFields[key] === "string" &&
        sanitized.simpleFields[key].length > 10000
      ) {
        sanitized.simpleFields[key] = sanitized.simpleFields[key].substring(
          0,
          10000
        );
      }
    }

    return sanitized;
  }

  private sanitizeString(str: string): string {
    // Remove non-UTF8 characters
    return str
      .replace(/[^\x00-\x7F]/g, "")
      .replace(/[\uFFFD]/g, "") // Remove replacement characters
      .normalize("NFKC"); // Normalize Unicode
  }

  private isValidUtf8(str: string): boolean {
    try {
      new TextEncoder().encode(str);
      return true;
    } catch {
      return false;
    }
  }
  public updateTheApp(app: App, dbApp: GApp) {
    const updates: Updates = { simpleFields: {}, timeLine: [] };

    this.updateTitle(app, dbApp, updates);
    this.updateAppId(app, dbApp, updates);
    this.updateIcon(app, dbApp, updates);
    this.updateDescription(app, dbApp, updates);
    this.updatePublishedStatus(app, dbApp, updates);
    this.updateDeveloperInfo(app, dbApp, updates);
    this.updateRatings(app, dbApp, updates);
    this.updatePrice(app, dbApp, updates);
    this.updateContentRating(app, dbApp, updates);
    this.updateUpdatedDate(app, dbApp, updates);
    this.updateVersion(app, dbApp, updates);
    this.updateCategories(app, dbApp, updates);
    this.updateReleasedDate(app, dbApp, updates);
    this.updateComments(app, dbApp, updates);
    this.updateSummary(app, dbApp, updates);
    this.updateMinInstalls(app, dbApp, updates);
    this.updateFree(app, dbApp, updates);
    this.updateReviews(app, dbApp, updates);
    this.updateHistogram(app, dbApp, updates);
    this.updateOffersIAP(app, dbApp, updates);
    this.updateIAPRange(app, dbApp, updates);
    this.updateAndroidVersion(app, dbApp, updates);
    this.updateHeaderImage(app, dbApp, updates);
    this.updatePrivacyPolicy(app, dbApp, updates);
    this.updateAdSupported(app, dbApp, updates);
    this.updateGenre(app, dbApp, updates);
    this.updateType(app, dbApp, updates);
    this.updatePreregister(app, dbApp, updates);
    this.updateEarlyAccessEnabled(app, dbApp, updates);
    this.updateCurrency(app, dbApp, updates);
    this.updateScreenshots(app, dbApp, updates);
    this.updateUrl(app, dbApp, updates);

    updates.simpleFields.updated_at = new Date();

    // Sanitize updates before saving
    let sanitizedUpdates = this.sanitizeForBson(updates);
    return {
      updateOne: {
        filter: { _id: dbApp._id },
        update: {
          $set: sanitizedUpdates.simpleFields,
          $push: {
            timeLine: {
              $each: sanitizedUpdates.timeLine,
              $position: 0,
            },
          },
        },
      },
    };
  }
  private updateUrl(app: App, dbApp: GApp, updates: Updates): void {
    updates.simpleFields.playstoreUrl = app.url;
    updates.simpleFields.recentChanges = app.recentChanges;
  }

  private updateScreenshots(app: App, dbApp: GApp, updates: Updates): void {
    if (app.screenshots?.length > 0) {
      if (dbApp?.screenshots?.length > 0) {
        for (let i = 0; i < dbApp.screenshots.length; i++) {
          let noUpdate = false;
          app.screenshots.map((screen) => {
            let id = screen.split("/").at(-1)!;
            if (dbApp.screenshots[i].includes(id)) {
              noUpdate = true;
            }
          });
          if (!noUpdate) {
            updates.simpleFields.screenshots = app.screenshots;
            updates.timeLine.unshift(
              new Change(
                [...dbApp.screenshots],
                [...app.screenshots],
                "screenshots",
                "US",
                "en"
              )
            );
            break;
          }
        }
      } else {
        // dbApp.screenshots = app.screenshots;
        updates.simpleFields.screenshots = app.screenshots;
      }
    }
  }
  private updateCurrency(app: App, dbApp: GApp, updates: Updates): void {
    if (app.currency?.length > 0 && app.currency != dbApp.currency) {
      // dbApp.currency = app.currency;
      updates.simpleFields.currency = app.currency;
      updates.timeLine.unshift(
        new Change([dbApp.currency], [app.currency], "currency", "US", "en")
      );
    }
  }
  private updateTitle(app: App, dbApp: GApp, updates: Updates): void {
    if (app.title && app.title?.length > 0 && app.title !== dbApp.name) {
      updates.timeLine.unshift(
        new Change([dbApp.name], [app.title], "name", "US", "en")
      );
      updates.simpleFields.name = app.title;
    }
  }
  private updateSummary(app: App, dbApp: GApp, updates: Updates): void {
    if (
      app.summary &&
      app.summary?.length > 0 &&
      app.summary !== dbApp.summary
    ) {
      updates.timeLine.unshift(
        new Change([dbApp.summary], [app.summary], "summary", "US", "en")
      );
      updates.simpleFields.summary = app.summary;
    }
  }

  private updateAppId(app: App, dbApp: GApp, updates: Updates): void {
    if (app.appId && app.appId?.length > 0 && app.appId !== dbApp._id) {
      updates.timeLine.unshift(
        new Change([dbApp._id], [app.appId], "pkId", "US", "en")
      );
      updates.simpleFields._id = app.appId;
    }
  }

  private updateIcon(app: App, dbApp: GApp, updates: Updates): void {
    if (app.icon && app.icon?.length > 0) {
      const iconSplitted = app.icon.split("/");
      if (!dbApp.icon?.includes(iconSplitted[iconSplitted.length - 2])) {
        updates.timeLine.unshift(
          new Change([dbApp.icon], [app.icon], "icon", "US", "en")
        );
      }
      updates.simpleFields.icon = app.icon;
    }
  }

  private updateDescription(app: App, dbApp: GApp, updates: Updates): void {
    if (
      app.description &&
      app.description?.length > 0 &&
      app.description !== dbApp.description
    ) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.description],
          [app.description],
          "description",
          "US",
          "en"
        )
      );
      updates.simpleFields.description = app.description;
    }
  }

  private updatePublishedStatus(app: App, dbApp: GApp, updates: Updates): void {
    if (!dbApp.published) {
      updates.simpleFields.published = true;
      updates.simpleFields.removed = null;
      updates.timeLine.unshift(
        new Change(false, true, "published", "US", "en")
      );
    }
  }

  private updateDeveloperInfo(app: App, dbApp: GApp, updates: Updates): void {
    if (
      app.developer &&
      app.developer?.length > 0 &&
      app.developer !== dbApp.devName
    ) {
      updates.timeLine.unshift(
        new Change([dbApp.devName], [app.developer], "devName", "US", "en")
      );
      updates.simpleFields.devName = app.developer;
    }

    if (
      app.developerId &&
      app.developerId?.length > 0 &&
      app.developerId !== dbApp.devId
    ) {
      updates.timeLine.unshift(
        new Change([dbApp.devId], [app.developerId], "devId", "US", "en")
      );
      updates.simpleFields.devId = app.developerId;
    }

    if (
      app.developerWebsite &&
      app.developerWebsite?.length > 0 &&
      app.developerWebsite !== dbApp.website
    ) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.website],
          [app.developerWebsite],
          "website",
          "US",
          "en"
        )
      );
      updates.simpleFields.website = app.developerWebsite;
    }
    if (
      app.developerEmail &&
      app.developerEmail?.length > 0 &&
      app.developerEmail !== dbApp.devEmail
    ) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.devEmail],
          [app.developerEmail],
          "devEmail",
          "US",
          "en"
        )
      );
      updates.simpleFields.devEmail = app.developerEmail;
    }
  }

  private updateMinInstalls(app: App, dbApp: GApp, updates: Updates): void {
    if (
      app.minInstalls &&
      app.minInstalls?.toFixed(0) > (0).toFixed(0) &&
      app.minInstalls?.toFixed(0) !== (dbApp.installs ?? 0).toFixed(0)
    ) {
      const roundedNumber = app.minInstalls?.toFixed(0);
      updates.timeLine.unshift(
        new Change([dbApp.installs], [roundedNumber], "installs", "US", "en")
      );
      updates.simpleFields.installs = roundedNumber;
    }

    if (
      app.maxInstalls &&
      app.maxInstalls?.toFixed(0) > (0).toFixed(0) &&
      app.maxInstalls?.toFixed(0) !== (dbApp.installsExact ?? 0).toFixed(0)
    ) {
      const roundedNumber = app.maxInstalls?.toFixed(0);
      updates.timeLine.unshift(
        new Change(
          [dbApp.installsExact],
          [roundedNumber],
          "installsExact",
          "US",
          "en"
        )
      );
      updates.simpleFields.installsExact = roundedNumber;
    }

    if (
      app.scoreText &&
      parseFloat(app.scoreText) > 0 &&
      parseFloat(app.scoreText) !== dbApp.ratingsValue
    ) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.ratingsValue],
          [parseFloat(app.scoreText)],
          "ratingsValue",
          "US",
          "en"
        )
      );
      updates.simpleFields.ratingsValue = parseFloat(app.scoreText);
    }
  }

  private updateRatings(app: App, dbApp: GApp, updates: Updates): void {
    if (app.ratings && app.ratings > 0 && app.ratings !== dbApp.ratingsCount) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.ratingsCount],
          [app.ratings],
          "ratingsCount",
          "US",
          "en"
        )
      );
      updates.simpleFields.ratingsCount = app.ratings;
    }
  }
  private updateReviews(app: App, dbApp: GApp, updates: Updates): void {
    if (app.reviews && app.reviews > 0 && app.reviews !== dbApp.reviewsCount) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.reviewsCount],
          [app.reviews],
          "reviewsCount",
          "US",
          "en"
        )
      );
      updates.simpleFields.reviewsCount = app.reviews;
    }
  }
  private updatePrice(app: App, dbApp: GApp, updates: Updates): void {
    if (app.price && app.price > 0 && app.price !== dbApp.price) {
      updates.timeLine.unshift(
        new Change([dbApp.price], [app.price], "price", "US", "en")
      );
      updates.simpleFields.price = app.price;
    }
  }
  private updateHistogram(app: App, dbApp: GApp, updates: Updates): void {
    if (typeof app.histogram === "object") {
      updates.simpleFields.histogram = app.histogram;
    }
  }
  private updateFree(app: App, dbApp: GApp, updates: Updates): void {
    if (typeof app.free === "boolean" && app.free != dbApp.free) {
      updates.timeLine.unshift(
        new Change([dbApp.free], [app.free], "free", "US", "en")
      );
      updates.simpleFields.free = app.free;
    }
  }
  private updateOffersIAP(app: App, dbApp: GApp, updates: Updates): void {
    if (app.offersIAP != undefined && app.offersIAP != dbApp.offersIAP) {
      updates.timeLine.unshift(
        new Change([dbApp.offersIAP], [app.offersIAP], "offersIAP", "US", "en")
      );
      updates.simpleFields.offersIAP = app.offersIAP;
    }
  }
  private updateIAPRange(app: App, dbApp: GApp, updates: Updates): void {
    if (app.IAPRange != null && app.IAPRange != dbApp.IAPRange) {
      updates.timeLine.unshift(
        new Change([dbApp.IAPRange], [app.IAPRange], "IAPRange", "US", "en")
      );
      updates.simpleFields.IAPRange = app.IAPRange;
    }
  }
  private updateAndroidVersion(app: App, dbApp: GApp, updates: Updates): void {
    if (app.androidVersion && app.androidVersion != dbApp.androidVersion) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.androidVersion],
          [app.androidVersion],
          "androidVersion",
          "US",
          "en"
        )
      );
      updates.simpleFields.androidVersion = app.androidVersion;
    }
  }
  private updateHeaderImage(app: App, dbApp: GApp, updates: Updates): void {
    if (!app.headerImage) return;
    const imageSplitted = app.headerImage.split("/");
    if (!dbApp.headerImage?.includes(imageSplitted[imageSplitted.length - 1])) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.headerImage],
          [app.headerImage],
          "headerImage",
          "US",
          "en"
        )
      );
      updates.simpleFields.headerImage = app.headerImage;
    }
  }

  private updatePrivacyPolicy(app: App, dbApp: GApp, updates: Updates): void {
    if (app.privacyPolicy && app.privacyPolicy !== dbApp.privacyPolicy) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.privacyPolicy],
          [app.privacyPolicy],
          "privacyPolicy",
          "US",
          "en"
        )
      );
      updates.simpleFields.privacyPolicy = app.privacyPolicy;
    }
  }
  private updateAdSupported(app: App, dbApp: GApp, updates: Updates): void {
    if (app.adSupported && app.adSupported !== dbApp.ads) {
      updates.timeLine.unshift(
        new Change([dbApp.ads], [app.adSupported], "ads", "US", "en")
      );
      updates.simpleFields.ads = app.adSupported;
    }
  }

  private updateGenre(app: App, dbApp: GApp, updates: Updates): void {
    if (app.genre?.length > 0 && app.genre != dbApp.genre) {
      updates.timeLine.unshift(
        new Change([dbApp.genre], [app.genre], "genre", "US", "en")
      );
      updates.simpleFields.genre = app.genre;
    }
  }
  private updateType(app: App, dbApp: GApp, updates: Updates): void {
    let type = "APP";
    if (
      app.categories?.some((category: { name: string; id: string }) =>
        APP_CATEGORIES.includes(category.name)
      )
    ) {
      type = "APP";
    } else if (
      app.categories?.some((category: { name: string; id: string }) =>
        GAME_CATEGORIES.includes(category.name)
      )
    ) {
      type = "GAME";
    } else {
      if (
        app.title?.toLowerCase().includes("game") ||
        app.summary?.toLowerCase().includes("game") ||
        app.description?.toLowerCase().includes("game")
      ) {
        type = "GAME";
      } else {
        type = "APP";
      }
    }
    if (type != dbApp.type) {
      updates.timeLine.unshift(
        new Change([dbApp.type], [type], "type", "US", "en")
      );
      updates.simpleFields.type = type;
    }
  }

  private updateUpdatedDate(app: App, dbApp: GApp, updates: Updates): void {
    if (
      app.updated &&
      new Date(app.updated).getTime() !==
        new Date(dbApp.updated ?? "").getTime()
    ) {
      updates.timeLine.unshift(
        new Change(
          [new Date(dbApp.updated ?? "").getTime()],
          [new Date(app.updated).getTime()],
          "updated",
          "US",
          "en"
        )
      );
      updates.simpleFields.updated = app.updated;
    }
  }

  private updateVersion(app: App, dbApp: GApp, updates: Updates): void {
    if (
      app.version &&
      app.version?.length > 0 &&
      app.version !== dbApp.version
    ) {
      updates.timeLine.unshift(
        new Change([dbApp.version], [app.version], "version", "US", "en")
      );
      updates.simpleFields.version = app.version;
    }
  }

  private updateComments(app: App, dbApp: GApp, updates: Updates): void {
    if (
      app.comments &&
      app.comments?.length > 0 &&
      app.comments !== dbApp.comments
    ) {
      updates.timeLine.unshift(
        new Change([dbApp.comments], [app.comments], "comments", "US", "en")
      );
      updates.simpleFields.comments = app.comments;
    }
  }
  private updatePreregister(app: App, dbApp: GApp, updates: Updates): void {
    if (
      app.preregister !== dbApp.preregister &&
      app.preregister !== undefined
    ) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.preregister],
          [app.preregister],
          "preregister",
          "US",
          "en"
        )
      );
      updates.simpleFields.preregister = app.preregister;
    }
  }
  private updateEarlyAccessEnabled(
    app: App,
    dbApp: GApp,
    updates: Updates
  ): void {
    if (
      app.earlyAccessEnabled !== dbApp.earlyAccessEnabled &&
      app.earlyAccessEnabled !== undefined
    ) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.earlyAccessEnabled],
          [app.earlyAccessEnabled],
          "earlyAccessEnabled",
          "US",
          "en"
        )
      );
      updates.simpleFields.earlyAccessEnabled = app.earlyAccessEnabled;
    }
    if (
      app.isAvailableInPlayPass !== dbApp.isAvailableInPlayPass &&
      app.isAvailableInPlayPass !== undefined
    ) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.isAvailableInPlayPass],
          [app.isAvailableInPlayPass],
          "isAvailableInPlayPass",
          "US",
          "en"
        )
      );
      updates.simpleFields.isAvailableInPlayPass = app.isAvailableInPlayPass;
    }
  }

  private updateContentRating(app: App, dbApp: GApp, updates: Updates): void {
    if (app.contentRating && !dbApp.contentRating) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.contentRating],
          [app.contentRating],
          "contentRating",
          "US",
          "en"
        )
      );
      updates.simpleFields.contentRating = app.contentRating;
    }
    if (
      app.contentRatingDescription?.length > 0 &&
      app.contentRatingDescription != dbApp.contentRatingDescription
    ) {
      updates.timeLine.unshift(
        new Change(
          [dbApp.contentRatingDescription],
          [app.contentRatingDescription],
          "contentRatingDescription",
          "US",
          "en"
        )
      );
      updates.simpleFields.contentRatingDescription =
        app.contentRatingDescription;
    }
  }

  private updateCategories(app: App, dbApp: GApp, updates: Updates): void {
    if (app.categories?.length) {
      app.categories.forEach((category) => {
        if (!dbApp.categories?.includes(category.name)) {
          const newCategories = app.categories.map((category) => category.name);
          if ((dbApp.categories ?? [])?.length > 0) {
            updates.timeLine.unshift(
              new Change(
                dbApp.categories,
                newCategories,
                "categories",
                "US",
                "en"
              )
            );
          }
          updates.simpleFields.categories = newCategories;
        }
      });
    }
  }

  private updateReleasedDate(app: App, dbApp: GApp, updates: Updates): void {
    if (!dbApp.released) {
      updates.simpleFields.released = app.released;
    } else if (
      new Date(dbApp.released).getTime() !==
      new Date(app.released ?? "").getTime()
    ) {
      updates.timeLine.unshift(
        new Change([dbApp.released], [app.released], "released", "US", "en")
      );
      updates.simpleFields.released = app.released;
    }
  }
}
