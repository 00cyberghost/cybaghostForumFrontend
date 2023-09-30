<script setup>
    import { useAuthStore } from '~/stores/authStore';

    definePageMeta({
        middleware: ["auth"]
    })

    useHead({
        title: 'My topics - Cybaghost Forum',
        meta: [
            { name: 'description', content: 'All about my forum' }
        ]
    })

    const { utils } = useUtils();

    const topics = ref([])
    const isLoading = ref(true)

    myFetch('/user/my-topics')
    .then(data => topics.value = data)
    .finally(() => isLoading.value = false)
</script>
<template>
   
   <div class="container w-full mx-auto mt-14">
    <div class="w-full md:grid md:grid-cols-8 h-screen">
        <div class="hidden md:block col-span-2 relative">
            <DashboardSidebar />
        </div>
        <div class="col-span-7 md:col-span-6 text-sm md:text-base">
            <Loader :isLoading="isLoading" />
            <div v-for="topic in topics" :key="topic.id" class="dark-card iterator w-full mx-auto dark:text-white rounded-xl shadow-2xl overflow-hidden my-5">
                <div class="md:flex">
                    <div class="md:shrink-0">
                        <img class="h-56 w-full object-cover md:h-full md:w-48" :src="utils.topicImage(topic.image)" alt="Modern building architecture">
                    </div>
                    <div class="w-full pt-2">
                        <div class="w-[85%] inline-block align-top px-4 py-1">
                            <div class="text-xs font-bold">{{ useAuthStore().user.username }} <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span></div>
                            <small><span><NuxtLink :to="`/category/${encodeURIComponent(topic.category_name)}`" class=" no-underline">{{ topic.category_name }}</NuxtLink>.</span> &nbsp; <span>{{ utils.formatTime(topic.createdAt) }}</span> &nbsp; <span>{{ topic.views }} <i class="bi bi-eye"></i></span></small>
                            <NuxtLink :to="`/topic/${utils.topicSlug(topic.title)}/${topic.id}`" class="block mt-3 text-lg leading-tight font-medium hover:underline">{{ topic.title }}</NuxtLink>
                            <p class="mt-2">{{ utils.topicContent(topic.post) }}</p>
                        </div>

                        <div class="md:shrink-0 w-[14%] pl-2 inline-block align-top">
                            <img :src="utils.userImage(useAuthStore().user.image)" class="object-cover md:invisible rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt="">
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