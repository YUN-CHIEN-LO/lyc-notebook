import { defineStore } from 'pinia';
import api from '@/api';
import { isEmpty } from 'lodash';

const getState = () => ({
  // 使用者憑證
  userCredential: null as (Firebase.UserCredential | null),
  user: {
    email: '',
    isAnonymous: false,
    providerId: '',
    uid: '',
    displayName: null,
    phoneNumber: null,
    photoURL: null,
  } as Firebase.UserInfo,
});

export default defineStore('user', {
  state: () => getState(),
  getters: {
    // 使用者是否登入
    getIsLogin: (state) => !isEmpty(state.userCredential),
  },
  actions: {
    setUser(updates = {}) {
      const currentUser = api.user.getCurrentUser();
      this.user = {
        email: currentUser?.email,
        isAnonymous: currentUser?.isAnonymous,
        ...currentUser?.providerData[0],
        ...updates,
      } as Firebase.UserInfo;
    },
    /**
     * 設置使用者憑證
     * @param {Firebase.User} user - 使用者憑證
     */
    setUserCredential(user: (Firebase.UserCredential | null)) {
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
        const { user } = (await api.user.loginUser(
          email,
          password,
        )) as Firebase.UserCredential;
        this.setUserCredential(user);
        return true;
      } catch (error) {
        return false;
      }
    },
    /**
     * 登出使用者
     */
    async logoutUser() {
      await api.user.logoutUser();
      this.setUserCredential(null);
    },
    async updateUser(updates: Firebase.UserInfoInterface) {
      const result = await api.user.updateUser(updates);
      console.log(updates, result);
      this.setUser(updates);
    },
  },
});
