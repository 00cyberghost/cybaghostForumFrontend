<script setup>
    // import { useMyStore } from "~/stores/myStore"
    import {useAuthStore} from "~/stores/authStore"
    useHead({
        title: 'login - Cybaghost Forum',
        meta: [
            { name: 'description', content: 'Login to forum' }
        ]
    })
    const { utils } = useUtils()

    const form = {
        'email' : '',
        'password' : ''
    }



    let errors = ref([])
    const isLoading = ref(false)

    const login = async () => {

        isLoading.value = true

        myFetch('/login',{
            method : 'post',
            body : form
        })
        .then((data) => {

            useAuthStore().login(data)
            isLoading.value =false
        })
        .catch((error) => {
            errors.value = error.data
        })
    }

</script>
<template>
  
   <div class="bg-[url(/img/background-1.jpg)] object-cover bg-cover h-screen">

        <div class="container w-full mx-auto fixed top-[20%]">
            <div class="w-full h-screen">
                <Loader :isLoading="isLoading" />
                
                <form @submit.prevent="login" class="md:max-w-xl bg-[#00000079] w-full m-4 p-10 rounded-2xl shadow-xl mx-auto dark:bg-darkness-200">
                    <p class="font-medium text-center text-lg text-white mb-5">Login</p>
                    <p class="mt-5 mb-5 text-white text-center" v-if="errors.error">{{ errors.error.message }}</p>
                    <div class="">
                        <input v-model="form.email" @focus="utils.removeError" class=" bg-transparent text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="email" name="email" type="email" required="" placeholder="Email" aria-label="email">
                        <div v-if="errors.email" class="text-red-600 text-center w-full " >{{ errors.email.message }}</div>
                    </div>
                    <div class="mt-5">
                        <input v-model="form.password" @focus="utils.removeError" class="bg-transparent text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="password" name="password" type="password" required="" placeholder="Password *******" aria-label="password">
                        <div v-if="errors.password" class="text-red-600 text-center w-full " >{{ errors.password.message }}</div>
                    </div>
                    <div class="mt-8 items-center justify-between">
                    <button class="px-4 py-1 text-white font-light tracking-wider bg-primary rounded" type="submit">Login</button>
                    <NuxtLink class="mt-4 block right-0 align-baseline  font-bold text-sm text-primary hover:text-black" to="/forgot-password">
                        Forgot Password?
                    </NuxtLink>
                    </div>
                    <NuxtLink class="block mt-4 right-0 align-baseline font-bold text-sm text-primary hover:text-black" to="/register">
                    Not registered ?
                    </NuxtLink>
                </form>

                
            
            </div>
    </div>

   </div>
   
</template>





