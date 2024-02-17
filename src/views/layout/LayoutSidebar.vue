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
      <lyc-button
        v-for="route in frontRoutes"
        :key="route.name"
        :prefixIcon="route.meta?.icon"
        class="w-100 tal"
        :color="isActiveRoute(route.name)"
        vertical
        @click="handleRoute(route.name)"
      >
        {{ t(`${route.name}.title`) }}
      </lyc-button>
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
function isActiveRoute(name: string): string {
  return route.name === name ? 'text' : 'default';
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
