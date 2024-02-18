import { defineStore } from 'pinia';
import { getEnumKeyByValue, getEnumCount } from '@/utils';
import lg from '@/plugins/local-storage';
import {
  ThemeEnum, StorageEnum, LangEnum, DeviceEnum, StorageBool,
} from '@/types';

const getState = () => ({
  // 當前主題
  theme: ThemeEnum.light,
  // 當前語系
  lang: LangEnum.en,
  // 當前裝置
  device: DeviceEnum.desktop,
  // 當前視窗寬
  windowWidth: 1200,
  windowSize: DeviceEnum.desktop,
  showDrawer: false,
  showSidebar: false,
  showPageList: false,
  systemAlert: undefined as LycLib.Alert,
});

export default defineStore('layout', {
  state: () => getState(),
  getters: {
    // 取得 當前主題
    getTheme: (state) => getEnumKeyByValue(ThemeEnum, state.theme),
    // 取得 當前語系
    getLang: (state) => getEnumKeyByValue(LangEnum, state.lang),
    getWindowSize: (state) => getEnumKeyByValue(DeviceEnum, state.windowSize),
    getIsMobile: (state) => state.device === DeviceEnum.mobile
      || state.windowSize === DeviceEnum.mobile,
    getIsDesktop: (state) => state.device === DeviceEnum.desktop
      || state.windowSize === DeviceEnum.desktop,
  },
  actions: {
    setShowDrawer(show: boolean) {
      this.showDrawer = show;
    },
    setShowSidebar(show: boolean) {
      this.showSidebar = show;
      lg.set(StorageEnum.SIDEBAR, show ? StorageBool.true : StorageBool.false);
    },
    setShowPageList(show: boolean) {
      this.showPageList = show;
      lg.set(StorageEnum.PAGE_LIST, show ? StorageBool.true : StorageBool.false);
    },
    /**
     * 設置當前主題
     * @param {number} theme - 主題
     */
    setTheme(theme: number) {
      this.theme = Number.isNaN(theme) ? ThemeEnum.light : theme;
      lg.set(StorageEnum.THEME, theme);
    },
    /**
     * 設置當前語系
     * @param {number} lang - 語系
     */
    setLang(lang: number) {
      this.lang = Number.isNaN(lang) ? LangEnum.en : lang;
      lg.set(StorageEnum.LANG, lang as number);
    },
    /**
     * 設置當前裝置
     */
    setDevice() {
      const platform = navigator.userAgent.toLowerCase();
      if (/(android|webos|iphone|ipad|ipod|blackberry|windows phone)/.test(platform)) {
        this.device = DeviceEnum.mobile;
      } else if (/mac|win|linux/i.test(platform)) {
        this.device = DeviceEnum.desktop;
      } else if (/tablet|ipad/i.test(platform)) {
        this.device = DeviceEnum.tablet;
      } else {
        this.device = DeviceEnum.desktop;
      }
    },
    setWindowWidth(width: number) {
      this.windowWidth = width;

      if (width < 768) this.windowSize = DeviceEnum.mobile;
      else if (width < 992) this.windowSize = DeviceEnum.tablet;
      else this.windowSize = DeviceEnum.desktop;
    },
    /**
     * 切換當前主題
     */
    toggleTheme() {
      this.setTheme((this.theme + 1) % getEnumCount(ThemeEnum));
    },
    /**
     * 切換當前語系
     */
    toggleLang() {
      this.setLang((this.lang + 1) % getEnumCount(LangEnum));
    },
    toggleSidebar() {
      this.setShowSidebar(!this.showSidebar);
    },
  },
});
