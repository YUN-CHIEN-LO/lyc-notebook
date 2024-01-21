<template>
  <span
    class="lyc-icon"
    :style="{
      width: size,
      height: size
    }"
  >
    <svg
      :width="size"
      :height="size"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path :d="d" />
    </svg>
  </span>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import * as allIcon from '@mdi/js';
import lycLogo from "@/assets/lycLogo"


export default defineComponent({
  name: 'LycIcon',
  props: {
    // 圖示名稱
    icon: {
      type: String as PropType<string>,
      default: 'mdiAccount',
    },
    // 字體大小
    fontSize: {
      type: Number as PropType<number>,
      default: 3,
    },

  },
  setup(props) {
    // 字體大小
    const size = computed(() => `${(props.fontSize ?? 3) * 8 + 12}px`);
    // svg d
    const d = computed(() => {
      switch (props.icon) {
        case "lycLogo":
          return lycLogo;
        default:
          return allIcon[props.icon as keyof typeof allIcon] ?? '';
      }
    });

    return {
      size, // 字體大小
      d, // svg d
    };
  },
});
</script>

<style scoped lang="scss">
.lyc-icon {
  @include flex();
}
</style>
