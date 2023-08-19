<script setup>
import {useUserAuthStore} from "../../store/useUserAuthStore.js";
import {storeToRefs} from "pinia";

const authStore = useUserAuthStore()

const {hasActiveSession} = storeToRefs(authStore)

const {logout} = authStore;


</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand nav-item" to="/">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 d-flex justify-content-start w-100 mb-lg-0">
          <li class="nav-item" v-if="hasActiveSession">
            <router-link to="/urls" class="nav-link">Mis Urls</router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 d-flex justify-content-end w-100 mb-lg-0">
          <li class="nav-item" v-if="!hasActiveSession">
            <router-link to="/register" class="nav-link">Registrarse</router-link>
          </li>
          <li class="nav-item" v-if="!hasActiveSession">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item" v-if="hasActiveSession">
            <a @click="logout" role="button" class="nav-link">Cerrar sesión</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>