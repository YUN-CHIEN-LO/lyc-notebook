<template>
  <div :class="[
    {
      ['lyc-column']: true,
      [`lyc-column--${col}`]: isFallback,
      [`lyc-column--sm-${sm}`]: sm > 0,
      [`lyc-column--md-${md}`]: md > 0,
      [`lyc-column--lg-${lg}`]: lg > 0,
    }]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, PropType, defineComponent } from 'vue';

export default defineComponent({
  name: 'LycColumn',
  props: {
    col: {
      type: Number as PropType<number>,
      default: 6,
    },
    sm: {
      type: Number as PropType<number>,
      default: 0,
    },
    md: {
      type: Number as PropType<number>,
      default: 0,
    },
    lg: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  setup(props) {
    const isFallback = computed(() => (props.lg + props.md + props.sm) === 0);
    return { isFallback };
  },
});
</script>

<style scoped lang="scss">
@function getWidth($index) {
  @return calc(100% * $index / 12);
}

.lyc-column {
  padding: s-unit(2);
  flex-shrink: 0;
  flex-grow: 0;
  box-sizing: border-box;
}

@for $index from 1 through 12 {

  .lyc-column--#{$index} {
    width: getWidth($index);
  }

  @include small-device {
    .lyc-column--sm-#{$index} {
      width: getWidth($index);
    }
  }

  @include medium-device {
    .lyc-column--md-#{$index} {
      width: getWidth($index);
    }
  }

  @include large-device {
    .lyc-column--lg-#{$index} {
      width: getWidth($index);
    }
  }
}
</style>
