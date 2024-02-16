<template>
  <lyc-article class="user-page">
    <lyc-row class="user-page__basic-info">
      <lyc-column
        :sm="12"
        :md="4"
        :lg="4"
      >
        <div class="user-page__user-image">
          <img
            :src="userStore.user.photoURL"
            :alt="userStore.user.displayName"
          />
        </div>
      </lyc-column>
      <lyc-column
        :sm="12"
        :md="8"
        :lg="8"
      >
        {{ userStore.user.email }}

        {{ userStore.user.displayName }}
        <lyc-button @click="handleUpdate">xxx</lyc-button>
      </lyc-column>
    </lyc-row>

  </lyc-article>
</template>

<script setup lang="ts">
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

<style scoped lang="scss">
.user-page {
  &__basic-info {}

  &__user-image {
    position: relative;
    width: 80%;
    max-width: g-unit(30);
    overflow: hidden;
    margin-left: auto;

    @include small-device {
      margin-right: auto;
    }

    &::before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    &>img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      text-align: center;
    }
  }
}
</style>
