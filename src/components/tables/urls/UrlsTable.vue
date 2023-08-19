<script setup>
import {useUrlsStore} from "../../../store/useUrlsStore.js";
import {storeToRefs} from "pinia";
import {useUrlsModal} from "../../../composables/ulrs/modals/useUrlsModal.js";
import {ref} from "vue";
import {FadeLoader} from "vue3-spinner";

const ready = ref(false)

const urlsStore = useUrlsStore()
const urlsModal = useUrlsModal();

const {getUrls} = urlsStore;
const {urls} = storeToRefs(urlsStore)

getUrls()

const {show} = urlsModal

const deleteUrl = (urlId) => {
  ready.value = false;
  urlsStore.deleteUrl(urlId)
      .then(() => ready.value = true)
}

ready.value = true;
</script>

<template>
  <main>
    <table v-if="ready" class="table text-nowrap">
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
    <div v-else class="d-flex justify-content-center my-4">
      <FadeLoader style="height: 200px; position: absolute" />
    </div>
  </main>
</template>