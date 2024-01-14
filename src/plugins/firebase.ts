import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDOOWVzDNPmIV1BI9KiJU4y6RVMAlBt4Is",
  authDomain: "lyc-notebook-49edb.firebaseapp.com",
  projectId: "lyc-notebook-49edb",
  storageBucket: "lyc-notebook-49edb.appspot.com",
  messagingSenderId: "758117125311",
  appId: "1:758117125311:web:9c27264fba79f9e07f0a0a",
  measurementId: "G-7WV24G0ZV9",
});

// used for the firestore refs
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// here we can export reusable database references
export const todosRef = collection(db, "todos");

export function createUser(
  email: string,
  password: string
): Promise<FirebaseUserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

onAuthStateChanged(auth, (user: FirebaseUser) => {
  if (user) {
    console.log("ooo", user);
  } else {
    console.log("xxx");
  }
});

export function loginUser(
  email: string,
  password: string
): Promise<FirebaseUserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  return signOut(auth);
}
