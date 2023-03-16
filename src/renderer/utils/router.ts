import type { RouteLocationNormalized } from 'vue-router'

// 获取route的matched的第一个name
export function getRouteFirstName(route: RouteLocationNormalized) {
  return route.matched[0]?.name || route.name || 'Home'
}
