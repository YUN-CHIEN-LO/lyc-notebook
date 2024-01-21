import type { ComponentPropsOptions } from 'vue';
import { isFunction } from 'lodash';
// Base 64 編碼
const base64Char = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * 取得 隨機正整數
 * @param {number} max - 最大值
 * @param {number} min - 最小值
 * @returns {number} - 隨機正整數
 */
export function getRandomInt(max: number, min: number = 0): number {
  return min + Math.floor(Math.random() * max);
}

/**
 * 取得 唯一值序號
 * @param {number} length - 長度
 * @returns {string} Base 64 編碼字串
 */
export function getUniqueId(length: number = 8): string {
  return Array(length).fill(0).map(() => base64Char.charAt(getRandomInt(base64Char.length))).join('');
}

/**
 * 取得 元件屬性繼承
 * @param {LycLib.Data<ComponentPropsOptions>} props - 屬性
 * @param {ComponentPropsOptions} componentProps - 要繼承的元件屬性
 * @returns {LycLib.Data} - 屬性 key-value
 */
export function getComponentProps(props: ComponentPropsOptions, componentProps = {}) {
  const result = {} as LycLib.Data;

  // 確認繼承的元件參數存在
  Object.keys(componentProps).forEach((key) => {
    if (key in props) result[key] = props[key as keyof typeof props];
  });

  return result;
}

/**
 * 取得 元件事件繼承
 * @param {LycLib.Data} attrs - 所有標籤屬性
 * @returns {LycLib.Data} - 繼承事件
 */
export function getComponentListeners(attrs: LycLib.Data) {
  return Object.keys(attrs)
    ?.filter(
      (attr) => attr?.startsWith('on') && isFunction(attrs[attr]),
    )
    ?.reduce((res, key) => ({ ...res, [key]: attrs[key] }), {});
}
