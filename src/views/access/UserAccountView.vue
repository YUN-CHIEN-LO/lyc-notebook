<template>
  <div>
    UserAccountView
    <lyc-button @click="handleUpdate">xxx</lyc-button>
  </div>
</template>

<script setup lang="ts">
import { LycButton } from '@/components/basic';
import useUserStore from '@/stores/user';

const userStore = useUserStore();
/**
 *
 */
function handleUpdate() {
  userStore.updateUser({

    displayName: '小陳',
    photoURL: 'https://foodandcosplay.org/wp-content/uploads/2023/10/missbricosplay_en_su_propia_versixn_de_vi_de_arcanex_la_serie_de_netflix.jpg_242310155.webp',
  });
}
</script>

<style scoped></style>
