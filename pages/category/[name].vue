<script setup>
import { useAuthStore } from '~/stores/authStore';
const { utils } = useUtils();

defineProps({
    categories : Object
})
useHead({
    title: 'Create A Category - Cybaghost Forum',
    meta: [
        { name: 'description', content: 'All about my forum' }
    ]
})
    const isLoading = ref(true)
    const topics = ref([])

    myFetch(`/category/${useRoute().params.name}`)
    .then(data => topics.value = data)
    .catch(err => console.log(err))
    .finally(() => isLoading.value = false)

    const sortASC = (event) => {
        
        let ev = event.target
        ev.parentElement.parentElement.querySelector('.bg-primary').classList.remove('bg-primary')
        ev.classList.add('bg-primary')

        myFetch(`/category/${useRoute().params.name}/sort?sort=${ev.getAttribute('data-target')}`)
        .then(data => topics.value = data)
        .catch(err => console.log(err))

    }

    
</script>
<template>
   <div class="container w-full mx-auto mt-14">
    <div class="w-full md:grid md:grid-cols-8 h-screen">
        <div class="hidden md:block col-span-2 relative">
            <SideBarDesktopCategory :categories="categories" />
        </div>
        <div class="col-span-7 md:col-span-6">

            <Loader :isLoading="isLoading" />

            <div class="w-full md:px-6 px-2 mx-auto h-auto">
                <div class="h-60 relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl bg-[url(/img/curved0.jpg)]">
                    <span class="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
                </div>
                <div class="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
                <div class="flex flex-wrap -mx-3">
                    <div class="flex-none w-auto max-w-full px-3">
                    <div class="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                        <img src="/img/bruce-mars.jpg" alt="profile_image" class="w-full object-cover h-14 shadow-soft-sm rounded-xl" />
                    </div>
                    </div>
                    <div class="flex-none w-auto max-w-full px-3 my-auto">
                    <div class="h-full">
                        <h5 class="mb-1">Ozor Clinton</h5>
                        <p class="mb-0 font-semibold leading-normal text-sm">Moderator</p>
                    </div>
                    </div>
                    <div class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
                    <div class="relative right-0">
                        <ul class="profile-tab relative flex flex-wrap p-1 list-none bg-transparent rounded-xl" nav-pills role="tablist">
                            <li class="flex-auto text-center">
                                <a @click.prevent="sortASC" data-target="desc" class="block dark:text-white bg-primary w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit" href="javascript:;" role="tab" aria-selected="true">follow</a>
                            </li>
                            <li class=" flex-auto text-center">
                                <a  @click.prevent="sortASC" data-target="desc" class=" block dark:text-white w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit" href="javascript:;" role="tab" aria-selected="false">Latest</a>
                            </li>
                            <li  class="flex-auto text-center">
                                <a @click.prevent="sortASC" data-target="asc" class=" block dark:text-white w-full px-0 py-1 mb-0 transition-colors border-0 rounded-lg ease-soft-in-out bg-inherit" href="javascript:;" role="tab" aria-selected="false">Oldest</a>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div v-for="topic in topics" :key="topic.id" class="dark-card iterator w-full mx-auto dark:text-white rounded-xl shadow-2xl overflow-hidden my-5">
                <div class="md:flex">
                    <div class="md:shrink-0">
                        <img class="h-56 w-full object-cover md:h-full md:w-48" :src="utils.topicImage(topic.image)" alt="Modern building architecture">
                    </div>
                    <div class="w-full pt-2 text-sm md:text-base">
                        <div class="w-[85%] inline-block align-top px-4 py-1">
                            <div class="text-xs font-bold"><NuxtLink :to="`/user/${topic.username}/${topic.user_id}`" class=" no-underline">{{ topic.username }}</NuxtLink> <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span></div>
                            <small><span>{{ topic.category_name }}.</span> &nbsp; <span>{{ utils.formatTime(topic.createdAt) }}</span> &nbsp; <span>{{ topic.views }} <i class="bi bi-eye"></i></span></small>
                            <NuxtLink :to="`/topic/${utils.topicSlug(topic.title)}/${topic.id}`" class="block mt-3 leading-tight font-medium hover:underline">{{ topic.title }}</NuxtLink>
                            <p class="mt-2">{{ utils.topicContent(topic.post) }}</p>
                        </div>

                        <div class="md:shrink-0 w-[14%] pl-2 inline-block align-top">
                            <img :src="utils.userImage(topic.user_image)" class="object-cover rounded-full h-9 w-9 ring-2 md:invisible ring-offset-1 ring-rose-500" alt="">
                            <div class="mt-5 h-44 w-full rounded-xl border-l md:border-none md:shadow-none">
                                <div class="text-center text-xs text-rose-500 "><i class="bi bi-heart text-2xl "></i> <span class="block">{{ topic.total_likes }}</span></div>
                                <div class="text-center text-xs text-rose-500 mt-3"><i class="bi bi-share text-2xl "></i> <span class="block">{{ topic.total_shares }}</span></div>
                                <div class="text-center text-xs text-rose-500 mt-3"><i class="bi bi-chat text-2xl "></i> <span class="block">{{ topic.comments }}</span></div>
                            
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>



        </div>
       
    </div>
   </div>
</template>