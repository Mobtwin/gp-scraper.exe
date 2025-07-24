import { Document, Types } from "mongoose";
import mobtwinDB from "./connection.js";
import {
  analyticsSchema,
  appSchema,
  appStoreSchema,
  asTopChartSchema,
  collectionSchema,
  constantsSchema,
  developerSchema,
  gpTopChartSchema,
  iosCollectionSchema,
  microScrapper,
  appNotificationSchema,
  steamGameSchema,
  topChartScrapperUpdate,
} from "./schema.js";
import { IAppNotification } from "../../types/model.types.js";
import { Users } from "../user/models/user.schema.js";
import { UserNotification } from "../user/models/userNotifications.schema.js";

export interface IMicroScrapper extends Document {
  ip: string;
  isRunning: boolean;
  runId: string;
  success: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface ITopChartScrapperUpdate extends Omit<Document, "collection"> {
  country: string;
  collection: string;
  category: string;
  message: string;
  microScrapperId: Types.ObjectId | IMicroScrapper;
  createdAt: Date;
  updatedAt: Date;
}

export const MicroScrapper = mobtwinDB.model<IMicroScrapper>(
  "micro_scrapper",
  microScrapper
);
export const TopChartScrapperUpdate = mobtwinDB.model<ITopChartScrapperUpdate>(
  "top_chart_scrapper_update",
  topChartScrapperUpdate
);
export const G_Apps = mobtwinDB.model("g_apps", appSchema);
export const G_AppsCollection = mobtwinDB.model(
  "g_collections",
  collectionSchema
);
export const G_Developers = mobtwinDB.model("g_developers", developerSchema);
export const G_Top_Charts = mobtwinDB.model("g_top_chart", gpTopChartSchema);
export const Ios_Apps = mobtwinDB.model("ios_apps", appStoreSchema);
export const Ios_Developers = mobtwinDB.model(
  "ios_developers",
  developerSchema
);
export const Ios_Top_Charts = mobtwinDB.model(
  "ios_top_chart",
  asTopChartSchema
);
export const Ios_Collections = mobtwinDB.model(
  "ios_collections",
  iosCollectionSchema
);
export const Steam_Games = mobtwinDB.model("steam_games", steamGameSchema);
export const Constants = mobtwinDB.model("constants", constantsSchema);
export const Analytics = mobtwinDB.model("analytics", analyticsSchema);
export const AppNotification = mobtwinDB.model<IAppNotification>(
  "app_notification",
  appNotificationSchema
);
AppNotification.watch([{ $match: { operationType: "insert" } }]).on(
  "change",
  async (change) => {
    try {
      const notification = change.fullDocument as IAppNotification;
      if (!notification.appId) return;

      const appId = notification.appId;

      const users = await Users.find(
        {
          "pockets.list": {
            $elemMatch: { $regex: `^gp:app:${appId}(\\b|:)` },
          },
        },
        { _id: 1, email: 1 }
      );
      if(users.length === 0 ){
        console.log("no users following this app: "+appId)
        return;
      }
      console.log("found "+users.length+" users")
      for (const user of users) {
        await UserNotification.create({
          userId: user._id,
          type: notification.type,
          appId: notification.appId,
          appName: notification.appName,
          developerId: notification.developerId,
          developerName: notification.developerName,
          metadata: notification.metadata,
          relatedTo: notification.relatedTo,
        });

        // Optional: send email, WebSocket push, etc.
        console.log(`📬 Notified ${user.email} about ${notification.appId}`);
      }
    } catch (error) {console.error(error)}
  }
);
