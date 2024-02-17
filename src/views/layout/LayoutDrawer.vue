<template>
  <lyc-drawer v-model="showMoreDrawer">
    <template #header>
      <LycAvatar
        :url="userStore.user.photoURL"
        :alt="userStore.user.displayName"
        @click="handleClickAvatar"
      />
    </template>
    <!-- 切換語系 -->
    <lyc-button
      vertical
      prefix-icon="mdiTranslate"
      class="w-100 tal"
      @click="handleToggleLang"
    >
      {{ t(`lang.${layoutStore.getLang}`) }}
    </lyc-button>
    <!-- 切換主題 -->
    <lyc-button
      vertical
      prefix-icon="mdiThemeLightDark"
      class="w-100 tal"
      @click="handleToggleTheme"
    >
      {{ t(`system.${layoutStore.getTheme}`) }}
    </lyc-button>

    <!-- 登出使用者 -->
    <lyc-button
      vertical
      v-if="userStore.getIsLogin"
      prefix-icon="mdiLogout"
      class="w-100 tal"
      @click.prevent="handleLogout"
    >
      {{ t('login.logout') }}
    </lyc-button>

    <!-- 登入使用者 -->
    <lyc-button
      vertical
      v-if="showLogin"
      class="w-100 tal"
      prefix-icon="mdiLogin"
      @click.prevent="handleLogin"
    >
      {{ t('login.login') }}
    </lyc-button>
  </lyc-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useUserStore from '@/stores/user';
import useLayoutStore from '@/stores/layout';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

// 使用 使用者 倉儲
const userStore = useUserStore();
// 使用 layout 倉儲
const layoutStore = useLayoutStore();
// 使用 路由器
const router = useRouter();
// 使用 路由
const route = useRoute();
// 使用多語系
const { t, locale } = useI18n();

const showMoreDrawer = computed({
  get() {
    return layoutStore.showDrawer;
  },
  set(val) {
    layoutStore.setShowDrawer(val);
  },
});

// 是否顯示登入
const showLogin = computed(() => !userStore.getIsLogin
  && route.name !== 'login');

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
 * 當 登出使用者
 */
function handleLogout() {
  userStore.logoutUser();
  router.push({ name: 'login' });
}

/**
 * 當 登入使用者
 */
function handleLogin() {
  router.push({ name: 'login' });
}

/**
 * 當 點擊使用者
 */
function handleClickAvatar() {
  showMoreDrawer.value = false;
  router.push({ name: 'user' });
}
</script>

<style scoped lang="scss">
.lyc-avatar {
  cursor: pointer;
}
</style>
