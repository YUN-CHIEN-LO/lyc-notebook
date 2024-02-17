<template>
  <lyc-row class="layout-sidebar">
    <lyc-column>
      <lyc-button
        prefixIcon="mdiHome"
        class="w-100 tal"
        vertical
        :color="isActiveRoute('home')"
        @click="handleRoute('home')"
      >
        {{ t(`home.title`) }}
      </lyc-button>
      <lyc-expansion
        v-for="route in frontRoutes"
        :key="route.name"
        :model-value="isExpandRoute(route.name)"
        readonly
      >
        <template #target>
          <lyc-button
            :prefixIcon="route.meta?.icon"
            class="w-100 tal"
            :color="isActiveRoute(route.name)"
            vertical
            @click="handleRoute(route.name)"
          >
            {{ t(`${route.name}.title`) }}
          </lyc-button>
        </template>
        <lyc-button
          v-for="childRoute in (route.children as RouteRecordRaw[])"
          :key="childRoute.name"
          class="w-100 tal "
          :color="isActiveRoute(childRoute.name as string)"
          vertical
          @click="handleRoute(childRoute.name as string)"
        >
          <span class="ml-s-7">
            {{ t(`${childRoute.name as string}.title`) }}
          </span>
        </lyc-button>
      </lyc-expansion>

      <lyc-button
        prefixIcon="mdiPencil"
        class="w-100 tal"
        vertical
        :color="isActiveRoute('dashboard')"
        @click="handleRoute('dashboard')"
      >
        {{ t(`dashboard.title`) }}
      </lyc-button>
    </lyc-column>
  </lyc-row>
</template>

<script setup lang="ts">
import frontRoutes from '@/router/routes/front';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import useLayoutStore from '@/stores/layout';
import type { RouteRecordRaw } from 'vue-router';

const { t } = useI18n();
// 使用 layout 倉儲
const layoutStore = useLayoutStore();
// 使用 路由器
const router = useRouter();
// 使用 路由
const route = useRoute();

/**
 *
 * @param name
 */
function isExpandRoute(name: string): boolean {
  return route.name === name || route.meta.parent === name;
}

/**
 *
 * @param name
 */
function isActiveRoute(name: string): string {
  if (route.name === name) return 'primary';
  if (route.meta.parent === name) return 'text';
  return 'default';
}

/**
 *
 * @param name
 */
function handleRoute(name: string) {
  router.push({ name });
  if (layoutStore.getIsMobile) layoutStore.setShowSidebar(false);
}
</script>

<style scoped lang="scss">
.layout-sidebar {
  width: 100%;
}
</style>
