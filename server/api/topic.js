export default defineEventHandler(async () => {


    const data = await $fetch(`${useRuntimeConfig().public.baseURL}/topic`,{
        method : 'get'})

    return {data}
})