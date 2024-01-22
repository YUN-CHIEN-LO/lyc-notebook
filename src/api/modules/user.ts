import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

import userUserStore from '@/stores/user';

import firebaseApp from '@/plugins/firebase';

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, (user: Firebase.User) => {
  const store = userUserStore();
  store.setUserCredential(user);
  store.setUser();
});

export default {
  /**
   * 建立使用者
   * @param {string} email - 電子信箱
   * @param {string} password - 密碼
   * @returns {Promise<Firebase.UserCredential>} 使用者憑證
   */
  createUser(
    email: string,
    password: string,
  ): Promise<Firebase.UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  /**
   * 登入使用者
   * @param {string} email - 電子信箱
   * @param {string} password - 密碼
   * @returns {Promise<Firebase.UserCredential>} 使用者憑證
   */
  loginUser(
    email: string,
    password: string,
  ): Promise<Firebase.UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  },

  /**
   * 登出使用者
   * @returns {Promise<void>}
   */
  logoutUser() {
    return signOut(auth);
  },

  /**
   *
   */
  getCurrentUser() {
    return auth.currentUser;
  },

  /**
   *
   * @param updates
   */
  updateUser(updates: Firebase.UserInfoInterface) {
    if (auth.currentUser) return updateProfile(auth.currentUser, { ...updates });
    return Promise.reject();
  },

};
