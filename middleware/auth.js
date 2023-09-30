import { useAuthStore } from "~/stores/authStore"

export default defineNuxtRouteMiddleware((to,from) => {

    if (process.server) return
    
    const isLoggedIn = useAuthStore().TOKEN

    const routes = [
        'dashboard',
        'create-topic',
        'admin/create-category',
        'dashboard/followers',
        'dashboard/following',
        'dashboard/posts',
        'dashboard/topics',
        'dashboard/update-profile',
        'timeline',
        'notifications',
    ]

    if(to.path.matchAll(routes)){

        if(isLoggedIn == null){

            return navigateTo('/login')
        }

        navigateTo(to.fullPath)
    }
})