import type { RouteRecordName } from 'vue-router';

export const temp = '';
/**
 * 是否為權限路由
 * @param {RouteRecordName} name - 路由名稱
 * @returns {boolean} - 是否為權限路由
 */
export function isAccessRoute(name: RouteRecordName | null | undefined) {
  console.log(name);
  return /^access-\w+$/.test(name as string);
}
