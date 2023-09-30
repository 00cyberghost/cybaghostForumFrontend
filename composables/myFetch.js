import {useAuthStore} from "~/stores/authStore"
export const myFetch = async (url, options) => {
    const config = useRuntimeConfig()
  
    const data = await $fetch(url, {
        baseURL : config.public.baseURL,
        headers : {Authorization : `Bearer ${useAuthStore().TOKEN}`},
        ...options
    })

    return data

  }