<script setup>
import Navbar from "./components/layout/Navbar.vue";
</script>

<template>
  <main class="container g-5">
    <header class="row">
      <Navbar class="col-12"></Navbar>
    </header>
    <section class="row">
      <div class="col-12">
        <router-view/>
      </div>
    </section>
    <footer class="row mt-4">
      <h6 class="text-muted fw-normal text-center ">Desarrollado por DAGB</h6>
    </footer>
  </main>
</template>
