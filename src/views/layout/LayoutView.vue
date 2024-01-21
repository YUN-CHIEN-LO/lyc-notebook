<template>
  <div
    id="lyc-app"
    :data-theme="layoutStore.getTheme"
  >
    <lyc-navbar>
      <LycIconButton
        icon="lycLogo"
        @click="handleHome"
      />
      <p
        v-show="isTablet"
        class="my-g-0 mx-g-3"
      >
        {{ $t("system.projectName") }} | {{ $t(routeTitle) }}
      </p>
      <template #tools>
        <!-- 進入後台 -->
        <LycIconButton
          v-if="showAccess"
          icon="mdiPencil"
          v-lyc-tooltip="$t('system.toAccess')"
          @click="handleAccessDashboard"
        />
        <!-- 切換語系 -->
        <LycIconButton
          v-if="isTablet"
          icon="mdiTranslate"
          v-lyc-tooltip="$t(`lang.${layoutStore.getLang}`)"
          @click="handleToggleLang"
        />
        <!-- 切換主題 -->
        <LycIconButton
          v-if="isDesktop"
          icon="mdiThemeLightDark"
          v-lyc-tooltip="$t(`system.${layoutStore.getTheme}`)"
          @click="handleToggleTheme"
        />

        <!-- 更多資訊 -->
        <LycAvatar
          v-if="userStore.getIsLogin"
          class="ml-g-1"
          v-lyc-tooltip="$t('system.moreInfo')"
          :url="userStore.user.photoURL"
          :alt="userStore.user.displayName"
          @click="handleMoreDrawer"
        />
        <LycIconButton
          v-else
          v-lyc-tooltip="$t('system.moreInfo')"
          icon="mdiMenu"
          @click="handleMoreDrawer"
        />
      </template>
    </lyc-navbar>

    <main class="lyc-container">
      <router-view></router-view>
    </main>

    <LayoutDrawer />

    <LycAlert v-model="layoutStore.systemAlert" />
  </div>
</template>

<script setup lang="ts">
import { LycNavbar, LycAlert } from '@/components/layout';
import { LycIconButton, LycAvatar } from '@/components/basic';
import { useI18n } from 'vue-i18n';
import useLayoutStore from '@/stores/layout';
import useUserStore from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';
import { useLycTooltip } from '@/components/directives';
import {
  computed, onMounted, onBeforeUnmount,
} from 'vue';
import {
  AccessRoute,
  FrontRoute,
  getAccessName,
  getFrontName,
  isAccessRoute,
} from '@/router';
import { DeviceEnum } from '@/types';
import LayoutDrawer from '@/views/layout/LayoutDrawer.vue';

const vLycTooltip = useLycTooltip();
// 使用多語系
const i18nInstance = useI18n();
// 使用 使用者 倉儲
const userStore = useUserStore();
// 使用 layout 倉儲
const layoutStore = useLayoutStore();
// 使用 路由器
const router = useRouter();
// 使用 路由
const route = useRoute();
// 路由名稱
const routeTitle = computed(() => `${route.name as string}.title`);

// 是否顯示後台
const showAccess = computed(
  () => !isAccessRoute(route.name),
);
const isTablet = computed(() => [DeviceEnum.desktop, DeviceEnum.tablet]
  .includes(layoutStore.windowSize));
const isDesktop = computed(() => [DeviceEnum.desktop].includes(layoutStore.windowSize));

/**
 * 當 回到主頁
 */
function handleHome() {
  router.push('/');
}

/**
 * 當 切換主題
 */
function handleToggleTheme() {
  layoutStore.toggleTheme();
}

/**
 * 當 切換語系
 */
function handleToggleLang() {
  layoutStore.toggleLang();
  i18nInstance.locale.value = layoutStore.getLang;
}

/**
 * 當 進入後台
 */
function handleAccessDashboard() {
  if (userStore.getIsLogin) router.push({ name: getAccessName(AccessRoute.dashboard) });
  else router.push({ name: getFrontName(FrontRoute.login) });
}

/**
 * 展開更多資訊抽屜
 */
function handleMoreDrawer() {
  layoutStore.setShowDrawer(true);
}

onMounted(() => {
  window.addEventListener('resize', () => layoutStore.setWindowWidth(window.innerWidth));
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => { });
});
</script>
