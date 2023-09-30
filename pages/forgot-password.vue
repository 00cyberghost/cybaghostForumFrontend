<script setup>
    useHead({
        title: 'Forgot Password - Cybaghost Forum',
        meta: [
            { name: 'description', content: 'Forgot your password' }
        ]
    })
    const { utils } = useUtils()

    const form = {
        'email' : ''
    }



    let errors = ref([])
    const isLoading = ref(false)

    const requestReset = async () => {

        isLoading.value = true

        myFetch('/reset',{
            method : 'post',
            body : form
        })
        .then((data) => {

            utils.notifySuccess('EMAILED!','We have sent your password reset link to your email. Please check your inbox or spam folder for this mail')
            navigateTo('/login')
        })
        .catch((error) => {
            errors.value = error.data
        })
        .finally(() => isLoading.value = false)
    }

</script>
<template>
   
   <div class="bg-[url(/img/background-1.jpg)] object-cover bg-cover h-screen">

        <div class="container w-full mx-auto fixed top-[20%]">
            <div class="w-full h-screen">

                <Loader :isLoading="isLoading" />
                <form @submit.prevent="requestReset" class="md:max-w-xl bg-[#00000079] w-full m-4 p-10 rounded-2xl shadow-xl mx-auto dark:bg-darkness-200">
                    <p class="font-medium text-center text-lg text-white">We Will Email You</p>
                    <div class="">
                    <input v-model="form.email" class=" bg-transparent text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="email" name="email" type="email" required placeholder="Email" aria-label="email">
                    <div v-if="errors.email" class="text-red-600 text-center w-full " >{{ errors.email.message }}</div>
                    </div>
                    
                    <div class="mt-8 items-center justify-between">
                    <button class="px-4 py-1 text-white font-light tracking-wider bg-primary rounded" type="submit">Email Me</button>
                    <NuxtLink class="mt-4 block right-0 align-baseline  font-bold text-sm text-primary hover:text-black" to="/login">
                        Take me to login?
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




