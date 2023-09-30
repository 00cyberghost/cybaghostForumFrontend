<script setup>
import {useAuthStore} from "/stores/authStore"
const { mode,utils } = useUtils();

defineProps({
    categories : Object
})

const hideMenu = () => {

    document.getElementById('menu').classList.add('hidden')
}

const launchMenu = () => {

document.getElementById('menu').classList.remove('hidden')
}

onUpdated(() => {
    if(window.screen.width < 701){

        setTimeout(() => {
            //close menu when a link is clicked
        const links = document.querySelectorAll('a')

links.forEach(el => el.addEventListener('click',hideMenu))
        },2000)
        
        
    }

    
})

        


    
    
</script>
<template>
    <footer class="relative text-sm" v-if="useAuthStore().user != null">
        <div class="dark-card fixed bottom-0 md:hidden w-full">
            <ul class="list-none p-4 flex flex-row justify-between">
                <li :class="{'border-b-2 border-rose-500 text-rose-500': $route.path == '/'}"><NuxtLink to="/"><ClientOnly><font-awesome-icon icon="fa-home" /></ClientOnly></NuxtLink></li>
                <li class="relative" :class="{'border-b-2 border-rose-500 text-rose-500': $route.name == 'notifications'}"><NuxtLink to="/notifications"><ClientOnly><font-awesome-icon icon="fa-bell" /><span class="hidden absolute text-xs top-0 left-2 p-[2px] px-[6px] bg-primary text-white rounded-full" id="notification-count-mobile"></span></ClientOnly></NuxtLink></li>
                <li :class="{'border-b-2 border-rose-500 text-rose-500': $route.name == 'timeline'}"><NuxtLink to="/timeline"><ClientOnly><font-awesome-icon icon="fa-users" /></ClientOnly></NuxtLink></li>
                <li><NuxtLink to="/dashboard"><ClientOnly><font-awesome-icon icon="fa-user" /></ClientOnly></NuxtLink></li>
                <li @click="launchMenu"><ClientOnly><font-awesome-icon icon="fa-bars" /></ClientOnly></li>
            </ul>
        </div>

        <div id="menu" class="hidden dark-card fixed w-full h-full z-50 bottom-0 overflow-y-auto bg-slate-200">
            <div class="relative container max-w-full w-full p-2">
                <div class="fixed top-0 w-full">
                    
                    <ul class="list-none p-4 flex flex-row justify-between">
                        <li><button @click="hideMenu"><ClientOnly><font-awesome-icon class="text-3xl" icon="fa-angle-left" /></ClientOnly></button></li>
                        <li>MENU</li>
                        <li><span class="p-2 rounded-full bg-white dark:bg-darkness-100"><ClientOnly><font-awesome-icon class="text-xl" icon="fa-search" /></ClientOnly></span></li>
                    </ul>
                
                </div>

                <div class="dark-card shadow-inner bg-white mt-14 rounded-lg">
                    <div class="md:py-8 md:px-8 w-full flex flex-row rounded-xl px-2 dark:text-white py-1 mt-2">
                        <div class=" w-20 my-auto">
                            <img v-if="useAuthStore().user.image" class="h-12 w-12 md:h-20 md:w-20 object-cover rounded-full" :src="utils.userImage(useAuthStore().user.image)" alt="Woman's Face" />
                            <span v-else class="px-3 py-3 rounded-full bg-primary dark:text-white text-white uppercase">{{ useAuthStore().user.username.substring(0,2) }}</span>
                        </div>
                        <div class="space-y-2">
                            <p class="text-base">{{ useAuthStore().user.username }}</p>
                            <span class="text-xs">{{ useAuthStore().user.email }}</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-row flex-wrap mt-3 gap-2" v-if="$route.path.startsWith('/dashboard')">
                    
                    <div class="w-[45%] mx-auto"><NuxtLink :to="`/dashboard`"><div class=" dark:bg-darkness-100 bg-white p-3 rounded-lg">Dashboard</div></NuxtLink></div>
                    <div class="w-[45%] mx-auto"><NuxtLink :to="`/dashboard/my-profile`"><div class=" dark:bg-darkness-100 bg-white p-3 rounded-lg">My Profile</div></NuxtLink></div>
                    <div class="w-[45%] mx-auto"><NuxtLink :to="`/dashboard/update-profile`"><div class=" dark:bg-darkness-100 bg-white p-3 rounded-lg">Update Profile</div></NuxtLink></div>
                    <div class="w-[45%] mx-auto"><NuxtLink :to="`/dashboard/posts`"><div class=" dark:bg-darkness-100 bg-white p-3 rounded-lg">Posts</div></NuxtLink></div>
                    <div class="w-[45%] mx-auto"><NuxtLink :to="`/dashboard/topics`"><div class=" dark:bg-darkness-100 bg-white p-3 rounded-lg">Topics</div></NuxtLink></div>
                    <div class="w-[45%] mx-auto"><NuxtLink :to="`/dashboard/followers`"><div class=" dark:bg-darkness-100 bg-white p-3 rounded-lg">Followers</div></NuxtLink></div>
                    <div class="w-[45%] mx-auto"><NuxtLink :to="`/dashboard/following`"><div class=" dark:bg-darkness-100 bg-white p-3 rounded-lg">Following</div></NuxtLink></div>

                </div>

                <div v-else class="flex flex-row flex-wrap mt-3 gap-2">
                    <div v-for="category in categories" :key="category" class="w-[45%] mx-auto">
                        <NuxtLink :to="`/category/${category.name}`"><div class="dark:bg-darkness-100 bg-white p-3 rounded-lg">{{ category.name }}</div></NuxtLink>
                    </div>
                </div>

                
               
            </div>
        </div>
        
   </footer>


   <footer v-else class="relative text-sm">
        <div class="dark-card fixed bottom-0 md:hidden w-full">
            <ul class="list-none p-4 flex flex-row justify-between">
                <li :class="{'border-b-2 border-rose-500 text-rose-500': $route.path == '/'}"><NuxtLink to="/"><ClientOnly><font-awesome-icon icon="fa-home" /></ClientOnly></NuxtLink></li>
                <li class="relative" :class="{'border-b-2 border-rose-500 text-rose-500': $route.name == 'login'}"><NuxtLink to="/login">Login</NuxtLink></li>
                <li class="relative" :class="{'border-b-2 border-rose-500 text-rose-500': $route.name == 'register'}"><NuxtLink to="/login">Register</NuxtLink></li>
               
                <li @click="launchMenu"><ClientOnly><font-awesome-icon icon="fa-bars" /></ClientOnly></li>
            </ul>
        </div>

        <div id="menu" class="hidden dark-card fixed w-full h-full z-50 bottom-0 overflow-y-auto bg-slate-200">
            <div class="relative container max-w-full w-full p-2">
                <div class="fixed top-0 w-full">
                    
                    <ul class="list-none p-4 flex flex-row justify-between">
                        <li><button @click="hideMenu"><ClientOnly><font-awesome-icon class="text-3xl" icon="fa-angle-left" /></ClientOnly></button></li>
                        <li>MENU</li>
                        <li><span class="p-2 rounded-full bg-white dark:bg-darkness-100"><ClientOnly><font-awesome-icon class="text-xl" icon="fa-search" /></ClientOnly></span></li>
                    </ul>
                
                </div>

                <div v-if="useAuthStore().user != null" class="dark-card shadow-inner bg-white mt-14 rounded-lg">
                    <div class="md:py-8 md:px-8 w-full flex flex-row rounded-xl px-2 dark:text-white py-1 mt-2">
                        <div class=" w-20 my-auto">
                            <img v-if="useAuthStore().user.image" class="h-12 w-12 md:h-20 md:w-20 object-cover rounded-full" :src="utils.userImage(useAuthStore().user.image)" alt="Woman's Face" />
                            <span v-else class="px-3 py-3 rounded-full bg-primary dark:text-white text-white uppercase">{{ useAuthStore().user.username.substring(0,2) }}</span>
                        </div>
                        <div class="space-y-2">
                            <p class="text-base">{{ useAuthStore().user.username }}</p>
                            <span class="text-xs">{{ useAuthStore().user.email }}</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-row flex-wrap mt-12 gap-2">
                    <div v-for="category in categories" :key="category" class="w-[45%] mx-auto">
                        <NuxtLink :to="`/category/${category.name}`"><div class="dark:bg-darkness-100 bg-white p-3 rounded-lg">{{ category.name }}</div></NuxtLink>
                    </div>
                </div>
               
            </div>
        </div>
        
   </footer>
</template>