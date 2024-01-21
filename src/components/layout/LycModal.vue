<template>
  <div class="lyc-modal">

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LycModal',
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.lyc-modal {
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  background-color: color(backdrop, 7);
}
</style>
