<template>
  <div :class="['lyc-form-item', { 'lyc-form-item--error': isError }]">
    <label
      class="lyc-form-item__label"
      :for="formItemName"
    >
      {{ label }}
    </label>
    <div class="lyc-form-item__content">

      <slot></slot>
    </div>
    <div class="lyc-form-item__hint">
      {{ errorMessage || hint }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed, ref, inject, watch,
  provide,
} from 'vue';
import type { PropType } from 'vue';
import { getUniqueId } from '@/utils';
import { isFunction } from 'lodash';

export default defineComponent({
  name: 'LycFormItem',
  props: {
    // 標題
    label: {
      type: String as PropType<string>,
      default: '',
    },
    // 提示文字
    hint: {
      type: String as PropType<string>,
      default: '',
    },
    // 題目鍵值
    name: {
      type: String as PropType<string>,
      default: null,
    },

  },
  expose: ['validate'],
  setup(props) {
    // 錯誤訊息
    const errorMessage = ref('');
    // 是否為錯誤狀態
    const isError = computed(() => errorMessage.value.length);

    // 注入 觸發驗證旗標
    const getValidateFlag = inject('getValidateFlag');
    // 注入 觸發重置旗標
    const getResetFlag = inject('getResetFlag');
    // 注入 觸發表單錯誤旗標
    const getErrorFlag = inject('getErrorFlag');
    // 注入 表單綁定值
    const getFormValue = inject('getFormValue');
    // 注入 表單驗證規則
    const getFormRules = inject('getFormRules');
    // 注入 表單錯誤訊息
    const getFormError = inject('getFormError');

    // 題目鍵值
    const formItemName = props.name ?? getUniqueId();
    // 觸發驗證旗標
    const formValidateFlag = computed(
      () => (isFunction(getValidateFlag) ? getValidateFlag() : 0),
    );
    // 觸發重置旗標
    const formResetFlag = computed(
      () => (isFunction(getResetFlag) ? getResetFlag() : 0),
    );
    // 觸發錯誤訊息旗標
    const formErrorFlag = computed(
      () => (isFunction(getErrorFlag) ? getErrorFlag() : 0),
    );
    // 驗證條件
    const rule = computed(() => (
      isFunction(getFormRules) ? getFormRules()[formItemName] : []));
    /**
     * 重置驗證
     */
    function reset() {
      errorMessage.value = '';
    }
    /**
     * 驗證題目
     * @param {unknown} value - 驗證數據
     */
    function validate(value?: unknown) {
      // 取得 驗證數據
      const target = value
        ?? (isFunction(getFormValue)
          ? getFormValue()[props.name]
          : null);
      // 不存在驗證規則，返回
      if (!isFunction(rule.value)) return;
      // 是否合法
      const valid = rule.value(target);

      if (valid === true) {
        // 通過驗證，清除驗證
        reset();
      } else {
        // 賦予錯誤訊息
        errorMessage.value = valid;
      }
    }

    // 監聽重置旗標
    watch(formResetFlag, () => {
      reset();
    });
    // 監聽驗證旗標
    watch(formValidateFlag, () => {
      validate();
    });
    // 監聽錯誤訊息旗標
    watch(formErrorFlag, () => {
      errorMessage.value = isFunction(getFormError) ? getFormError()[formItemName] : '';
    });

    // 提供 表單題目資訊
    provide('getFormItem', () => ({
      name: formItemName,
      validate,
    }));

    return {
      errorMessage, // 錯誤訊息
      isError, // 是否為錯誤狀態
      formItemName, // 題目鍵值
      reset, // 重置驗證
      validate, // 驗證題目
    };
  },
});
</script>

<style lang="scss">
.lyc-form-item {
  @include flex($fd: column, $ai: stretch, $fw: nowrap);
  padding-bottom: g-unit(5);
  position: relative;

  &__label {
    margin-bottom: g-unit(1);
    font-size: fz(3);
    display: inline-block;
  }

  &__hint {
    position: absolute;
    bottom: g-unit(1);
    font-size: fz(3);
    line-height: lh(0);
  }

  &--error {
    & .lyc-form-item__hint {
      color: color(alert);
    }

    & .lyc-input {
      border-color: color(alert);

      &:has(.lyc-input__content:-internal-autofill-selected),
      &--focus {
        border-color: color(alert);
        background-color: color(alert, 1);
      }

      &__content {

        &:-webkit-autofill,
        &:-webkit-autofill:focus,
        &:-internal-autofill-selected {
          @include shadow(inset 0 0 0 1000px color(alert, 1) !important);
        }
      }
    }
  }
}
</style>
