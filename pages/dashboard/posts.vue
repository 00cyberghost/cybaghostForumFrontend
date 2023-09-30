<script setup>
    import { useAuthStore } from '~/stores/authStore';

    definePageMeta({
        middleware: ["auth"]
    })

    useHead({
        title: 'My posts - Cybaghost Forum',
        meta: [
            { name: 'description', content: 'All about my forum' }
        ]
    })

    const { utils } = useUtils();

    const posts = ref([])
    const isLoading = ref(true)

    myFetch('/user/my-posts')
    .then(data => posts.value = data)
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
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div v-for="post in posts" :key="post" class="dark-card iterator col-span-1 w-[90%] mx-auto dark:text-white rounded-xl shadow-2xl overflow-hidden my-5">
                    <div class="md:flex">
                        <div class="w-full pt-2">
                            <div class="w-[85%] inline-block align-top px-4 py-1">
                                <div class="text-xs font-bold">{{ useAuthStore().user.username }} <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span></div>
                                <small><span><NuxtLink :to="`/category/${encodeURIComponent(post.category_name)}`" class=" no-underline">{{ post.category_name }}</NuxtLink>.</span> &nbsp; <span>{{ utils.formatTime(post.createdAt) }}</span></small>
                                <NuxtLink :to="`/post/details/${post.id}`" class="block mt-3 leading-tight font-medium hover:underline">view</NuxtLink>
                                <p class="mt-2">{{ utils.topicContentCard(post.post_content) }}</p>
                            </div>

                            <div class="md:shrink-0 w-[14%] pl-2 inline-block align-top">
                                <img :src="utils.userImage(useAuthStore().user.image)" class="object-cover md:invisible rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt="">
                                <div class="mt-2 mb-1 h-44 w-full rounded-xl border-l md:border-none md:shadow-none">
                                    <div class="text-center text-xs text-rose-500 "><i class="bi bi-heart text-xl "></i> <span class="block">{{ post.total_likes }}</span></div>
                                    <div class="text-center text-xs text-rose-500 mt-3"><i class="bi bi-share text-xl "></i> <span class="block">{{ post.total_shares }}</span></div>
                                    <div class="text-center text-xs text-rose-500 mt-3"><i class="bi bi-chat text-xl "></i> <span class="block">{{ post.comments }}</span></div>
                                
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>



        </div>
       
    </div>
   </div>
</template>