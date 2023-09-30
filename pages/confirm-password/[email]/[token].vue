<script setup>
useHead({
        title: 'Confirm Password - Cybaghost Forum',
        meta: [
            { name: 'description', content: 'All about my forum' }
        ]
    })
    const { utils } = useUtils()

    const form = {
        'password' : '',
        'token' : '',
        'email' : ''
    }



    let errors = ref([])
    const isLoading = ref(false)

    const reset = async () => {
        isLoading.value = true

        form.token = useRoute().params.token
        form.email = useRoute().params.email

        myFetch('/reset',{
            method : 'put',
            body : form
        })
        .then((data) => {
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
                
                <form @submit.prevent="reset" class="md:max-w-xl bg-[#00000079] w-full m-4 p-10 rounded-2xl shadow-xl mx-auto dark:bg-darkness-200">
                    <p class="font-medium text-center text-lg text-white">Change Password</p>
                    <div class="mt-5">
                            <input v-model="form.password" @focus="utils.removeError" class="bg-transparent text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="password" name="password" type="password" required placeholder="Password" aria-label="password">
                        <div v-if="errors.password" class="text-red-600 text-center w-full " >{{ errors.password.message }}</div>
                    </div>
                    <div class="mt-5">
                        <input @keyup="utils.ConfirmPassword($event,form.password)" @focus="utils.removeError" class="bg-transparent text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="password_confirm" name="password" type="password" required placeholder="Confirm Password" aria-label="password">
                        <div class="text-red-600 text-center w-full "></div>
                    </div>
                    <div class="mt-8 items-center justify-between">
                        <button class="px-4 py-1 text-white font-light tracking-wider bg-primary rounded" type="submit">Update</button>
                    </div>
                </form>

                
            
            </div>
    </div>

   </div>
  
</template>






