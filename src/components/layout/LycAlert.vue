<template>
  <transition-group
    class="lyc-alert__list"
    name="list"
    tag="div"
    mode='out-in'
  >
    <div
      v-for="(alert, index) in modelValue"
      :class="['lyc-alert', `lyc-alert--${alert.type}`]"
      :key="index"
    >
      {{ index }}: {{ alert.text }} {{ `lyc-alert--${alert.type ?? 'info'}` }}
    </div>
  </transition-group>
</template>

<script lang="ts">
import {
  toRaw,
  ref,
  computed, watch,
  PropType, defineComponent,
} from 'vue';

export default defineComponent({
  name: 'LycAlert',
  props: {
    modelValue: {
      type: Array as PropType<Array<LycLib.Alert>>,
      default: () => [],
    },
    timeout: {
      type: Number as PropType<number>,
      default: 5000,

    },
  },
  setup(props, { emit }) {
    const length = computed(() => props.modelValue.length);
    const alertList = { data: [] } as LycLib.Data<Array<LycLib.Alert>>;
    const index = ref(1);
    const currentCounts = ref(0);
    /**
     *
     * @param alert
     */
    async function pushAlert(alert: LycLib.Alert) {
      currentCounts.value += 1;
      index.value += 1;

      const timer = setTimeout(() => {
        alertList.data.unshift();
        emit('update:modelValue', props.modelValue.slice(1, props.modelValue.length));
        currentCounts.value -= 1;
        clearInterval(timer);
      }, props.timeout);
    }

    watch(length, () => {
      const latestAlert = props.modelValue.at(-1) ?? {};
      if (length.value > currentCounts.value) pushAlert(toRaw(latestAlert));
    });
    return { alertList };
  },
});
</script>

<style scoped lang="scss">
.lyc-alert {
  width: g-unit(30);
  max-width: 100%;
  padding: g-unit(1) g-unit(2);
  border-radius: g-unit(1);
  margin-bottom: g-unit(2);
  overflow: hidden;

  &--info {
    background-color: color(primary, 4);
  }

  &--alert {
    background-color: color(alert, 4);
  }

  &--warning {
    background-color: color(secondary, 4);
  }

  &__list {
    position: fixed;
    z-index: 3000;
    transform: translateX(-50%);
    bottom: g-unit(5);
    left: 50%;
    padding: 8px;
    @include flex($jc: center, $fd: column);
  }
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  // transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  // position: absolute;
}
</style>
