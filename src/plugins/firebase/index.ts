import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

import userUserStore from '@/stores/user';

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDOOWVzDNPmIV1BI9KiJU4y6RVMAlBt4Is',
  authDomain: 'lyc-notebook-49edb.firebaseapp.com',
  projectId: 'lyc-notebook-49edb',
  storageBucket: 'lyc-notebook-49edb.appspot.com',
  messagingSenderId: '758117125311',
  appId: '1:758117125311:web:9c27264fba79f9e07f0a0a',
  measurementId: 'G-7WV24G0ZV9',
});

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, (user: Firebase.User) => {
  const store = userUserStore();
  store.setUserCredential(user);
  store.setUser();
});

/**
 * 建立使用者
 * @param {string} email - 電子信箱
 * @param {string} password - 密碼
 * @returns {Promise<Firebase.UserCredential>} 使用者憑證
 */
export function createUser(
  email: string,
  password: string,
): Promise<Firebase.UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * 登入使用者
 * @param {string} email - 電子信箱
 * @param {string} password - 密碼
 * @returns {Promise<Firebase.UserCredential>} 使用者憑證
 */
export function loginUser(
  email: string,
  password: string,
): Promise<Firebase.UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * 登出使用者
 * @returns {Promise<void>}
 */
export function logoutUser() {
  return signOut(auth);
}

export function getCurrentUser() {
  return auth.currentUser
}

export function updateCurrentUser(updates: Firebase.UserInfoInterface) {
  if (auth.currentUser)
    return updateProfile(auth.currentUser, { ...updates })
  else return Promise.reject()
}