<script setup>
import {useUserAuthStore} from "../../store/useUserAuthStore.js";

const userAuthStore = useUserAuthStore()
</script>

<template>
  <main>
    <h1 class="text-center my-5">Home</h1>
    <h1 v-if="userAuthStore.user">Bienvenido {{userAuthStore.user.email}}</h1>
  </main>
</template>