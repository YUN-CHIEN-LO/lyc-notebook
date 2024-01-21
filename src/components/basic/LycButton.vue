<template>
  <button
    :class="['lyc-button', `lyc-button--${color ?? 'default'}`, {
      'lyc-button--vertical': vertical,
      'lyc-button--horizontal': !vertical,
    }]"
    :type="type"
    v-bind="listeners"
  >
    <LycIcon
      v-if="!!prefixIcon"
      class="lyc-button__prefix-icon"
      :icon="prefixIcon"
    />
    <span class="lyc-button__content">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import type { PropType, ButtonHTMLAttributes } from 'vue';
import { computed, defineComponent } from 'vue';
import { getComponentListeners } from '@/utils';
import LycIcon from '@/components/basic/LycIcon.vue';

export default defineComponent({
  name: 'LycButton',
  components: { LycIcon },
  props: {
    // 圖示名稱
    prefixIcon: {
      type: String as PropType<string>,
      default: undefined,
    },
    // 顏色
    color: {
      type: String as PropType<string>,
      default: 'default',
      validator(val: string): boolean {
        return ['primary', 'secondary', 'text', 'default'].includes(val);
      },
    },
    // 類型
    type: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      default: 'button',
      validator(val: string): boolean {
        return ['button', 'submit', 'reset'].includes(val);
      },
    },
    // 大小
    size: {
      type: String as PropType<string>,
      default: 'default',
      validator(val: string): boolean {
        return ['default', 'small', 'large'].includes(val);
      },
    },
    vertical: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { attrs }) {
    const listeners = computed(() => getComponentListeners(attrs));
    return { listeners };
  },
});
</script>

<style scoped lang="scss">
.lyc-button {
  background: none;
  color: inherit;
  border: none;
  padding: g-unit(1) g-unit(2);
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border-radius: g-unit(1);
  height: g-unit(6);
  letter-spacing: 1px;
  @include flex($jc: center);
  box-sizing: border-box;

  &--horizontal {
    margin-left: s-unit(1);

    &:first-of-type {
      margin-left: s-unit(0);
    }

  }

  &--vertical {
    margin-top: s-unit(1);

    &:first-of-type {
      margin-top: s-unit(0);
    }

  }

  &__prefix-icon {
    margin-right: s-unit(2);
  }

  &__content {
    flex: 1;
  }

  @include transitions(background-color 0.1s linear);

  &--default {

    &:hover {
      background-color: color(text, 2);
    }

    &:active {
      background-color: color(text, 3);
    }

    &:focus {
      background-color: color(text, 2);
    }
  }

}

@each $color in ("primary", "secondary", "text") {
  .lyc-button--#{$color} {
    background-color: color($color);
    color: $color-font-inverse;

    &:hover {
      background-color: color($color, 5);
    }

    &:active {
      background-color: color($color, 3);
    }

    &:focus {
      background-color: color($color, 5);
      @include shadow(0px 0px s-unit(1) s-unit(0.5) color($color, 2))
    }
  }
}
</style>
