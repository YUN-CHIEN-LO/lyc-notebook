<template>
  <div class="lyc-row">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LycRow',
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.lyc-row {
  @include flex($fw: wrap, $ai: stretch);
}
</style>
