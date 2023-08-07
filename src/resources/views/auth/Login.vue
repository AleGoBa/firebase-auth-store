<script setup>
import {useUserAuthStore} from "../../../store/useUserAuthStore.js";
import {ref} from "vue";

const userAuthStore = useUserAuthStore();

const email = ref(null)
const password = ref(null)

</script>

<template>
  <form class="row justify-content-center flex-column m-auto g-3 align-items-center"
        @submit.prevent="userAuthStore.login(email, password)">
    <div class="col-6">
      <label for="inputEmail4" class="form-label">Email</label>
      <input type="email" required class="form-control" id="inputEmail4"
             v-model="email">
    </div>
    <div class="col-6">
      <label for="inputPassword4" class="form-label">Password</label>
      <input type="password" required min="8" class="form-control" id="inputPassword4"
             v-model="password">
    </div>
    <div class="col-6">
      <button type="submit" class="btn bg-primary bg-opacity-25 w-100">
        Ingresar
      </button>
    </div>
  </form>
</template>