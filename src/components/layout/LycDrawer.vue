<template>
  <aside
    ref="lycDrawerDom"
    :class="['lyc-drawer', {
      'lyc-drawer--open': isOpen
    }]"
  >
    <div class="lyc-drawer__header">
      <div class="lyc-drawer__header__title">

        <slot name="header"></slot>
      </div>
      <LycIconButton
        class="lyc-drawer__header__close"
        icon="mdiClose"
        @click="handleClose"
      />
    </div>
    <div class="lyc-drawer__content">

      <slot></slot>
    </div>
  </aside>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { LycIconButton } from '@/components/basic';
import type { PropType } from 'vue';
import { onClickOutside } from '@vueuse/core'

export default defineComponent({
  name: "LycDrawer",
  components: { LycIconButton },
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false,
    }
  },
  setup(props, { emit }) {
    const isOpen = computed({
      get() {
        return props.modelValue
      },
      set(val) {
        emit("update:modelValue", val)
      }
    })

    const lycDrawerDom = ref(null)



    function handleClose() {
      isOpen.value = false
    }

    onClickOutside(lycDrawerDom, () => handleClose())
    return { isOpen, lycDrawerDom, handleClose };
  },
})
</script>

<style scoped lang="scss">
.lyc-drawer {
  position: fixed;
  top: 0;
  right: 0;
  background-color: color(backdrop, 1);
  height: 100vh;
  @include shadow(0px 0px g-unit(3) g-unit(1) color(backdrop, 6));

  &__header {
    @include flex();
    padding: s-unit(2) s-unit(2);

    &__title {
      flex: 1;
    }

    &__close {
      margin-left: auto;
    }
  }

  &__content {
    padding: s-unit(0) s-unit(2) s-unit(2);
  }

  transform: translateX(calc(100% + g-unit(4)));

  @include transitions(transform 0.3s ease-in);

  @include small-device {
    width: 100%;
  }

  @include medium-device {
    width: 50%;
    max-width: g-unit(50);
  }

  @include large-device {
    width: 30%;
    max-width: g-unit(40);
  }

  &--open {
    transform: translateX(0);

  }
}
</style>