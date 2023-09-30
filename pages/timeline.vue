<script setup>
definePageMeta({
    middleware: ["auth"]
})
useHead({
    title: 'Timeline - Cybaghost Forum',
    meta: [
        { name: 'description', content: 'All about my forum' }
    ]
})
    const { utils } = useUtils();

    const timelines = ref([])

    const isLoading = ref(true)

    myFetch('/follow/timeline')
    .then(data => timelines.value = data)
    .finally(() => isLoading.value = false)

    


</script>
<template>
  
   <div class="container w-full mx-auto mt-14">
    <div class="w-full md:grid md:grid-cols-8 h-screen">
        <div class="hidden md:block col-span-2 relative">

            <div class="dark:text-white h-screen left-scrollbar fixed overflow-y-auto w-[23%]">
                <ul class="hidden gap-y-4 relative bg-white p-5 border-fuchsia-500 shadow-2xl rounded-2xl mt-7">
                    <!-- <li @click="toggleNotification" data-type="all" class="cursor-pointer underline">All Notifications</li>
                    <li @click="toggleNotification" data-type="mention" class="cursor-pointer">Mention Notifications</li>
                    <li @click="toggleNotification" data-type="like" class="cursor-pointer">Like Notifications</li>
                    <li @click="toggleNotification" data-type="share" class="cursor-pointer">Share Notifications</li> -->
                </ul>
            </div>
            

        </div>
        <div class="col-span-7 md:col-span-4 p-2">
            <Loader :isLoading="isLoading" />
            <div v-for="timeline in timelines" :key="timeline" class="text-sm md:text-base iterator">
                <div v-if="timeline.post_content" class="dark-card md:py-2 md:px-8 w-full flex flex-row rounded-xl bg-white px-2 dark:text-white py-4 gap-1 space-y-2 mt-2">
                    <div class="min18">
                        <img class="h-12 w-12 md:h-20 md:w-20 object-cover rounded-full" :src="utils.userImage(timeline.image)" :alt="timeline.username" />
                        <!-- <span class="px-3 py-3 rounded-full bg-primary dark:text-white text-white uppercase">{{ timeline.username.substring(0,2) }}</span> -->
                    </div>
                    <div class="space-y-2">
                        <div><NuxtLink :to="`/user/${timeline.username}/${timeline.id}`" class="text-xs font-bold no-underline">{{ timeline.username }}</NuxtLink> &nbsp;  <span class="text-xs">{{ utils.formatTime(timeline.post_time) }}</span></div>
                        <RouterLink :to="`/post/detail/${timeline.post_id}`"><p class="text-sm md:text-base" v-html="utils.decodeHtml(timeline.post_content)"></p></RouterLink>
                    </div>
                </div>

                <div v-if="timeline.reply_content" class="dark-card md:py-2 md:px-8 w-full flex flex-row rounded-xl bg-white px-2 dark:text-white py-4 gap-1 space-y-2 mt-2">
                    <div class="min18">
                        <img class="h-12 w-12 md:h-20 md:w-20 object-cover rounded-full" :src="utils.userImage(timeline.image)" :alt="timeline.username" />
                        <!-- <span class="px-3 py-3 rounded-full bg-primary dark:text-white text-white uppercase">{{ timeline.username.substring(0,2) }}</span> -->
                    </div>
                    <div class="space-y-2">
                        <div><NuxtLink :to="`/user/${timeline.username}/${timeline.id}`" class="text-xs font-bold no-underline">{{ timeline.username }}</NuxtLink> &nbsp;  <span class="text-xs">{{ utils.formatTime(timeline.reply_time) }}</span></div>
                        <RouterLink :to="`/post/detail/${timeline.reply_id}`"><p class="text-sm md:text-base" v-html="utils.decodeHtml(timeline.reply_content)"></p></RouterLink>
                    </div>
                </div>

                <div v-if="timeline.title" class="dark-card md:py-2 md:px-8 w-full flex flex-row rounded-xl bg-white px-2 dark:text-white py-4 gap-1 space-y-2 mt-2">
                    <div class="min18">
                        <img class="h-12 w-12 md:h-20 md:w-20 object-cover rounded-full" :src="utils.userImage(timeline.image)" :alt="timeline.username" />
                        <!-- <span class="px-3 py-3 rounded-full bg-primary dark:text-white text-white uppercase">{{ timeline.username.substring(0,2) }}</span> -->
                    </div>
                    <div class="space-y-2">
                        <div><NuxtLink :to="`/user/${timeline.username}/${timeline.id}`" class="text-xs font-bold no-underline">{{ timeline.username }}</NuxtLink> &nbsp;  <span class="text-xs">{{ utils.formatTime(timeline.topic_time) }}</span></div>
                        <RouterLink :to="`/topic/${utils.topicSlug(timeline.title)}/${timeline.topic_id}`"><p class="text-sm md:text-base" v-html="timeline.title"></p></RouterLink>
                    </div>
                </div>


            </div>

        </div>
        <div class="hidden md:block relative col-span-2">
    
            <SideBarDesktopRightBar />
            
        </div>
    </div>
   </div>
 
</template>
<style scoped>
.min18{
    min-width: 18%;
}
</style>







