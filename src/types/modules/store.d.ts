// layout - 宣告 主題名稱
export enum ThemeEnum {
  'light', 'dark'
}

// layout - 宣告 語系名稱
export enum LangEnum {
  'en', 'zhTW'
}


declare global {
  namespace Store {
    // 主題名稱
    type ThemeType = Record<ThemeEnum, number>;
    // 語系名稱
    type LangType = Record<LangEnum, number>;
  }
}

