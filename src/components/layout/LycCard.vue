<template>
  <div :class="[
    'lyc-card',
    `lyc-card--${color ?? 'default'}`,
    {
      'lyc-card--border': border,
      'lyc-card--plain': !border,
      'lyc-card--clickable': clickable
    }]">

    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'LycCard',
  props: {
    // 顏色
    color: {
      type: String as PropType<string>,
      default: 'default',
      validator(val: string): boolean {
        return ['primary', 'secondary', 'text', 'alert', 'default'].includes(val);
      },
    },
    // 邊框
    border: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    clickable: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.lyc-card {
  padding: s-unit(2);
  border-radius: s-unit(4);
  border: solid s-unit(1);
  background-color: color(backdrop);

  &--plain {
    background-color: color(text, 2);
    border-color: color(text, 2);

  }

  &--border {
    border-color: color(text, 3);
  }

  &--clickable {
    cursor: pointer;

    &:hover {
      @include shadow(0px 0px s-unit(1) s-unit(0.5) color(text, 4))
    }
  }
}

@each $color in ("primary", "secondary", "text", "alert") {
  .lyc-card--#{$color} {
    &.lyc-card--plain {
      background-color: color($color, 2);
      border-color: color($color, 2);

      &.lyc-card--clickable:hover {
        @include shadow(0px 0px s-unit(1) s-unit(0.5) color($color, 4))
      }
    }

    &.lyc-card--border {
      border-color: color($color, 3);
    }

  }
}
</style>
