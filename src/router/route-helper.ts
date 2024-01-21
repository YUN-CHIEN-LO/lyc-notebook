export const temp = ""
import type { RouteRecordName } from "vue-router"
export function isAccessRoute(name: RouteRecordName | null | undefined) {
  return /^access\w+$/.test(name as string)
}