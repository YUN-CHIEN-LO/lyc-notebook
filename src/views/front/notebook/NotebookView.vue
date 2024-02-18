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
        <component
          :is="Component"
          :key="(route.params.filename as string)"
        />
      </transition>
    </router-view>

  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue';
import RoutePanel from '@/views/components/RoutePanel.vue';
import useLayoutStore from '@/stores/layout';
import { useRoute } from 'vue-router';

// 使用 layout 倉儲
const layoutStore = useLayoutStore();
const route = useRoute();

onBeforeMount(async () => {
  layoutStore.setShowPageList(true);
});

onBeforeUnmount(() => {
  layoutStore.setShowPageList(false);
});

</script>

<style scoped lang="scss"></style>
