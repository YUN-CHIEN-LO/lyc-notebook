<template>
  <div>
    <input v-model="account" />
    <input v-model="password" />
    <button @click="handleLogin">login</button>
    <button @click="handleSignout">sign out</button>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<script setup lang="ts">
import { loginUser, signOutUser } from "./plugins/firebase";
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

// import { useFirestore } from "vuefire";
// const db = useFirestore();

const account = ref("");
const password = ref("");
function handleSignout() {
  signOutUser();
}
async function handleLogin() {
  try {
    const { user } = (await loginUser(
      account.value,
      password.value
    )) as FirebaseUserCredential;
    console.log("login", user);
  } catch (error) {
    console.warn(error);
  }

  // createUser(account.value, password.value)
  //   .then((userCredential: FirebaseUserCredential) => {
  //     // Signed up
  //     const user = userCredential.user as FirebaseUser;
  //     console.log(user);
  //     // ...
  //   })
  //   .catch((error: FirebaseError) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorCode, errorMessage);
  //     // ..
  //   });
}

// console.log(db);
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
