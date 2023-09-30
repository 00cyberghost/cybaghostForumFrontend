export default defineEventHandler(async (event) => {



    const form = await readBody(event)

    const data = await $fetch(`${useRuntimeConfig().public.baseURL}/register`,{
        method : 'post',
        body : form
    })

    return data
})