/**
 * 取得 eum 鍵值
 * @param {LycLib.Enum} enumObj - enum 物件
 * @param {number} value - enum 對應值
 * @returns {string} - enum 對應鍵值
 */
export function getEnumKeyByValue(enumObj: LycLib.Enum, value: number): string {
  return Object.keys(enumObj)[Object.values(enumObj).indexOf(value)];
}

/**
 * 取得 enum 數量
 * @param {LycLib.Enum} enumObj - enum 物件
 * @returns {number} - enum 數量
 */
export function getEnumCount(enumObj: LycLib.Enum): number {
  return Object.keys(enumObj).length / 2;
}
