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
        <LycIconButton
          v-lyc-tooltip="$t('system.moreInfo')"
          icon="mdiMenu"
          @click="handleMoreDrawer"
        />
      </template>
    </lyc-navbar>

    <main class="lyc-container">
      <router-view></router-view>
    </main>

    <lyc-drawer v-model="showMoreDrawer">
      <!-- 切換語系 -->
      <lyc-button
        vertical
        prefix-icon="mdiTranslate"
        class="w-100 tal"
        @click="handleToggleLang"
      >
        {{ $t(`lang.${layoutStore.getLang}`) }}
      </lyc-button>
      <!-- 切換主題 -->
      <lyc-button
        vertical
        prefix-icon="mdiThemeLightDark"
        class="w-100 tal"
        @click="handleToggleTheme"
      >
        {{ $t(`system.${layoutStore.getTheme}`) }}
      </lyc-button>

      <!-- 登出使用者 -->
      <lyc-button
        vertical
        v-if="userStore.getIsLogin"
        prefix-icon="mdiLogout"
        class="w-100 tal"
        @click.prevent="handleLogout"
      >
        {{ $t('loginView.logout') }}
      </lyc-button>

      <!-- 登入使用者 -->
      <lyc-button
        vertical
        v-if="showLogin"
        class="w-100 tal"
        prefix-icon="mdiLogin"
        @click.prevent="handleLogin"
      >
        {{ $t('loginView.login') }}
      </lyc-button>
    </lyc-drawer>
  </div>
</template>

<script setup lang="ts">
import { LycNavbar, LycDrawer } from '@/components/layout';
import { LycIconButton, LycButton } from '@/components/basic';
import useLayoutStore from '@/stores/layout';
import { useI18n } from 'vue-i18n';
import useUserStore from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';
import { useLycTooltip } from '@/components/directives';
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { isAccessRoute, AccessRoute, FrontRoute, getAccessName, getFrontName } from '@/router';
import { DeviceEnum } from '@/types';


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
const route = useRoute()
// 路由名稱
const routeTitle = computed(() => route.meta.title as string)

// 是否顯示登入
const showLogin = computed(() => !userStore.getIsLogin && route.name !== getFrontName(FrontRoute.login))
// 是否顯示後台
const showAccess = computed(() => !isAccessRoute(route.name) && route.name !== getFrontName(FrontRoute.login))
const isTablet = computed(() => [DeviceEnum.desktop, DeviceEnum.tablet].includes(layoutStore.windowSize));
const isDesktop = computed(() => [DeviceEnum.desktop].includes(layoutStore.windowSize));

const showMoreDrawer = computed({
  get() {
    return layoutStore.showDrawer
  },
  set(val) {
    layoutStore.setShowDrawer(val)
  }
})

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
 * 當 登出使用者
 */
function handleLogout() {
  userStore.logoutUser();
  router.push({ name: getFrontName(FrontRoute.login) });
}

/**
 * 當 登入使用者
 */
function handleLogin() {
  router.push({ name: getFrontName(FrontRoute.login) });
}

/**
 * 當 進入後台
 */
function handleAccessDashboard() {
  if (userStore.getIsLogin)
    router.push({ name: getAccessName(AccessRoute.dashboard) });
  else
    router.push({ name: getFrontName(FrontRoute.login) });
}

function handleMoreDrawer() {
  showMoreDrawer.value = true
}

onMounted(() => {
  window.addEventListener("resize", () => layoutStore.setWindowWidth(window.innerWidth))
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => { })
})
</script>
