<template>
  <transition-group
    class="lyc-alert__list"
    name="list"
    tag="div"
    mode='out-in'
  >
    <div
      v-for="(alert) in alertList.data"
      :class="['lyc-alert', `lyc-alert--${alert.type}`]"
      :key="alert.index"
    >
      <LycIcon
        :icon="getIcon(alert.type)"
        :font-size="1"
      />
      <span class="lyc-alert__content"> {{ alert.text }}</span>
      <LycIconButton
        icon="mdiClose"
        circle
        size="small"
        @click.stop="handleClear(alert.index)"
      />
    </div>
  </transition-group>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import {
  reactive, watch, PropType, defineComponent,
} from 'vue';
import { getUniqueId } from '@/utils';

export default defineComponent({
  name: 'LycAlert',
  props: {
    // 警鈔資訊
    modelValue: {
      type: Object as PropType<LycLib.Alert>,
      default: undefined,
    },
    // 顯示時間
    timeout: {
      type: Number as PropType<number>,
      default: 10000,
    },
  },
  setup(props) {
    // 警告清單
    const alertList = reactive({ data: [] as Array<LycLib.Alert> });

    /**
     *
     * @param index
     */
    function handleClear(index: string) {
      const position = alertList.data.findIndex((item: LycLib.Alert) => item.index === index);
      if (position > -1) alertList.data.splice(position, 1);
    }

    /**
     * 顯示警告
     * @param {LycLib.Alert} alert - 警告資訊
     */
    async function pushAlert(alert: LycLib.Alert) {
      const index = getUniqueId();

      alertList.data.push({ ...alert, index });

      const timer = setTimeout(() => {
        handleClear(index);
        clearInterval(timer);
      }, props.timeout);
    }

    /**
     * 取得圖示
     * @param {string} type - 類型
     * @returns {string} 圖示
     */
    function getIcon(type: string): string {
      switch (type) {
        case 'alert': return 'mdiCloseCircle';
        case 'warning': return 'mdiAlert';
        default: return 'mdiInformation';
      }
    }

    watch(() => props.modelValue, (value) => {
      if (!isEmpty(value)) pushAlert(value);
    }, {
      immediate: true,
      deep: true,
    });

    return {
      alertList, // 警示清單
      getIcon, // 取得圖示
      handleClear,
    };
  },
});
</script>

<style scoped lang="scss">
@mixin setColor($type) {
  border-color: color($type, 4);
  background-color: color($type, 1);

  &>.lyc-icon {
    color: color($type, 4);
  }
}

.lyc-alert {
  width: g-unit(40);
  max-width: calc(100vw - g-unit(2));
  padding: g-unit(1) g-unit(2);
  border-radius: g-unit(1);
  margin-bottom: g-unit(2);
  box-sizing: border-box;
  overflow: hidden;
  background-color: color(backdrop, 4);
  border: solid s-unit(0.25);
  @include flex($fw: nowrap);
  @include shadow(0px 0px s-unit(1) s-unit(0) color(backdrop, 7));

  &>.lyc-icon {
    margin-right: s-unit(1);
  }

  &--info {
    @include setColor('primary');
  }

  &--alert {
    @include setColor('alert');
  }

  &--warning {
    @include setColor('secondary');
  }

  &__content {
    flex: 1;
  }

  &__list {
    position: fixed;
    z-index: 3000;
    transform: translateX(-50%);
    bottom: g-unit(5);
    left: 50%;
    padding: 8px;
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-active {
  position: absolute;

  &:first-of-type {
    position: relative;
  }
}
</style>
