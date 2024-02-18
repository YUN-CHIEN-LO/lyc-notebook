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

import RoutePanel from '@/views/components/RoutePanel.vue';

</script>

<style scoped lang="scss"></style>
