<script setup>
import {useAuthStore} from "/stores/authStore"
const { mode,utils } = useUtils();

onNuxtReady(() => {
    //check mode
    mode.toggleMode()
})


defineProps({
    back_button: Boolean
})

const getUnreadNotificationsCount = async() => {

myFetch('/notification/unread/count')
.then(data => {
    let el = document.getElementById('notification-count')
    el.textContent = data[0].count
    el.classList.remove('hidden')
})
}

setTimeout(() => {useAuthStore().user != null ? getUnreadNotificationsCount() : ''},3000)



        


    
    
</script>
<template>
    <header class="dark-card shadow-xl w-full fixed mt-0 top-0 bg-white z-50">
        <div class="container mx-auto px-2 md:px-10 flex flex-row h-12 gap-3 w-full">
            <div class="w-[20%] md:w-[20%] lg:w-[30%] items-center py-2 whitespace-nowrap" :class="{'hidden': back_button}"><NuxtLink to="/">My Logo</NuxtLink></div>
            <div class="w-[60%] items center py-2">
                <button @click="utils.goBack" v-if="back_button"><ClientOnly><font-awesome-icon class="text-3xl" icon="fa-angle-left" /></ClientOnly></button>
                <ul v-else class="list-none hidden md:flex flex-row justify-between">
                    <li :class="{'border-b-2 border-rose-500 text-rose-500': $route.path == '/'}"><NuxtLink to="/"><ClientOnly><font-awesome-icon icon="fa-home" /></ClientOnly></NuxtLink></li>
                    <li class="relative" :class="{'border-b-2 border-rose-500 text-rose-500': $route.name == 'notifications'}"><NuxtLink to="/notifications"><ClientOnly><font-awesome-icon icon="fa-bell" /><span class="hidden absolute text-xs top-0 left-2 p-[2px] px-[6px] bg-primary text-white rounded-full" id="notification-count"></span></ClientOnly></NuxtLink></li>
                    <li :class="{'border-b-2 border-rose-500 text-rose-500': $route.name == 'timeline'}"><NuxtLink to="/timeline"><ClientOnly><font-awesome-icon icon="fa-users" /></ClientOnly></NuxtLink></li>
                    <li><NuxtLink to="/dashboard"><ClientOnly><font-awesome-icon icon="fa-user" /></ClientOnly></NuxtLink></li>
                    <li class=" relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                            <ClientOnly><font-awesome-icon icon="fa-solid fa-search" /></ClientOnly>
                        </span>
                        <input class="dark:bg-darkness-100 placeholder:italic placeholder:text-slate-400 block bg-white w-fit border border-fuchsia-300 rounded-md py-1 pl-9 pr-3 shadow-sm focus:outline-none focus:border-rose-500 focus:ring-rose-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
                    </li>
                </ul>
                
            </div>
            <div class="w-[20%] md:w-[30%] lg:w-[40%] py-2 items-center">
                <ul class="flex list-none justify-end space-x-5">
                    <li v-if="mode.isDark == 'light'"><ClientOnly><font-awesome-icon @click="mode.tmode" icon="fa-sun" /></ClientOnly></li>
                    <li v-else><ClientOnly><font-awesome-icon @click="mode.tmode" icon="fa-moon" /></ClientOnly></li>
                    <li @click="useAuthStore().logout"><ClientOnly><font-awesome-icon icon="fa-power-off" /></ClientOnly></li>
                    <li><NuxtLink to="/create-topic" class="whitespace-nowrap py-[5px] text-xs text-white px-4 rounded-xl outline-none border-none bg-primary">Create Post</NuxtLink></li>
                </ul>

            </div>
        </div>
    </header>
</template>
