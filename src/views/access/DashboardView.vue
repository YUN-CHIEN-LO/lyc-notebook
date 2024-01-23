<template>
  <div>
    userStore.user:
    <pre>{{ userStore.user }}</pre>
    <lyc-button @click="handleAlert"> add </lyc-button>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/user';
import useLayoutStore from '@/stores/layout';
import { ref } from 'vue';
import { LycButton } from '@/components/basic';

const userStore = useUserStore();
const layoutStore = useLayoutStore();

const count = ref(0);
/**
 *
 * @param index
 */
function geNewAlert() {
  count.value += 1;
  return {
    text: `alert${count.value}`,
    type: ['info', 'alert', 'warning'][count.value % 3],
  } as LycLib.Alert;
}

/**
 *
 */
function handleAlert() {
  layoutStore.systemAlerts.push(geNewAlert());
}
</script>

<style scoped></style>
