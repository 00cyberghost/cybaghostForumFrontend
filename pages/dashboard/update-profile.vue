<script setup>
    // import { useMyStore } from "~/stores/myStore"
    definePageMeta({
        middleware: ["auth"]
    })
    useHead({
        title: 'Update my profile - Cybaghost Forum',
        meta: [
            { name: 'description', content: 'All about my forum' }
        ]
    })
    const { utils } = useUtils();

    const users = ref(null)

    const isLoading = ref(true)

    let errors = ref([])

    myFetch('/user/show-user')
    .then(data => users.value = data)
    .finally(() => isLoading.value = false)

    const form = {
        'gender' : null,
        'name' : null,
        'location' : null,
        'about' : null,
        'facebook' : null,
        'twitter' : null,
        'instagram' : null,
        'tiktok' : null
    }

    const updateProfile = () => {
        form.gender = document.getElementById('gender').value
        form.name = document.getElementById('name').value
        form.location = document.getElementById('location').value
        form.about = document.getElementById('about').value
        form.facebook = document.getElementById('facebook').value
        form.twitter = document.getElementById('twitter').value
        form.instagram = document.getElementById('instagram').value
        form.tiktok = document.getElementById('tiktok').value

        myFetch('/user/my-profile',{
            method : 'put',
            body : form
        })
        .then((data) => {

            navigateTo('/dashboard/my-profile')
        })
        .catch((error) => {
            console.log(error.data)
            errors.value = error.data
        })
    }

    //launch the dropzone ui
    const launchDropzone = (event) => {
        const dropzone = document.getElementById('dropzone')
        dropzone.classList.remove('hidden')
        dropzone.click()
    }
</script>
<template>

   <div class="container w-full mx-auto mt-14">
    <div class="w-full md:grid md:grid-cols-8 h-screen">
        <div class="hidden md:block col-span-2 relative">
            <DashboardSidebar />
        </div>
        <div class="col-span-7 md:col-span-6">
            <Loader :isLoading="isLoading" />
            <div class="container w-full mx-auto">

                <div class="fixed top-56 z-10 w-full" id="uploadContainer">
                    <div class="relative">
                        
                        <ProfileImage />
                    </div>
                </div>
             
             <div class="relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-center bg-cover min-h-50-screen rounded-xl bg-[url(/img/curved8.jpg)]">
                 <span class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-60"></span>
                 <div class="container z-10">
                     <div class="flex flex-wrap justify-center -mx-3">
                     <div class="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                         <h1 class="mt-12 mb-2 text-white">Welcome!</h1>
                         <p class="text-white">Hey, kindly update your profile</p>
                     </div>
                     </div>
                 </div>
             </div>
             
             <div v-for="user in users" :key="user" class="flex flex-wrap mb-5 -mt-48 md:-mt-56 lg:-mt-48">
                 <div class="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-1/2">
                     <div class="relative md:w-full z-0 flex flex-col min-w-0 break-words bg-white dark:bg-darkness-200 border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                         
                         <div class="flex-auto p-6">
                            <button @click="launchDropzone" class="btn btn-primary dark:text-white bg-primary p-3 rounded-2xl mb-8">Upload Profile Picture</button>
                            <form @submit.prevent="updateProfile" role="form">
                                <div>
                                    <input :value="user.email" disabled class="bg-transparent dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="email" name="email" type="email" required="" placeholder="Email" aria-label="email">
                                </div>
                                <div class="mt-5">
                                    <input :value="user.username" class=" bg-transparent dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="username" name="username" type="text" required="" placeholder="username" aria-label="username">
                                </div>
                                <div class="mt-5">
                                    <select placeholder="gender" class="bg-transparent dark:bg-black dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="gender"  aria-label="gender">
                                        <option value="" selected disabled>Gender</option>
                                        <option :selected="user.gender == 'Male'">Male</option>
                                        <option :selected="user.gender == 'Female'">Female</option>
                                    </select>
                                </div>

                                <div class="mt-5">
                                    <input :value="user.name" class=" bg-transparent dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="name" name="name" type="text" placeholder="Full Name" aria-label="full name">
                                    <div v-if="errors.name" class="text-red-600 text-center w-full " >{{ errors.name.message }}</div>
                                </div>

                                <div class="mt-5">
                                    <input :value="user.location" class=" bg-transparent dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="location" name="location" type="text" placeholder="location" aria-label="location">
                                    <div v-if="errors.location" class="text-red-600 text-center w-full " >{{ errors.location.message }}</div>
                                </div>

                                <div class="mt-5">
                                    <textarea :value="user.about" class="bg-transparent focus:h-60 dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="about" name="about" placeholder="About me" aria-label="about me"></textarea>
                                    <div v-if="errors.about" class="text-red-600 text-center w-full " >{{ errors.about.message }}</div>
                                </div>

                                <div class="mt-5">
                                    <input :value="user.facebook" class=" bg-transparent dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="facebook" name="facebook" type="text" placeholder="facebook" aria-label="facebook">
                                    <div v-if="errors.facebook" class="text-red-600 text-center w-full " >{{ errors.facebook.message }}</div>
                                </div>

                                <div class="mt-5">
                                    <input :value="user.twitter" class=" bg-transparent dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="twitter" name="twitter" type="text" placeholder="twitter" aria-label="twitter">
                                    <div v-if="errors.twitter" class="text-red-600 text-center w-full " >{{ errors.twitter.message }}</div>
                                </div>

                                <div class="mt-5">
                                    <input :value="user.instagram" class=" bg-transparent dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="instagram" name="instagram" type="text" placeholder="instagram" aria-label="instagram">
                                    <div v-if="errors.instagram" class="text-red-600 text-center w-full " >{{ errors.instagram.message }}</div>
                                </div>

                                <div class="mt-5">
                                    <input :value="user.tiktok" class=" bg-transparent dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="tiktok" name="tiktok" type="text" placeholder="tiktok" aria-label="tiktok">
                                    <div v-if="errors.tiktok" class="text-red-600 text-center w-full " >{{ errors.tiktok.message }}</div>
                                </div>
                                
                                <div class="text-center mb-16">
                                <button type="submit" class="animate-pulse inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-primary hover:border-rose-700 hover:bg-fuchsia-700 hover:text-white">Update</button>
                                </div>
                            </form>
                         </div>
                     </div>
                 </div>
             </div>
        </div>

        </div>
       
    </div>
   </div>

</template>