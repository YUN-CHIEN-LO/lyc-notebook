<template>
  <lyc-card
    :color="color ?? 'default'"
    :clickable="clickable"
    :class="['home-panel', { 'home-panel--fix': fix }]"
    @click="handleClick"
  >
    <h1 class="home-panel__title"> {{ t(`${title ?? `${String(route.name)}.title`}`) }} </h1>
    <LycIcon
      class="home-panel__icon"
      :icon="icon ?? route.meta.icon"
      :font-size="fix ? 2 : 8"
    />
  </lyc-card>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router';
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import useLayoutStore from '@/stores/layout';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'RoutePanel', // 路由轉導面板
  props: {
    // 目標路由
    name: {
      type: String as PropType<string>,
      default: null,
    },
    title: {
      type: String as PropType<string>,
      default: null,
    },
    // 面板圖示
    icon: {
      type: String as PropType<string>,
      default: null,
    },
    // 卡片顏色
    color: {
      type: String as PropType<string>,
      default: null,
    },
    clickable: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    scrollFix: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const { t } = useI18n();
    // 使用路由
    const router = useRouter();
    const route = useRoute();
    // 使用 layout 倉儲
    const layoutStore = useLayoutStore();
    /**
     * 當 點擊面板
     */
    function handleClick() {
      if (!props.clickable) return;
      if (!layoutStore.getIsMobile) layoutStore.setShowSidebar(true);
      router.push({ name: props.name ?? route.name });
    }

    const fix = computed(() => props.scrollFix);

    return {
      t,
      route,
      fix,
      handleClick, // 當 點擊面板
    };
  },
});
</script>

<style scoped lang="scss">
.home-panel {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  &:hover {
    &>.home-panel__icon {
      transform: scale(1.4) rotate(10deg);
    }
  }

  &__title {
    margin-left: s-unit(4);
    margin-right: s-unit(2);
    flex: 1;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  &__icon {
    @include transitions(transform 0.1s ease-in-out);
    margin-right: s-unit(4);
  }

  &--fix {
    position: sticky;
    top: 0;
    z-index: 2000;
    border-radius: 0;
    padding: s-unit(1);

    &>.home-panel__title {
      font-size: $base-font ;
      margin: 0;
      margin-left: s-unit(2);
    }
  }
}
</style>
