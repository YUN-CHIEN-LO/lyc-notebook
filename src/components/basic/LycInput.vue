<template>
  <div :class="[
    'lyc-input',
    {
      'lyc-input--focus': isFocused,
    }]">
    <input
      class="lyc-input__content "
      v-model="value"
      :name="name"
      :type="type"
      @focus="isFocused = true"
      @blur="handleBlur"
      v-bind="attrs"
    />
    <LycIconButton
      v-if="showClear"
      icon="mdiClose"
      circle
      size="small"
      @click.stop="handleClear"
    />
    <div class="lyc-input__append">

      <slot name="append"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, inject, ref,
} from 'vue';
import type { PropType, InputTypeHTMLAttribute } from 'vue';
import { isEmpty, isFunction } from 'lodash';
import LycIconButton from '@/components/basic/LycIconButton.vue';

export default defineComponent({
  name: 'LycInput',
  components: { LycIconButton },
  inheritAttrs: false,
  props: {
    // v-model 綁定值
    modelValue: {
      type: String as PropType<string>,
      default: '',
    },
    // input 屬性
    type: {
      type: String as PropType<InputTypeHTMLAttribute>,
      default: 'text',
      validator(val: string): boolean {
        return ['text', 'email', 'password'].includes(val);
      },
    },
    // 是否可清除
    clearable: {
      type: Boolean as PropType<boolean>,
      default: false,
    },

  },
  setup(props, { emit, attrs }) {
    // 注入 表單題目資訊
    const getFormItem = inject('getFormItem');

    // 綁定數據
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit('update:modelValue', val);
      },
    });

    // 是否聚焦
    const isFocused = ref(false);
    // 是否顯示清除按鈕
    const showClear = computed(() => props.clearable && !isEmpty(value.value));
    // 父層表單題目
    const formItem = computed(() => (
      isFunction(getFormItem)
        ? getFormItem() : {}));

    // 表單題目鍵值
    const name = computed(() => formItem.value.name);

    /**
     * 觸發驗證
     * @param {unknown} val - 驗證值
     */
    function triggerValidate(val: string) {
      if (!isFunction(formItem.value.validate)) return;
      formItem.value.validate(val);
    }

    /**
     * 當 觸發模糊
     */
    function handleBlur() {
      isFocused.value = false;
      triggerValidate(value.value);
    }

    /**
     * 當 點擊清除
     */
    function handleClear() {
      value.value = '';
      emit('clear');
      triggerValidate('');
    }

    return {
      attrs,
      value, // 綁定數據
      name, // 表單題目鍵值
      isFocused, // 是否聚焦
      showClear, // 是否顯示清除按鈕
      handleBlur, // 當 觸發模糊
      handleClear, // 當 點擊清除
    };
  },
});
</script>

<style scoped lang="scss">
.lyc-input {
  position: relative;
  border: solid 2px color(text, 2);
  border-radius: g-unit(1);
  background-color: color(backdrop);
  box-sizing: border-box;
  width: 100%;
  padding: g-unit(0) g-unit(2);

  @include flex($fw: nowrap);

  @include placeholder {
    color: color(dark, 2);
  }

  @include transitions(border-color 0.1s linear);

  &__content {
    flex: 1;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-size: $font-size;
    color: color(dark);
    outline: none;
    border: none;
    background-color: transparent;
    height: g-unit(6);
    box-sizing: border-box;
    letter-spacing: 1px;
    padding: g-unit(0) g-unit(1);

    &:-webkit-autofill,
    &:-webkit-autofill:focus,
    &:-internal-autofill-selected {
      @include shadow(inset 0 0 0 1000px color(backdrop) !important);
      -webkit-text-fill-color: $color-font !important;
      -o-text-fill-color: $color-font !important;
      -moz-text-fill-color: $color-font !important;
    }
  }

  &__append {
    flex-shrink: 0;
  }

  &--focus {
    border-color: color(primary);
    background-color: color(primary, 1);

    & .lyc-input__content {

      &:-webkit-autofill,
      &:-webkit-autofill:focus,
      &:-internal-autofill-selected {
        @include shadow(inset 0 0 0 1000px color(primary, 1) !important);
        -webkit-text-fill-color: $color-font !important;
        -o-text-fill-color: $color-font !important;
        -moz-text-fill-color: $color-font !important;
      }
    }
  }

}
</style>
