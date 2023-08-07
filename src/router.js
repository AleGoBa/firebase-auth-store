import {createRouter, createWebHistory} from "vue-router";
import {useUserAuthStore} from "./store/useUserAuthStore.js";

const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        linkActiveClass: 'active',
        routes: [
            {
                path: '/',
                name: 'home',
                component: () => import('./resources/views/Home.vue')
            },
            {
                path: '/login',
                name: 'login',
                component: () => import('./resources/views/auth/Login.vue')
            },
            {
                path: '/register',
                name: 'register',
                component: () => import("./resources/views/auth/Register.vue")
            },
        ]
    }
)

router.beforeEach(async (to, from, next) => {
    const userAuthStore = useUserAuthStore()
    const isActiveSession = await userAuthStore.getActiveUserSession();
    if (!isActiveSession && to.name !== 'login') {
        next({name: 'login'})
    } else {
        next()
    }
})

export default router