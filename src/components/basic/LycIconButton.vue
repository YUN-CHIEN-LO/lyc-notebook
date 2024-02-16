<template>
  <lyc-button
    :class="['lyc-icon-button', {
      'lyc-icon-button--circle': circle,
      [`lyc-icon-button--${buttonProps.size ?? 'default'}`]: true
    }]"
    v-bind="{ ...buttonProps, listeners }"
  >
    <LycIcon
      v-bind="iconProps"
      :font-size="getIconSize"
    />
  </lyc-button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';
import { getComponentProps, getComponentListeners } from '@/utils';
import LycIcon from '@/components/basic/LycIcon.vue';
import LycButton from '@/components/basic/LycButton.vue';

export default defineComponent({
  name: 'LycIconButton',
  props: {
    ...LycIcon.props,
    ...LycButton.props,
    // 是否為圓型
    circle: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { attrs }) {
    // 圖示屬性
    const iconProps = computed(() => getComponentProps(props, LycIcon.props));
    // 按鈕屬性
    const buttonProps = computed(() => getComponentProps(props, LycButton.props));
    // 圖示大小
    const getIconSize = computed(() => {
      switch (buttonProps.value.size) {
        case 'small': return 2;
        case 'large': return 5;
        case 'default':
        default: return 3;
      }
    });
    // 事件繼承
    const listeners = computed(() => getComponentListeners(attrs));

    return {
      iconProps, // 圖示屬性
      buttonProps, // 按鈕屬性
      getIconSize, // 圖示大小
      listeners, // 事件繼承
    };
  },
});
</script>

<style scoped lang="scss">
.lyc-icon-button {
  width: g-unit(6);
  height: g-unit(6);
  flex-shrink: 0;

  padding: 0;

  :deep(.lyc-button__content) {
    @include flex($jc: center, $ai: center);
  }

  &--circle {
    border-radius: 100%;
  }

  &--small {
    width: g-unit(4);
    height: g-unit(4);
  }
}
</style>
