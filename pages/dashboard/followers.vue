<script setup>
import { useAuthStore } from '~/stores/authStore';
definePageMeta({
    middleware: ["auth"]
})
useHead({
    title: 'My followers - Cybaghost Forum',
    meta: [
        { name: 'description', content: 'All about my forum' }
    ]
})
const { utils } = useUtils();

const followers = ref([])
const isLoading = ref(true)

  myFetch('/user/my-followers')
  .then(data => {
    followers.value = data
  })
  .catch(err => console.log(err))
  .finally(() => isLoading.value = false)

    const toggleFollowUser = async (event) => {

        let tex = event.target

        if(tex.classList.contains('bg-primary')){

            myFetch(`/follow`,{
                method: 'delete',
                body: {'user_id' : tex.getAttribute('user-id')}
            })
            .then(data => {
                utils.notifySuccess('SUCCESS!',`you unfollowed ${tex.getAttribute('name')}`)
                tex.textContent = 'Follow'
                tex.classList.remove('bg-primary')
                tex.classList.remove('text-white')
                tex.classList.add('text-primary')
                //utils.fetchPage('/topic')
                
            })
            .catch((error) => utils.notifyFailure('Something Went Wrong', error.data.message))

        }else{

            myFetch(`/follow`,{
                method: 'post',
                body: {'user_id' : tex.getAttribute('user-id')}
            })
            .then(data => {
                utils.notifySuccess('SUCCESS!',`You are now following ${tex.getAttribute('name')}`)
                console.log(data)
                tex.textContent = 'unFollow'
                tex.classList.add('bg-primary')
                tex.classList.add('text-white')
                tex.classList.remove('text-primary')
                //utils.fetchPage('/topic')
            })
            .catch((error) => utils.notifyFailure('Something Went Wrong', error.data.message))
            
            // if(error){
            //     console.log(error.value)
            // }
        }
    }
</script>
<template>
  
   <div class="container w-full mx-auto mt-14">
    <div class="w-full md:grid md:grid-cols-8 h-screen">
        <div class="hidden md:block col-span-2 relative">
            <DashboardSidebar />
        </div>
        <div class="col-span-7 md:col-span-6">

            <div class="md:grid md:grid-cols-6 gap-4">
                <Loader :isLoading="isLoading" />
                <div v-for="follower in followers" :key="follower" class="col-span-2 dark-card iterator py-1 px-3 w-full mt-2 rounded-xl shadow-lg space-y-1 sm:py-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-3">
                    <NuxtLink :to="`/user/${follower.username}/${follower.user_id}`" class=" no-underline"><img class="block mx-auto h-20 w-20 object-cover rounded-full sm:mx-0 sm:shrink-0" :src="utils.userImage(follower.image)" alt="Woman's Face" /></NuxtLink>
                    <div class="text-center space-y-2 items-center">
                        <div class="space-y-0.5">
                        <p class="text-md text-black dark:text-white font-semibold">
                            <NuxtLink :to="`/user/${follower.username}/${follower.user_id}`" class=" no-underline">{{ follower.username }}</NuxtLink>
                        </p>
                        <div class="flex justify-center">
                            <div class="border px-2 py-1 text-xs">
                                <ClientOnly><font-awesome-icon class="" icon="fa-comment" /></ClientOnly> {{ follower.posts + follower.replies }}
                            </div>
                            <div class="border px-2 py-1 text-xs">
                            <ClientOnly> <font-awesome-icon class="" icon="fa-heart" /></ClientOnly> {{ follower.likes }}
                            </div>
                            <div class="border px-2 py-1 text-xs">
                                <ClientOnly><font-awesome-icon class="" icon="fa-user-plus" /></ClientOnly> {{ follower.followers }}
                            </div>
                        </div>
                        </div>
                        <!-- <button v-if="follower.following_id == useAuthStore().user.id" @click="toggleFollowUser" :user-id="follower.user_id" :follower-user-id="follower.follower" :name="follower.username" class="px-4 py-1 text-sm bg-primary text-white font-semibold rounded-full border border-rose-500 hover:text-rose-600 hover:bg-rose-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2">unFollow</button> -->
                        <button @click="toggleFollowUser" :user-id="follower.user_id" :follower-user-id="follower.follower" class="px-4 py-1 text-sm text-primary font-semibold rounded-full border border-rose-500 hover:text-rose-600 hover:bg-rose-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2">Follow</button>
                    </div>
                    
                </div>
                

                

            </div>

        </div>
       
    </div>
   </div>
</template>