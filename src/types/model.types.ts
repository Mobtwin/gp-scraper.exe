
import { Document, Types } from "mongoose";

export interface GAppPreview extends Document {
  _id: string;
  rank: number;
  previousRank: number;
  name: string;
  icon: string;
  installs: number;
  installsExact: number;
  dailyInstalls: number;
  released: Date;
}

export interface Collection extends Document {
  poster: string;
  name: string;
  plan: string;
  description: string;
  filter: string;
  apps: GAppPreview[];
}

export interface Position extends Document {
  _id: string;
  rank: number;
  date: Date;
}

export interface TimeLineEntry extends Document {
  date: Date;
  field: string;
  before: string[];
  after: string[];
  lang: string;
  country: string;
}

export interface SubPackage extends Document {
  text: string;
  description: string;
  price: number;
}

export interface Package extends Document {
  title: string;
  description: string;
  subs: SubPackage[];
}

export interface Developer extends Document {
  _id: string;
  name: string;
  accountState: boolean;
  timeLine: {
    date: Date;
    field: string;
    before: string;
    after: string;
  }[];
  removed: Date;
  created_at: Date;
  updated_at: Date;
}

export interface App extends Document {
  _id: string;
  name: string;
  summary: string;
  icon: string;
  positions: Position[];
  categories: string[];
  installs: number;
  installsExact: number;
  dailyInstalls: number;
  ratingsValue: number;
  topIn: {
    _id: string;
    rank: number;
    date: Date;
  };
  ratingsCount: number;
  reviewsCount: number;
  histogram: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  countries: string[];
  devId: string;
  devName: string;
  devEmail: string;
  devAddress: string;
  privacyPolicy: string;
  description: string;
  comments: string[];
  preregister: boolean;
  earlyAccessEnabled: boolean;
  isAvailableInPlayPass: boolean;
  website: string;
  playstoreUrl: string;
  removed: Date;
  published: boolean;
  crawled: Date;
  version: string;
  video: string;
  videoImage: string;
  previewVideo: string;
  headerImage: string;
  contentRating: string;
  contentRatingDescription: string;
  size: number;
  updated: Date;
  released: Date;
  type: string;
  genre: string;
  country: string;
  free: boolean;
  recentChanges: string;
  wearos: string;
  price: number;
  currency: string;
  ads: boolean;
  offersIAP: boolean;
  IAPRange: string;
  androidVersion: string;
  devCountry: string;
  similarApps: string[];
  screenshots: string[];
  collections: string[];
  timeLine: TimeLineEntry[];
  created_at: Date;
  updated_at: Date;
}

export interface GpTopChart extends Document {
  _id: string;
  list: GAppPreview[];
  updated_at: Date;
  created_at: Date;
}

export interface AsAppPreview extends Document {
  _id: string;
  rank: number;
  previousRank: number;
  name: string;
  icon: string;
  categories: string[];
  ratingsCount: number;
  released: Date;
  updated: Date;
  ratingsValue:number;
}

export interface AsTopChart extends Document {
  _id: string;
  list: AsAppPreview[];
  updated_at: Date;
  created_at: Date;
}

export interface AppStore extends Document {
  _id: string;
  pkId: string;
  name: string;
  icon: string;
  description: string;
  categories: string[];
  primaryCategory: string;
  contentRating: string;
  languages: string[];
  size: number;
  requiredOsVersion: string;
  released: Date;
  updated: Date;
  recentChanges: string;
  version: string;
  price: number;
  currency: string;
  free: boolean;
  type: string;
  topIn: {
    _id: string;
    rank: number;
    date: Date;
  };
  countries: string[];
  devId: number;
  devName: string;
  website: string;
  devUrl: string;
  ratingsValue: number;
  currentVersionRatingsValue: number;
  currentVersionReviewsCount: number;
  screenshots: string[];
  ipadScreenshots: string[];
  appletvScreenshots: string[];
  AppStoreUrl: string;
  positions: Position[];
  removed: Date;
  published: boolean;
  crawled: Date;
  similarApps: string[];
  timeLine: TimeLineEntry[];
  topChartsTimeLine: TimeLineEntry[];
  created_at: Date;
  updated_at: Date;
}

