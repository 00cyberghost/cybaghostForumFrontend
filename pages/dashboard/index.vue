<script setup>
    // import { useMyStore } from "~/stores/myStore"
    definePageMeta({
        middleware: ["auth"]
    })
    useHead({
        title: 'My Dashboard - Cybaghost Forum',
        meta: [
            { name: 'description', content: 'All about my forum' }
        ]
    })
    const { utils } = useUtils();

    const stats = ref([])
    const isLoading = ref(true)

    myFetch('/user/my-dashboard')
    .then(data => stats.value = data)
    .finally(() => isLoading.value = false)

    onMounted(() => {

        setTimeout(() => {
            if(Notification.permission == 'default') Notification.requestPermission()

        },5000)
    })


    
</script>
<template>
   
   <div class="container w-full mx-auto mt-14">
    <div class="w-full md:grid md:grid-cols-8 h-screen">
        <div class="hidden md:block col-span-2 relative">
            <DashboardSidebar />
        </div>
        <div class="col-span-7 md:col-span-6">
            <Loader :isLoading="isLoading" />
            <div class="flex flex-wrap gap-3">
                <!-- card1 -->
                <div v-for="stat in stats.topics" :key="stat" class="w-full shadow-2xl max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                    <div class="relative flex flex-col min-w-0 break-words dark-card dark:text-white shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="flex-auto p-4">
                        <div class="flex flex-row -mx-3">
                        <div class="flex-none w-2/3 max-w-full px-3">
                            <div>
                            <p class="mb-0 font-sans font-semibold leading-normal text-sm">Topics</p>
                            <h5 class="mb-0 font-bold">
                                {{ stat.topic }}
                            </h5>
                            </div>
                        </div>
                        <div class="px-3 text-right basis-1/3">
                            <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-rose-500 to-fuchsia-500">
                                <ClientOnly><font-awesome-icon class="text-white" icon="fa-message" /></ClientOnly>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- card1 -->
                <div v-for="stat in stats.posts" :key="stat" class="w-full shadow-2xl max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                    <div class="relative flex flex-col min-w-0 break-words dark-card dark:text-white shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="flex-auto p-4">
                        <div class="flex flex-row -mx-3">
                        <div class="flex-none w-2/3 max-w-full px-3">
                            <div>
                            <p class="mb-0 font-sans font-semibold leading-normal text-sm">posts</p>
                            <h5 class="mb-0 font-bold">
                                {{ stat.post }}
                            </h5>
                            </div>
                        </div>
                        <div class="px-3 text-right basis-1/3">
                            <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-rose-500 to-fuchsia-500">
                                <ClientOnly><font-awesome-icon class="text-white" icon="fa-message" /></ClientOnly>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- card1 -->
                <div v-for="stat in stats.likes" :key="stat" class="w-full shadow-2xl max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                    <div class="relative flex flex-col min-w-0 break-words dark-card dark:text-white shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="flex-auto p-4">
                        <div class="flex flex-row -mx-3">
                        <div class="flex-none w-2/3 max-w-full px-3">
                            <div>
                            <p class="mb-0 font-sans font-semibold leading-normal text-sm">Likes</p>
                            <h5 class="mb-0 font-bold">
                                {{ stat.likes }}
                            </h5>
                            </div>
                        </div>
                        <div class="px-3 text-right basis-1/3">
                            <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-rose-500 to-fuchsia-500">
                                <ClientOnly><font-awesome-icon class="text-white" icon="fa-heart" /></ClientOnly>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- card1 -->
                <div v-for="stat in stats.followers" :key="stat" class="w-full shadow-2xl max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                    <div class="relative flex flex-col min-w-0 break-words dark-card dark:text-white shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="flex-auto p-4">
                        <div class="flex flex-row -mx-3">
                        <div class="flex-none w-2/3 max-w-full px-3">
                            <div>
                            <p class="mb-0 font-sans font-semibold leading-normal text-sm">Followers</p>
                            <h5 class="mb-0 font-bold">
                                {{ stat.followers }}
                            </h5>
                            </div>
                        </div>
                        <div class="px-3 text-right basis-1/3">
                            <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-rose-500 to-fuchsia-500">
                                <ClientOnly><font-awesome-icon class="text-white" icon="fa-users" /></ClientOnly>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- card1 -->
                <div v-for="stat in stats.following" :key="stat" class="w-full shadow-2xl max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                    <div class="relative flex flex-col min-w-0 break-words dark-card dark:text-white shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="flex-auto p-4">
                        <div class="flex flex-row -mx-3">
                        <div class="flex-none w-2/3 max-w-full px-3">
                            <div>
                            <p class="mb-0 font-sans font-semibold leading-normal text-sm">Following</p>
                            <h5 class="mb-0 font-bold">
                                {{ stat.following }}
                            </h5>
                            </div>
                        </div>
                        <div class="px-3 text-right basis-1/3">
                            <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-rose-500 to-fuchsia-500">
                                <ClientOnly><font-awesome-icon class="text-white" icon="fa-user" /></ClientOnly>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <!-- card1 -->
                <div v-for="stat in stats.shares" :key="stat" class="w-full mb-16 shadow-2xl max-w-full px-3 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                    <div class="relative flex flex-col min-w-0 break-words dark-card dark:text-white shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="flex-auto p-4">
                        <div class="flex flex-row -mx-3">
                        <div class="flex-none w-2/3 max-w-full px-3">
                            <div>
                            <p class="mb-0 font-sans font-semibold leading-normal text-sm">Shares</p>
                            <h5 class="mb-0 font-bold">
                                {{ stat.shares }}
                            </h5>
                            </div>
                        </div>
                        <div class="px-3 text-right basis-1/3">
                            <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-rose-500 to-fuchsia-500">
                                <ClientOnly><font-awesome-icon class="text-white" icon="fa-user" /></ClientOnly>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>


            </div>

        </div>
       
    </div>
   </div>
   <MobileNavigation />
</template>