import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {auth} from "../config/firebaseConfig.js";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"
import {useRouter} from "vue-router";
import {toast} from "vue3-toastify";
import {useUrlsStore} from "./useUrlsStore.js";

export const useUserAuthStore = defineStore('useUserAuthStore', () => {
    const router = useRouter()
    const user = ref({})

    onAuthStateChanged(auth, (activeUser) => {
        if (user) {
            user.value = activeUser;
        } else {
            reset()
        }
    })

    const register = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                user.value = userCredential.user;
                router.push("/");
            })
            .catch((error) => {
                toast.error(error.message)
            });
    }

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                user.value = userCredential.user;
                router.push("/");
            })
            .catch((error) => {
                toast.error("Email o contraseña incorrectos")
            });
    }

    const logout = () => {
        const urlsStore = useUrlsStore()
        signOut(auth).then(() => {
            urlsStore.reset()
            reset();
            console.log("jiji")
            router.push("/login");
        }).catch((error) => {
            toast.error(error.message)
        });
    }

    const getActiveUserSession = () => {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    user.value = user;
                    resolve(true);
                } else {
                    reset()
                    resolve(false)
                }
            })
        });
    }

    const hasActiveSession = computed(() => {
        return user.value?.email;
    })

    const reset = () => {
        user.value = {};
    }

    return {
        user,
        register,
        login,
        logout,
        getActiveUserSession,
        hasActiveSession,
        reset
    }
})