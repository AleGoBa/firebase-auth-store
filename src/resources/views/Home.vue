<script setup>
import {useUserAuthStore} from "../../store/useUserAuthStore.js";
import {auth} from "../../config/firebaseConfig.js"

const userAuthStore = useUserAuthStore()

</script>

<template>
  <main v-if="auth.currentUser">
    <h1 class="text-center my-5">Home</h1>
    <h1 >Bienvenido {{userAuthStore.user.email}}</h1>
  </main>
</template>