export interface SteamGame extends Document {
  _id: string;
  name: string;
  released: Date;
  required_age: number;
  price: number;
  dlc_count: number;
  description: string;
  about_the_game: string;
  summary: string;
  reviews: string;
  header_image: string;
  website: string;
  support_url: string;
  support_email: string;
  windows: boolean;
  mac: boolean;
  linux: boolean;
  metacritic_score: number;
  metacritic_url: string;
  achievements: number;
  recommendations: number;
  notes: string;
  supported_languages: string[];
  full_audio_languages: string[];
  packages: Package[];
  developers: string[];
  publishers: string[];
  categories: string[];
  genre: string;
  screenshots: string[];
  movies: string[];
  user_score: number;
  score_rank: string;
  positive: number;
  negative: number;
  estimated_owners: string;
  average_playtime_forever: number;
  average_playtime_2weeks: number;
  median_playtime_forever: number;
  median_playtime_2weeks: number;
  peak_ccu: number;
  tags: {
    _id: string;
    count: number;
  }[];
  published: boolean;
  removed: Date;
  crawled: Date;
  updated: Date;
  timeLine: TimeLineEntry[];
  created_at: Date;
  updated_at: Date;
}

export interface Analytics extends Document {
  _id: string;
  googlePlayApp: {
    updated: number;
    created: number;
    removed: number;
    total: number;
    createdApps: {
      _id: string;
      name: string;
      icon: string;
      released: Date;
    }[];
    removedApps: {
      _id: string;
      name: string;
      icon: string;
      installsExact: number;
      released: Date;
    }[];
  };
  googlePlayDev: {
    updated: number;
    created: number;
    removed: number;
    total: number;
  };
  appStoreApp: {
    updated: number;
    created: number;
    removed: number;
    total: number;
    createdApps: {
      _id: string;
      name: string;
      icon: string;
      released: Date;
    }[];
    removedApps: {
      _id: string;
      name: string;
      icon: string;
      currentVersionReviewsCount: number;
      released: Date;
    }[];
  };
  appStoreDev: {
    updated: number;
    created: number;
    removed: number;
    total: number;
  };
  created_at: Date;
  updated_at: Date;
}

export interface Data extends Document {
  key: string;
  value: string;
  code: string;
}

export interface MapData extends Document {
  key: string;
  value: string;
}

export interface GAppConstants extends Omit<Document,"collection"> {
  clusters: Data[];
  category: Data[];
  collection: Data[];
  sort: MapData[];
  age: MapData[];
  permission: MapData[];
}

export interface AppStoreConstants extends Omit<Document,"collection"> {
  collection: Data[];
  category: Data[];
  device: MapData[];
  sort: MapData[];
  markets: MapData[];
}

export interface Feature extends Document {
  status: boolean;
  fields: string[];
  filterMatch: boolean;
  filterRange: boolean;
  filterTerm: boolean;
  sort: boolean;
}

export interface Authorization extends Document {
  _id: string;
  plan: string;
  googlePlay: Feature;
  appStore: Feature;
  steam: Feature;
}

export interface Country extends Document {
  name: string;
  code: string;
}

export interface IConstants extends Document {
  g_play: GAppConstants;
  app_store: AppStoreConstants;
  steam: string;
  version: number;
  countries: Country[];
}

export interface Proxy extends Document {
  host: string;
  port: string;
  username: string;
  password: string;
}

export interface IConfig extends Document {
  gp_config: {
    top_chart_scanned_today: boolean;
    top_chart_checkpoint: string;
    delay: number;
    new_apps_first: boolean;
    new_devs_first: boolean;
    timeline: boolean;
    scan_apps: boolean;
    scan_devs: boolean;
  };
  as_config: {
    top_chart_scanned_today: boolean;
    top_chart_checkpoint: string;
    delay: number;
    new_apps_first: boolean;
    new_devs_first: boolean;
    timeline: boolean;
    scan_apps: boolean;
    scan_devs: boolean;
  };
  ipv4proxies: Proxy[];
  ipv6proxies: Proxy[];
}
export interface IMicroScrapper extends Document {
  ip: string;
  isRunning: boolean;
  runId:string;
  success:boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface ITopChartScrapperUpdate extends Omit<Document,"collection"> {
  country: string;
  collection: string;
  category: string;
  message: string;
  microScrapperId: Types.ObjectId | IMicroScrapper;
  createdAt: Date;
  updatedAt: Date;
}