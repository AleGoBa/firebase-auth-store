<script setup>
import {VueFinalModal} from 'vue-final-modal';
import {useUrlsStore} from "../../store/useUrlsStore.js";
import {ref} from "vue";
import {auth} from "../../config/firebaseConfig.js";
import {FadeLoader} from "vue3-spinner";

const ready = ref(false)
const urlsStore = useUrlsStore()
const url = ref({
  name: null,
  short: null,
  user: auth.currentUser.uid
})
const readOnly = ref(false);

const emits = defineEmits(['hide'])
const props = defineProps({
  urlId: String,
  edit: Boolean
})

const {getUrl, saveUrl, updateUrl} = urlsStore;

if (props.urlId) {
  getUrl(props.urlId)
      .then((data) => url.value = data)
      .catch(() => emits('hide'))
      .finally(() => ready.value = true)

  readOnly.value = !props.edit;
}
const execAction = () => {
  ready.value = false;
  if (props.urlId) {
    if (props.edit) {
      updateUrl(props.urlId, url.value)
          .then(() => {
            emits('done')
          })
          .finally(() => ready.value = true)
    }
  } else {
    saveUrl(url.value)
        .then(() => {
          emits('done')
        })
        .finally(() => ready.value = true)
  }
}

ready.value = true;

</script>

<template>
  <VueFinalModal
      class="vue-modal"
      content-class="vue-modal-content"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
  >
    <div class="card p-0" style="width: 800px;" v-if="ready">
      <div class="card-header d-flex justify-content-between p-4 bg-dark text-white">
        <h2 class="card-title m-0">Urls</h2>
        <button type="button" class="btn text-white" @click="$emit('hide')">
          <h3 class="m-0"><i class="bi bi-x"></i></h3>
        </button>
      </div>
      <div class="card-body px-5 py-3">
        <form @submit.prevent="">
          <div class="row">
            <div class="col-12 my-3">
              <label for="url">Url</label>
              <input type="text" class="form-control" v-model="url.name"
                     :disabled="readOnly"/>
            </div>
            <div class="col-12 my-3">
              <label for="url">Url corta</label>
              <input type="text" class="form-control" v-model="url.short"
                     :disabled="readOnly"/>
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer d-flex justify-content-end px-5 py-3" v-if="!readOnly">
        <button type="button" class="btn btn-danger btn-lg" @click="execAction">
          Guardar
        </button>
      </div>
    </div>
    <FadeLoader v-else/>
  </VueFinalModal>
</template>
