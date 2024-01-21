<template>
  <form class="lyc-form">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import {
  reactive, provide, ref, defineComponent,
} from 'vue';

export default defineComponent({
  name: 'LycForm',
  props: {
    // 表單數值
    form: {
      type: Object as PropType<LycLib.Data>,
      default: () => ({}),
    },
    // 驗證規則
    rules: {
      type: Object as PropType<LycLib.Rules>,
      default: () => ({}),
    },
  },
  setup(props) {
    // 表單預設值
    const defaultForm = JSON.parse(JSON.stringify(props.form));
    // 觸發驗證旗標
    const triggerValidateFlag = ref(0);
    // 觸發重置旗標
    const triggerResetFlag = ref(0);
    // 觸發錯誤訊息旗標
    const triggerErrorFlag = ref(0);
    // 錯誤訊息
    const errorMessages = reactive({});

    /**
     * 設置錯誤訊息物件
     * @param {LycLib.Data<string>} messages - 錯誤訊息
     */
    function setErrorMessages(messages: LycLib.Data<string> = {}) {
      Object.assign(
        errorMessages,
        // 取得空物件
        Object.keys(props.form)
          .reduce((empty, key) => Object.assign(empty, { [key]: '' }), {}),
        // 錯誤訊息
        messages,
      );
    }

    /**
     * 驗證表單
     * @returns {boolean} - 是否通過驗證
     */
    function validate() {
      triggerValidateFlag.value += 1;

      return Object.entries(props.rules)
        .reduce(
          (valid, [key, rule]) => valid && (rule(props.form[key]) === true),
          true,
        );
    }
    /**
     * 更新錯誤訊息
     * @param {LycLib.Data<string>} messages - 錯誤訊息
     */
    function error(messages: LycLib.Data<string>) {
      triggerErrorFlag.value += 1;
      setErrorMessages(messages);
    }
    /**
     * 重置驗證
     */
    function clear() {
      triggerResetFlag.value += 1;
    }
    /**
     * 重置表單
     */
    function reset() {
      triggerResetFlag.value += 1;
      Object.assign(props.form, defaultForm);
    }

    // 提供 觸發驗證旗標
    provide('getValidateFlag', () => triggerValidateFlag.value);
    // 提供 觸發重置旗標
    provide('getResetFlag', () => triggerResetFlag.value);
    provide('getErrorFlag', () => triggerErrorFlag.value);
    // 提供 表單綁定值
    provide('getFormValue', () => props.form ?? {});
    // 提供 表單驗證規則
    provide('getFormRules', () => props.rules ?? []);
    // 提供 表單錯誤訊息
    provide('getFormError', () => errorMessages);
    return {
      validate, // 驗證表單
      reset, // 重置表單
      clear, // 重置驗證
      error, // 更新錯誤訊息
    };
  },
});
</script>
