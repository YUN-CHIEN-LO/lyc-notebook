<template>
  <nav class="lyc-navbar">
    <slot></slot>

    <div class="lyc-navbar__tools">

      <slot name="tools"></slot>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LycNavbar',
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.lyc-navbar {
  padding: s-unit(2) s-unit(2);

  box-sizing: border-box;
  flex-grow: 0;
  @include flex();
  height: $navbar-height;

  &__tools {
    margin-left: auto;
    @include flex();
  }
}
</style>
