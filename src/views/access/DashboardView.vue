<template>
  <lyc-article>
    userStore.user:
    <pre>{{ userStore.user }}</pre>
  </lyc-article>
</template>

<script setup lang="ts">
import { LycArticle } from '@/components/layout';
import useUserStore from '@/stores/user';

const userStore = useUserStore();
</script>
