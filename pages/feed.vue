<script setup>
// import { useMyStore } from "~/stores/myStore"
const { utils } = useUtils();
</script>
<template>
   
   <div class="container w-full mx-auto mt-14">
    <div class="w-full md:grid md:grid-cols-8 h-screen">
        <div class="hidden md:block col-span-2 relative">
            <SideBarDesktopCategory />
        </div>
        <div class="col-span-7 md:col-span-6">

            <div class="dark-card w-full mx-auto dark:text-white rounded-xl shadow-2xl overflow-hidden my-5">
                <div class="md:flex">
                    <div class="md:shrink-0">
                        <img class="h-56 w-full object-cover md:h-full md:w-48" src="/img/erin-lindford.jpg" alt="Modern building architecture">
                    </div>
                    <div class="w-full pt-2">
                        <div class="w-[85%] inline-block align-top px-4 py-1">
                            <div class="text-xs font-bold"><NuxtLink to="/user/clinton/1" class=" no-underline">Ozor Clinton</NuxtLink> <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span></div>
                            <small><span>Politics.</span> &nbsp; <span>7h ago</span> &nbsp; <span>73 <i class="bi bi-eye"></i></span></small>
                            <NuxtLink to="/topic/details/id" class="block mt-3 text-lg leading-tight font-medium hover:underline">Incredible accommodation for your team</NuxtLink>
                            <p class="mt-2">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
                        </div>

                        <div class="md:shrink-0 w-[14%] pl-2 inline-block align-top">
                            <NuxtLink to="/user/clinton/1" class=" no-underline"><img src="/img/erin-lindford.jpg" class="object-cover rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt=""></NuxtLink>
                            <div class="mt-5 h-44 w-full rounded-xl border-l md:border-none md:shadow-none">
                                <div class="text-center text-xs text-rose-500 "><i class="bi bi-heart-fill text-2xl "></i> <span class="block">2</span></div>
                                <div class="text-center text-xs text-rose-500 mt-3"><i class="bi bi-share text-2xl "></i> <span class="block">3k</span></div>
                                <div class="text-center text-xs text-rose-500 mt-3"><i class="bi bi-chat text-2xl "></i> <span class="block">2.5k</span></div>
                            
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>



        </div>
       
    </div>
   </div>
  
</template>