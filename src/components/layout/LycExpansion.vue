<template>
  <div :class="['lyc-expansion', {
    'lyc-expansion--open': open
  }]">

    <div
      class="lyc-expansion__target"
      @click="handleToggle"
    >

      <slot name="target"></slot>
    </div>

    <div
      ref="contentDom"
      :style="contentStyle"
      class="lyc-expansion__content"
    >

      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, Ref,
} from 'vue';

export default defineComponent({
  name: 'LycExpansion',
  setup() {
    const open = ref(false);
    /**
     *
     */
    function handleToggle() {
      open.value = !open.value;
    }
    const contentDom: Ref<HTMLDivElement | null> = ref(null);

    const contentStyle = computed(() => ({
      height: open.value ? `${contentDom.value?.scrollHeight}px` : '0',
    }));
    return {
      open,
      contentDom,
      handleToggle,
      contentStyle,
    };
  },
});
</script>

<style scoped lang="scss">
.lyc-expansion {
  &__target {
    margin: s-unit(0.5) 0px;
  }

  &__content {
    overflow: hidden;
    height: 0;
    opacity: 0;
    @include transitions(height 0.3s ease, opacity 0.3s ease);
  }

  &--open {
    .lyc-expansion__content {
      height: auto;
      opacity: 1;
    }
  }
}
</style>
