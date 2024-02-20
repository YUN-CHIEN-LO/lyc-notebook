<template>
  <div>
    <RoutePanel
      color="primary"
      :scrollFix="isPage"
      :title="page.title ?? `${String(route.name)}.title`"
      :icon="page.icon ?? `${route.meta.icon}`"
      @click="handleClick"
    />

    <router-view v-slot="{ Component }">
      <transition
        name="route"
        mode="out-in"
      >
        <component
          :is="Component"
          :key="(route.params.filename as string)"
          @load="handleLoad"
        />
      </transition>
    </router-view>

  </div>
</template>

<script setup lang="ts">
import {
  onBeforeMount, onBeforeUnmount, reactive,
  computed,
} from 'vue';
import RoutePanel from '@/views/components/RoutePanel.vue';
import useLayoutStore from '@/stores/layout';
import { useRoute } from 'vue-router';

// 使用 layout 倉儲
const layoutStore = useLayoutStore();
const route = useRoute();
const page = reactive({ title: null, icon: null });

const isPage = computed(() => !!route.params.filename);

/**
 *
 * @param pageInfo
 * @param pageInfo.title
 * @param pageInfo.icon
 */
function handleLoad(pageInfo: { title: string; icon: string }) {
  Object.assign(page, pageInfo);
}

/**
 *
 */
function handleClick() {
  if (isPage.value) {
    const show = !layoutStore.showPageList;
    layoutStore.setShowPageList(show);
    layoutStore.setShowSidebar(show);
  }
}

onBeforeMount(async () => {
  layoutStore.setShowPageList(true);
});

onBeforeUnmount(() => {
  layoutStore.setShowPageList(false);
});

</script>

<style scoped lang="scss"></style>
