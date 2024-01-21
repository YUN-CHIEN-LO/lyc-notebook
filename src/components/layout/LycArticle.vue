<template>
  <article class="lyc-article">

    <slot></slot>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LycArticle',
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.lyc-article {
  width: 100%;
  max-width: g-unit(150);
  margin: 0px auto;
}
</style>
