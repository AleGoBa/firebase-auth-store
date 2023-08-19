<script setup>
import UrlsTable from "../../../components/tables/urls/UrlsTable.vue";
import {useUrlsModal} from "../../../composables/ulrs/modals/useUrlsModal.js";
const urlsModal = useUrlsModal();

const {show} = urlsModal
</script>

<template>
  <main class="py-5">
    <div class="row justify-content-start">
      <div class="col-12">
        <h1 class="text-start"> URLS </h1>
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-12 text-end">
        <button class="btn btn-primary" @click="show({})">
          Agregar nueva URL
        </button>
      </div>
    </div>
    <div class="row overflow-x-scroll my-4">
      <UrlsTable />
    </div>
  </main>
</template>