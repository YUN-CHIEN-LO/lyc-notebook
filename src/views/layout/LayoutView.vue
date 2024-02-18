<template>
  <div
    id="lyc-app"
    :data-theme="layoutStore.getTheme"
  >
    <lyc-navbar>
      <LycIconButton
        icon="lycLogo"
        @click="handleToggleSidebar"
      />
      <p
        v-show="!layoutStore.getIsMobile"
        class="my-g-0 mx-s-2"
      >
        {{ t("system.projectName") }} | {{ t(routeTitle) }}
      </p>
      <template #tools>
        <!-- 進入後台 -->
        <LycIconButton
          v-if="!layoutStore.getIsMobile"
          icon="mdiPencil"
          v-lyc-tooltip="t('system.toAccess')"
          @click="handleAccessDashboard"
        />
        <!-- 切換語系 -->
        <LycIconButton
          v-if="!layoutStore.getIsMobile"
          icon="mdiTranslate"
          v-lyc-tooltip="t(`lang.${layoutStore.getLang}`)"
          @click="handleToggleLang"
        />
        <!-- 切換主題 -->
        <LycIconButton
          v-if="!layoutStore.getIsMobile"
          icon="mdiThemeLightDark"
          v-lyc-tooltip="t(`system.${layoutStore.getTheme}`)"
          @click="handleToggleTheme"
        />

        <!-- 更多資訊 -->
        <LycAvatar
          v-if="userStore.getIsLogin"
          class="ml-g-1"
          v-lyc-tooltip="t('system.moreInfo')"
          :url="userStore.user.photoURL"
          :alt="userStore.user.displayName"
          @click="handleMoreDrawer"
        />
        <LycIconButton
          v-else
          v-lyc-tooltip="t('system.moreInfo')"
          icon="mdiMenu"
          @click="handleMoreDrawer"
        />
      </template>
    </lyc-navbar>

    <div class="lyc-container">
      <transition
        mode="out-in"
        name="sidebar"
      >
        <aside
          v-if="showSidebar"
          aria-label="sidebar"
        >
          <LayoutSidebar style="width: 360px" />
        </aside>
      </transition>
      <main class="lyc-main">
        <router-view v-slot="{ Component }">
          <transition
            name="route"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <transition
        mode="out-in"
        name="sidebar"
      >
        <aside
          v-if="showPageList"
          aria-label="page-list"
        >
          <LayoutPageList style="width: 360px" />
        </aside>
      </transition>
    </div>

    <LayoutDrawer />

    <lyc-drawer
      v-if="!isTablet"
      v-model="showSidebarDrawer"
      direction="left"
    >
      <template #header>
        {{ t("system.projectName") }}
      </template>
      <LayoutSidebar />
    </lyc-drawer>

    <LycAlert v-model="layoutStore.systemAlert" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import useLayoutStore from '@/stores/layout';
import useUserStore from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';
import { useLycTooltip } from '@/components/directives';
import {
  computed, onMounted, onBeforeUnmount,
  watch,
} from 'vue';
import { DeviceEnum } from '@/types';
import LayoutDrawer from '@/views/layout/LayoutDrawer.vue';
import LayoutSidebar from '@/views/layout/LayoutSidebar.vue';
import LayoutPageList from '@/views/layout/LayoutPageList.vue';

const vLycTooltip = useLycTooltip();
// 使用多語系
const { t, locale } = useI18n();
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

const isTablet = computed(() => [DeviceEnum.desktop, DeviceEnum.tablet]
  .includes(layoutStore.windowSize));

const showSidebar = computed(() => layoutStore.showSidebar && !layoutStore.getIsMobile);
const showPageList = computed(() => layoutStore.showPageList && !layoutStore.getIsMobile);
const showSidebarDrawer = computed({
  get() {
    return layoutStore.showSidebar && layoutStore.getIsMobile;
  },
  set() {
    layoutStore.setShowSidebar(false);
  },
});

/**
 * 當 開啟/收合側邊欄
 */
function handleToggleSidebar() {
  // router.push('/');
  layoutStore.toggleSidebar();
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
  locale.value = layoutStore.getLang;
}

/**
 * 當 進入後台
 */
function handleAccessDashboard() {
  if (userStore.getIsLogin) router.push({ name: 'dashboard' });
  else router.push({ name: 'login' });
}

/**
 * 展開更多資訊抽屜
 */
function handleMoreDrawer() {
  layoutStore.setShowDrawer(true);
}

watch(() => layoutStore.getIsDesktop, (value: boolean): void => {
  if (value) layoutStore.setShowSidebar(true);
});

onMounted(() => {
  window.addEventListener('resize', () => layoutStore.setWindowWidth(
    window.visualViewport?.width
    ?? window.innerWidth,
  ));
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => { });
});
</script>

<style scoped lang="scss">
.lyc-container {
  display: flex;

  &>aside {
    overflow-x: hidden;
    overflow-y: auto;
  }

  &>main {
    flex: 1;
  }
}

.sidebar-enter-active,
.sidebar-leave-active {
  @include transitions(all 0.5s ease)
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  width: 0px;
}

.sidebar-enter-to,
.sidebar-leave-from {
  width: 360px;
}
</style>
