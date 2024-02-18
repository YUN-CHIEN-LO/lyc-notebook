<template>
  <div>
    <lyc-row>
      <lyc-column>
        <RoutePanel color="primary" />
      </lyc-column>
    </lyc-row>

    <router-view v-slot="{ Component }">
      <transition
        name="route"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>

  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue';
import RoutePanel from '@/views/components/RoutePanel.vue';
import useLayoutStore from '@/stores/layout';

// 使用 layout 倉儲
const layoutStore = useLayoutStore();

onBeforeMount(async () => {
  layoutStore.setShowPageList(true);
});

onBeforeUnmount(() => {
  layoutStore.setShowPageList(false);
});

</script>

<style scoped lang="scss"></style>
