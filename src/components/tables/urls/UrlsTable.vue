<script setup>
import {useUrlsStore} from "../../../store/useUrlsStore.js";
import {storeToRefs} from "pinia";
import {useUrlsModal} from "../../../composables/ulrs/modals/useUrlsModal.js";

const urlsStore = useUrlsStore()
const urlsModal = useUrlsModal();

const {getUrls, deleteUrl} = urlsStore;
const {urls} = storeToRefs(urlsStore)

getUrls()

const {show} = urlsModal
</script>

<template>
  <main>
    <table class="table text-nowrap">
      <thead>
      <tr class="text-start">
        <th scope="col" class="w-auto">ID</th>
        <th scope="col" class="w-75">URL completa</th>
        <th scope="col" class="w-25">URL acortada</th>
        <th scope="col" class="w-auto">Acciones</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="url in urls">
        <tr>
          <td>{{ url.id }}</td>
          <td class="text-wrap">{{ url.name }}</td>
          <td>{{ url.short }}</td>
          <td>
            <button class="btn mx-1" @click="show({urlId: url.id, edit: false})">
              <i class="bi bi-eye-fill"></i>
            </button>
            <button class="btn mx-1" @click="show({urlId: url.id, edit: true})">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="btn mx-1" @click="deleteUrl(url.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </main>
</template>