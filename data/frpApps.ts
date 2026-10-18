export interface FrpApp {
  id: string;
  name: string;
  category: "Shortcut" | "APK Tool";
  type: "intent" | "download";
  url: string;
}

export const frpApps: FrpApp[] = [
  {
    id: "settings",
    name: "Open Settings",
    category: "Shortcut",
    type: "intent",
    url: "intent://com.android.settings/#Intent;scheme=android.app;end",
  },
  {
    id: "chrome",
    name: "Open Chrome Browser",
    category: "Shortcut",
    type: "intent",
    url: "intent://com.android.chrome/#Intent;scheme=android.app;end",
  },
  {
    id: "youtube",
    name: "Open YouTube App",
    category: "Shortcut",
    type: "intent",
    url: "intent://com.android.youtube/#Intent;scheme=android.app;end",
  },
  {
    id: "galaxy-store",
    name: "Open Galaxy Store",
    category: "Shortcut",
    type: "intent",
    url: "intent://com.sec.android.app.samsungapps/#Intent;scheme=android.app;end",
  },
  {
    id: "quick-shortcut",
    name: "QuickShortcutMaker.apk",
    category: "APK Tool",
    type: "download",
    url: "https://github.com/RashedFrp/rashedfrp/releases/download/v1.0/QuickShortcutMaker.apk",
  },
];
