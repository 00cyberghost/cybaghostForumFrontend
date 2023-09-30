<script setup>
import {useAuthStore} from "~/stores/authStore"
defineProps({
    categories : Object,
    usersToFollow : Object
})
useHead({
  title: 'Cybaghost Forum',
  meta: [
    { name: 'description', content: 'All about my forum' },
    { property: 'og:title', content: 'cybaghost Forum' },
    { "http-equiv" : "Content-Type", content : 'text/html; charset=utf-8'}
  ]
})

const isLoading = ref(true)


const { utils } = useUtils();

const { home } = useHome();

const topics = utils.refs

myFetch('/topic')
.then((data) => {
    topics.value = data
    isLoading.value = false
})

</script>
<template>
   
   <div class="container w-full mx-auto mt-14">
    <div class="w-full md:grid md:grid-cols-8 h-screen">
        <div class="hidden md:block col-span-2 relative">
            <SideBarDesktopCategory :categories="categories" />
        </div>
        <div class="col-span-7 md:col-span-4 p-2">

            <Loader :isLoading="isLoading" />


            <div v-for="topic in topics" :key="topic.id" class="dark-card iterator w-full mx-auto dark:text-white rounded-xl shadow-2xl overflow-hidden my-5">
                <div class="md:flex" :card-topic-id="topic.id">
                    <div class="md:shrink-0">
                        <img class="h-56 w-full object-cover md:h-full md:w-48" :src="utils.topicImage(topic.image)" alt="Modern building architecture">
                    </div>
                    <div class="w-full pt-2 text-sm">
                        <div class="w-[85%] inline-block align-top px-4 py-1">
                            <div class="text-xs font-bold"><NuxtLink :to="`/user/${topic.username}/${topic.user_id}`" class=" no-underline">{{ topic.username }}</NuxtLink> <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span></div>
                            <small><span> <NuxtLink :to="`/category/${encodeURIComponent(topic.category_name)}`" class=" no-underline">{{ topic.category_name }}</NuxtLink>.</span> &nbsp; <span>{{ utils.formatTime(topic.createdAt) }}</span> &nbsp; <span>{{ topic.views }} <i class="bi bi-eye"></i></span></small>
                            <NuxtLink :to="`/topic/${utils.topicSlug(topic.title)}/${topic.id}`" class="block mt-3 text-base leading-tight font-semibold hover:underline">{{ topic.title.slice(0,180) }}</NuxtLink>
                            <p class="mt-2 font-jost overflow-hidden" v-html="utils.topicContent(topic.post)"></p>
                        </div>

                        <div class="md:shrink-0 w-[14%] pl-2 inline-block align-top">
                            <NuxtLink :to="`/user/${topic.username}/${topic.user_id}`" class="no-underline"><img :src="utils.userImage(topic.user_image)" class="object-cover rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt=""></NuxtLink>
                            <div class="mt-5 h-44 w-full rounded-xl border-l md:border-none md:shadow-none">
                                <div v-if="((useAuthStore().user != null) && (useAuthStore().user.id == topic.like_user_id))" class="text-center text-xs text-rose-500 "><i @click="home.toggleLikeTopic" :topic-id="topic.id" :liked-user-id="topic.user_id" class="bi bi-heart-fill text-2xl "></i> <span class="block" id="topic-like">{{ topic.total_likes }}</span></div>
                                <div v-else class="text-center text-xs text-rose-500 "><i @click="home.toggleLikeTopic" :topic-id="topic.id" :liked-user-id="topic.user_id" class="bi bi-heart text-xl "></i> <span class="block" id="topic-like">{{ topic.total_likes }}</span></div>
                                <div v-if="((useAuthStore().user != null) && (useAuthStore().user.id == topic.share_user_id))" class="text-center text-xs text-rose-500 "><i @click="home.toggleShareTopic" :topic-id="topic.id" :shared-user-id="topic.user_id" class="bi bi-share-fill text-xl "></i> <span class="block" id="topic-share">{{ topic.total_shares }}</span></div>
                                <div v-else class="text-center text-xs text-rose-500 "><i @click="home.toggleShareTopic" :topic-id="topic.id" :shared-user-id="topic.user_id" class="bi bi-share text-xl "></i> <span class="block" id="topic-share">{{ topic.total_shares }}</span></div>
                                <div class="text-center text-xs text-rose-500 mt-3"><NuxtLink :to="`/topic/details/${topic.id}`" class="no-underline"><i class="bi bi-chat text-xl"></i> <span class="block" id="topic-comment">{{ topic.comments }}</span></NuxtLink></div>
                            
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>


        </div>
        <div class="hidden md:block relative col-span-2">
    
            <SideBarDesktopRightBar :users="usersToFollow" />
            
        </div>
    </div>
   </div>
   

  
</template>







