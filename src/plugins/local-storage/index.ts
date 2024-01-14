import { getEnumKeyByValue } from '@/utils';
import { StorageEnum } from '@/types';

class LocalStore {
  // 前綴字串
  prefix: string;

  constructor() {
    this.prefix = 'LYC-NOTEBOOK';
  }

  /**
   * 取得 local storage 變數
   * @param {number} item - 倉儲項目對應值
   * @returns {string | null} - 儲存值
   */
  get(item: number): string | null {
    return localStorage.getItem(this.getItemLabel(item));
  }

  /**
   * 設置 local storage 變數
   * @param {number} item - 倉儲項目對應值
   * @param {string} value - 變數寫入值
   */
  set(item: number, value: string | number): void {
    localStorage.setItem(this.getItemLabel(item), String(value));
  }

  /**
   * 移除 local storage 變數
   * @param {number} item - 倉儲項目對應值
   */
  remove(item: number): void {
    localStorage.removeItem(this.getItemLabel(item));
  }

  /**
   * 清除所有 local storage 變數
   */
  clearAll(): void {
    localStorage.clear();
  }

  /**
   * 取得 倉儲項目 對應鍵值
   * @param {number} item - 倉儲項目對應值 ex: 0
   * @returns {string} - 倉儲項目對應鍵值 ex: "THEME"
   */
  private getItemLabel(item: number): string {
    return `${this.prefix}-${getEnumKeyByValue(StorageEnum as LycLib.Enum, item)}`;
  }
}

export default new LocalStore();
