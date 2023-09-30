<script setup>
definePageMeta({
    middleware: ["auth"]
})
useHead({
    title: 'Notifications - Cybaghost Forum',
    meta: [
        { name: 'description', content: 'All about my notifications' }
    ]
})
    const { utils } = useUtils();

    const notifications = utils.refs

    const isLoading = ref(true)

    myFetch('/notification')
    .then(data => notifications.value = data)
    .finally(() => isLoading.value = false)

    const readNotification = async (event) => {

        const id = event.target.getAttribute('id')

        myFetch(`/notification/${id}`,{method : 'put'})
        .then(data => {

            let el = document.getElementById('notification-count')
            if(el != null){
                let c = parseInt(el.textContent)
                c > 0 ? el.textContent = c - 1 : el.classList.add('hidden')
            }
            
            let el2 = document.getElementById('notification-count-mobile')

            if(el2 != null){
                let d = parseInt(el2.textContent)
               d > 0 ? el2.textContent = d - 1 : el2.classList.add('hidden')
            }
            
        })
    }

    const toggleNotification = async (event) => {

        event.target.parentElement.querySelector('.underline').classList.remove('underline')
        event.target.classList.add('underline')



        utils.fetchPage(`/notification/${event.target.getAttribute('data-type')}`)
    }


</script>
<template>
   
   <div class="container w-full mx-auto mt-14">
    <div class="w-full md:grid md:grid-cols-8 h-screen">
        <div class="hidden md:block col-span-2 relative">

            <div class="dark:text-white h-screen left-scrollbar fixed overflow-y-auto w-[23%]">
                <ul class="dark-card flex flex-col gap-y-4 relative bg-white p-5 border-fuchsia-500 shadow-2xl rounded-2xl mt-7">
                    <li @click="toggleNotification" data-type="all" class="cursor-pointer underline">All Notifications</li>
                    <li @click="toggleNotification" data-type="mention" class="cursor-pointer">Mention Notifications</li>
                    <li @click="toggleNotification" data-type="like" class="cursor-pointer">Like Notifications</li>
                    <li @click="toggleNotification" data-type="share" class="cursor-pointer">Share Notifications</li>
                </ul>
            </div>
            

        </div>
        <div class="col-span-7 md:col-span-4 p-2">

            <Loader :isLoading="isLoading" />
            <div v-for="notification in notifications" :key="notification.id" class="shadow-inner iterator rounded-xl bg-slate-100 dark:bg-darkness-100">
                <div class="md:py-8 md:px-8 w-full flex flex-row rounded-xl px-2 dark:text-white py-4 gap-1 space-y-2 mt-2" :class="{'bg-white dark:bg-darkness-200 shadow-xl': notification.readAt == null}">
                    <div class="w-28 my-auto">
                        <!-- <img class="h-12 w-12 md:h-20 md:w-20 object-cover rounded-full" src="/aji.jpg" alt="Woman's Face" /> -->
                        <span class="px-3 py-3 rounded-full bg-primary dark:text-white text-white uppercase">{{ notification.data.substring(0,2) }}</span>
                    </div>
                    <div class="space-y-2">
                        <RouterLink :to="notification.url" :id="notification.id"><p @click="readNotification" :id="`${notification.id}`" class="text-sm md:text-base" v-html="utils.topicContentCard(notification.data)"></p></RouterLink>
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








