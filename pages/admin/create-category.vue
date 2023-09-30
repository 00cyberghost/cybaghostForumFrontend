<script setup>
    // import { useMyStore } from "~/stores/myStore"
    import {useAuthStore} from "~/stores/authStore"
    const { utils } = useUtils()
    definePageMeta({
        middleware: ["auth"]
    })

    const form = {
        'name' : '',
    }



    let errors = ref([])
    let message = ref(null)

    const create = async () => {

        myFetch('/admin',{
            method : 'post',
            body : form
        })
        .then((data) => {

            message.value = data.message
            
            let name = document.getElementById('name')
            
            name.value = ''

            name.nextElementSibling.textContent = ''

        })
        .catch((error) => {
            console.log(error)
            errors.value = error.data
        })
    }

</script>

<template>
   
   

    <div class="container w-full mx-auto">
        
        <div class="relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-center bg-cover min-h-50-screen rounded-xl bg-[url(/img/curved8.jpg)]">
            <span class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-60"></span>
            <div class="container z-10">
                <div class="flex flex-wrap justify-center -mx-3">
                <div class="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                    <h1 class="mt-12 mb-2 text-white">{{ message }}</h1>
                    <p class="text-white">We are happy that you want to join us. kindly feel the form below</p>
                </div>
                </div>
            </div>
        </div>
        
        <div class="flex flex-wrap mb-5 -mt-48 md:-mt-56 lg:-mt-48">
            <div class="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-4/5">
                <div class="relative md:w-full z-0 flex flex-col min-w-0 break-words bg-white dark:bg-darkness-200 border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                   
                    <div class="flex-auto p-6">
                    <form role="form text-left" @submit.prevent="create">

                        
                        <div class="mt-5">
                            <input v-model="form.name" class="bg-transparent capitalize dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="name" name="name" type="text" required placeholder="name" aria-label="name">
                            <div v-if="errors.name" class="text-red-600 text-center w-full ">{{ errors.name.message }}</div>
                        </div>
                        
                        <div class="text-center">
                        <button id="create-button" type="submit" class="animate-pulse inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-primary hover:border-rose-700 hover:bg-fuchsia-700 hover:text-white">Create</button>
                        </div>
                        
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>







