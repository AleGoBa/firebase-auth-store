import {defineStore} from "pinia";
import {ref} from "vue";
import {auth, db} from "../config/firebaseConfig.js";
import {query, collection, getDocs, where, doc, getDoc, addDoc, updateDoc, deleteDoc} from "firebase/firestore/lite"
import {toast} from "vue3-toastify";

export const useUrlsStore = defineStore('useUrlsStore', () => {
    const urls = ref([]);


    const getUrls = async () => {
        reset()
        let q = query(collection(db, "urls"), where('user', "==", auth.currentUser.uid));
        let response = await getDocs(q);
        response.forEach(el => {
            urls.value.push({
                id: el.id,
                ...el.data()
            })
        })
    }

    const getUrl = async (urlId) => {
        return new Promise(async (resolve, reject) => {
            const docRef = doc(db, "urls", urlId)
            const urlDoc = await getDoc(docRef)
            if (urlDoc.exists()) {
                resolve(urlDoc.data())
            } else {
                toast.error(`La url con el id ${urlId} no existe.`);
                reject("404");
            }
        })
    }

    const saveUrl = async (urlData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const savedDoc = await addDoc(collection(db, 'urls'), urlData)
                toast.success(`Acción realizada correctamente`);
                resolve(savedDoc.id)
            } catch (err) {
                toast.error(`Hubo un error al guardar la url`);
                reject(err);
            }
        })
    }

    const updateUrl = async (urlId, urlData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedDoc = await updateDoc(doc(db, 'urls', urlId), urlData);
                toast.success(`Acción realizada correctamente`);
                resolve(updatedDoc)
            } catch (err) {
                toast.error(`Hubo un error al actualizar la url`);
                reject(err);
            }
        })
    }

    const deleteUrl = async (urlId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedDoc = await deleteDoc(doc(db, 'urls', urlId));
                toast.success(`Url borrada correctamente`);
                getUrls()
                resolve(deletedDoc)
            } catch (err) {
                toast.error(`Hubo un error al borrar la url`);
                reject(err);
            }
        })
    }

    const reset = () => {
        urls.value = [];
    }

    return {
        urls,
        getUrls,
        getUrl,
        saveUrl,
        updateUrl,
        deleteUrl,
        reset
    }
})