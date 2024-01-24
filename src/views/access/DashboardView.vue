<template>
  <div>
    userStore.user:
    <pre>{{ userStore.user }}</pre>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/user';

const userStore = useUserStore();
</script>
