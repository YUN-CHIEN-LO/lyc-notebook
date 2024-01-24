<template>
  <div class="login-view">
    <lyc-form
      ref="formDom"
      class="sign-in pt-s-2 pb-s-10 px-s-4 br-4 mt-s-3 mx-auto"
      :rules="rules"
      :form="form"
    >
      <h1 class="tac">
        {{ $t('loginView.title') }}
      </h1>
      <lyc-form-item
        :label="$t('loginView.email')"
        name="email"
      >
        <LycInput
          v-model="form.email"
          type="email"
          placeholder="xxx@xxx.xx"
          clearable
          @clear="form.password = ''"
        />
      </lyc-form-item>
      <lyc-form-item
        :label="$t('loginView.password')"
        name="password"
      >
        <lyc-input
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="on"
          placeholder="xxxx xxxx"
        >
          <template
            #append
            v-if="form.password.length"
          >
            <LycIconButton
              circle
              size="small"
              :icon="showPassword ? 'mdiEyeOff' : 'mdiEye'"
              @click="showPassword = !showPassword"
            />
          </template>
        </lyc-input>
      </lyc-form-item>
      <lyc-button
        class="mt-s-3"
        type="submit"
        color="primary"
        @click.prevent="handleSubmit"
      >
        {{ $t('loginView.login') }}
      </lyc-button>
    </lyc-form>
  </div>
</template>

<script setup lang="ts">
import {
  LycInput, LycButton, LycFormItem, LycForm, LycIconButton,
} from '@/components/basic';
import {
  reactive, ref, watch, computed,
} from 'vue';
import { useI18n } from 'vue-i18n';
import useUserStore from '@/stores/user';
import useLayoutStore from '@/stores/layout';
import { useRouter } from 'vue-router';
import { AccessRoute, getAccessName } from '@/router';

const router = useRouter();

// 使用多語系
const i18n = useI18n();
// 使用 使用者 倉儲
const userStore = useUserStore();
// 使用 layout 倉儲
const layoutStore = useLayoutStore();
// 當前語系
const currentLang = computed(() => layoutStore.lang);

// 是否顯示密碼
const showPassword = ref(false);
// 表單 Dom 實例
const formDom = ref<typeof LycForm | null>(null);
// 登入表單
const form = reactive({
  email: '', // 信箱
  password: '', // 密碼
});
// 登入表單驗證規則
const rules = {
  email: // 信箱
    (value: string): (boolean | string) => {
      // 不可空白
      if (!value.length) return i18n.t('validation.empty');
      // 格式錯誤
      if (!/^[\w.]+@([\w]+\.)+[\w]{2,4}$/.test(value)) return i18n.t('validation.invalidFormat');
      return true;
    },
  password: // 密碼
    // 不可空白
    (value: string): (boolean | string) => (value.length ? true : i18n.t('validation.empty')),
} as LycLib.Rules;

/**
 * 當 送出表單
 */
async function handleSubmit() {
  try {
    // 表單 Dom 實例不存在，拋出錯誤
    if (!formDom.value) throw new Error();
    // 前端驗證失敗，拋出錯誤
    const valid = formDom.value.validate();
    if (!valid) throw new Error();
    // 登入成功旗標
    const isLogin = await userStore.loginUser(form.email, form.password);
    // 登入失敗
    if (!isLogin) {
      formDom.value.error({
        email: i18n.t('validation.invalidAccount'),
        password: i18n.t('validation.invalidAccount'),
      });
      // 拋出錯誤
      layoutStore.systemAlert = {
        text: i18n.t('validation.invalidAccount'),
        type: 'alert',
      };
      throw new Error();
    }
    router.push({ name: getAccessName(AccessRoute.dashboard) });
  } catch (error) {
    if (userStore.getIsLogin) {
      // 登出使用者
      userStore.logoutUser();
    }
  }
}

// 監聽 當前語系變化，清除錯誤訊息
watch(currentLang, () => {
  if (!formDom.value) return;
  formDom.value.clear();
});
</script>

<style scoped lang="scss">
.login-view {
  height: calc(100% - $navbar-height);
  @include flex($jc: center);
}

.sign-in {
  @include flex($fd: column, $fw: nowrap);
  align-items: stretch;
  width: calc(100% - s-unit(4));
  max-width: g-unit(50);
  border: solid s-unit(1) color(primary, 2);
  box-sizing: border-box;
}
</style>
