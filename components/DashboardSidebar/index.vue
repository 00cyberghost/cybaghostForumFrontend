<script setup>
import { useAuthStore } from '/stores/authStore';
const auth = useAuthStore()
</script>
<template>
    <div class="dark:text-white h-screen left-scrollbar fixed overflow-y-auto w-[23%]">
        <ul class="flex flex-col gap-y-4 relative mt-7">
            <li class="p-4 w-[90%] mx-auto dark:text-white" :class="{'bg-primary text-white rounded-2xl dark:bg-black' : $route.path == '/dashboard'}"><NuxtLink to="/dashboard"> <span class="ml-5">Dashboard</span></NuxtLink></li>
            <li class="p-4 w-[90%] mx-auto dark:text-white" :class="{'bg-primary text-white rounded-2xl dark:bg-black' : $route.path == '/dashboard/my-profile'}"><NuxtLink to="/dashboard/my-profile"> <span class="ml-5">My Profile</span></NuxtLink></li>
            <li class="p-4 w-[90%] mx-auto dark:text-white" :class="{'bg-primary text-white rounded-2xl dark:bg-black' : $route.path == '/dashboard/update-profile'}"><NuxtLink to="/dashboard/update-profile"> <span class="ml-5">Update Profile</span></NuxtLink></li>
            <li class="p-4 w-[90%] mx-auto dark:text-white" :class="{'bg-primary text-white rounded-2xl dark:bg-black' : $route.path == '/dashboard/posts'}"><NuxtLink to="/dashboard/posts"> <span class="ml-5">My Posts</span></NuxtLink></li>
            <li class="p-4 w-[90%] mx-auto dark:text-white" :class="{'bg-primary text-white rounded-2xl dark:bg-black' : $route.path == '/dashboard/topics'}"><NuxtLink to="/dashboard/topics"> <span class="ml-5">My Topics</span></NuxtLink></li>
            <li class="p-4 w-[90%] mx-auto dark:text-white" :class="{'bg-primary text-white rounded-2xl dark:bg-black' : $route.path == '/dashboard/followers'}"><NuxtLink to="/dashboard/followers"> <span class="ml-5">My Followers</span></NuxtLink></li>
            <li class="p-4 w-[90%] mx-auto dark:text-white" :class="{'bg-primary text-white rounded-2xl dark:bg-black' : $route.path == '/dashboard/following'}"><NuxtLink to="/dashboard/following"> <span class="ml-5">Following</span></NuxtLink></li>
            <li v-if="(auth.user != null && auth.user.level == 1)" class="p-4 w-[90%] mx-auto dark:text-white" :class="{'bg-primary text-white rounded-2xl dark:bg-black' : $route.path == '/dashboard/create-category'}"><NuxtLink to="/admin/create-category"> <span class="ml-5">Create Category</span></NuxtLink></li>
            <li class="p-4 w-[90%] mx-auto dark:text-white mb-12"><button @click="auth.logout"><span class="ml-5">Log Out</span></button></li>
            
        </ul>
    </div>
</template>
