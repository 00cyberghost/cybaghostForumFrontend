<script setup>
    // import { useMyStore } from "~/stores/myStore"
    import {useAuthStore} from "~/stores/authStore"
    const { utils } = useUtils()
    useHead({
        title: 'Register - Cybaghost Forum',
        meta: [
            { name: 'description', content: 'Register' }
        ]
    })

    const form = {
        'username' : '',
        'email' : '',
        'password' : ''
    }



    let errors = ref([])
    const isLoading = ref(false)

    const register = async () => {

        isLoading.value = true

        myFetch('/register',{
            method : 'post',
            body : form
        })
        .then((data) => {

            useAuthStore().login(data)
        })
        .catch((error) => {
            errors.value = error.data
        })
        .finally(() => isLoading.value = false)
    }

</script>

<template>
   
   

    <div class="container w-full mx-auto">
        <Loader :isLoading="isLoading" />
        <div class="relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-center bg-cover min-h-50-screen rounded-xl bg-[url(/img/curved8.jpg)]">
            <span class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-60"></span>
            <div class="container z-10">
                <div class="flex flex-wrap justify-center -mx-3">
                <div class="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                    <h1 class="mt-12 mb-2 text-white">Welcome!</h1>
                    <p class="text-white">We are happy that you want to join us. kindly feel the form below</p>
                </div>
                </div>
            </div>
        </div>
        
        <div class="flex flex-wrap mb-5 -mt-48 md:-mt-56 lg:-mt-48">
            <div class="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                <div class="relative md:w-full z-0 flex flex-col min-w-0 break-words bg-white dark:bg-darkness-200 border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="p-6 mb-0 text-center bg-white dark:bg-darkness-200 border-b-0 rounded-t-2xl">
                    <h5>Register with</h5>
                    </div>
                    <div class="flex-auto p-6">
                    <form role="form text-left" @submit.prevent="register">
                        <div class="">
                            <input v-model="form.email" @focus="utils.removeError" class=" bg-transparent dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="email" name="email" type="email" required placeholder="Email" aria-label="email">
                            <div v-if="errors.email" class="text-red-600 text-center w-full " >{{ errors.email.message }}</div>
                        </div>
                        <div class="mt-5">
                            <input v-model="form.username" @focus="utils.removeError" class=" bg-transparent dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="username" name="username" type="text" required placeholder="username" aria-label="username">
                            <div v-if="errors.username" class="text-red-600 text-center w-full " >{{ errors.username.message }}</div>
                        </div>
                        <div class="mt-5">
                            <input v-model="form.password" @focus="utils.removeError" class="bg-transparent dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="password" name="password" type="password" required placeholder="Password" aria-label="password">
                            <div v-if="errors.password" class="text-red-600 text-center w-full " >{{ errors.password.message }}</div>
                        </div>
                        <div class="mt-5">
                            <input @keyup="utils.ConfirmPassword($event,form.password)" @focus="utils.removeError" class="bg-transparent dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="password_confirm" name="password" type="password" required placeholder="Confirm Password" aria-label="password">
                            <div class="text-red-600 text-center w-full "></div>
                        </div>
                        <div class="text-center">
                        <button id="register-button" type="submit" class="animate-pulse inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-primary hover:border-rose-700 hover:bg-fuchsia-700 hover:text-white">Register</button>
                        </div>
                        <p class="mt-4 mb-0 dark:text-white text-sm">Already have an account? <NuxtLink to="/login" class="font-bold text-slate-700">Sign in</NuxtLink></p>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
</template>







