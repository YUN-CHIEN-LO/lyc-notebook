<template>
  <lyc-article>
    userStore.user:
    <pre>{{ userStore.user }}</pre>
  </lyc-article>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/user';

const userStore = useUserStore();
</script>
