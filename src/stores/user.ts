import { defineStore } from 'pinia';
import { loginUser, logoutUser } from '@/plugins/firebase';
import { isEmpty } from 'lodash';

const getState = () => ({
  // 使用者憑證
  userCredential: null as (Firebase.UserCredential | null),
});

export default defineStore('user', {
  state: () => getState(),
  getters: {
    // 使用者是否登入
    getIsLogin: (state) => !isEmpty(state.userCredential),
  },
  actions: {
    /**
     * 設置使用者憑證
     * @param {Firebase.User} user - 使用者憑證
     */
    setUser(user: (Firebase.UserCredential | null)) {
      this.userCredential = user;
    },
    /**
     * 登入使用者
     * @param {string} email - 電子信箱
     * @param {string} password - 密碼
     * @returns {Promise<boolean>} 是否登入成功
     */
    async loginUser(email: string, password: string) {
      try {
        const { user } = (await loginUser(
          email,
          password,
        )) as Firebase.UserCredential;
        this.setUser(user);
        return true;
      } catch (error) {
        return false;
      }
    },
    /**
     * 登出使用者
     */
    async logoutUser() {
      await logoutUser();
      this.setUser(null);
    },
  },
});
