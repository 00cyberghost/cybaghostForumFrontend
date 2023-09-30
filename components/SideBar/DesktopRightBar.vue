<script setup>
import { useAuthStore } from '~/stores/authStore';

defineProps({
    users : Object
})

const {utils} = useUtils()


//remove people to follow card if the user is same as the logged in user
const removeUser = () => {

    if(useAuthStore().user == null) return

    let id = useAuthStore().user.id

    let arr = document.querySelectorAll('.to-follow')

    arr.forEach(Element => {
        
        Element.getAttribute('user_id') == id ? Element.parentElement.remove() : ''
    })
}

//set user image to sample image if the user image is null
const userImage = () => {

    if(useAuthStore().user == null) return

    let images = document.querySelectorAll('.user-image')

    images.forEach(Element => {

        Element.getAttribute('src') == null ? Element.setAttribute('src',useAuthStore().image_url + '/user_sample.jpg') : '' 
        
        if(useAuthStore().user != null){

            Element.getAttribute('follower_user_id') == useAuthStore().user.id ? Element.textContent = 'unFollow' : '' 
        }
    })
}

//
const isFollowing = () => {

    

if(useAuthStore().user != null){

    const id = useAuthStore().user.id

    const follow = document.querySelectorAll('[follower-user-id]')

    follow.forEach(Element => {

        if(Element.getAttribute('follower-user-id') == id){

            Element.textContent = 'unFollow'
            Element.classList.add('bg-primary')
            Element.classList.add('text-white')
            Element.classList.remove('text-primary')
        
        }else{

            Element.textContent = 'Follow'
            Element.classList.remove('text-white')
            Element.classList.remove('bg-primary')
            Element.classList.add('text-primary')
        }
        
    })
}
}

const toggleFollowUser = (event) => {

    if(useAuthStore().user == null) {

        utils.notifyFailure('ERROR','Please login to follow')

        return
    }

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
        .catch((err) => console.log(err))

    }else{

        myFetch(`/follow`,{
            method: 'post',
            body: {'user_id' : tex.getAttribute('user-id')}
        })
        .then(data => {
            utils.notifySuccess('SUCCESS!',`You are now following ${tex.getAttribute('name')}`)
            tex.textContent = 'unFollow'
            tex.classList.add('bg-primary')
            tex.classList.add('text-white')
            tex.classList.remove('text-primary')
            //utils.fetchPage('/topic')
        })
        .catch((err) => console.log(err))
    }

}

onMounted(() => {
    
    // removeUser()
    // userImage()
    // isFollowing()

    
})



</script>

<template>

    <div class="fixed h-screen overflow-y-auto w-[23%] px-4">
        
        <div v-for="user in users" :key="user.id" class="dark-card py-1 px-3 w-full mt-2 rounded-xl shadow-lg space-y-1 sm:py-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-3">
        
            <div class="text-center space-y-2 sm:text-left items-center to-follow" :user_id="user.id">
                <div class="space-y-0.5">
                <p class="text-md text-black font-semibold">
                    <NuxtLink :to="`/user/${user.username}/${user.id}`" class="dark:text-white text-sm no-underline">{{ user.username }}</NuxtLink>
                </p>
                <div class="flex justify-between">
                    <div class="border px-2 py-1 text-xs">
                        <ClientOnly><font-awesome-icon class="" icon="fa-comment" /></ClientOnly> {{ user.posts + user.replies }}
                    </div>
                    <div class="border px-2 py-1 text-xs">
                    <ClientOnly> <font-awesome-icon class="" icon="fa-heart" /></ClientOnly> {{ user.likes }}
                    </div>
                    <div class="border px-2 py-1 text-xs">
                        <ClientOnly><font-awesome-icon class="" icon="fa-user-plus" /></ClientOnly> {{ user.followers }}
                    </div>
                </div>
                </div>
                <button  @click="toggleFollowUser" :user-id="user.id" :follower-user-id="user.follower" :name="user.username" class="px-4 py-1 text-primary text-sm font-semibold rounded-full border border-rose-500 hover:text-rose-600 hover:bg-rose-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2">Follow</button>
            </div>
            <NuxtLink :to="`/user/${user.username}/${user.id}`" class=" no-underline"><img class="block mx-auto h-20 w-20 object-cover rounded-full sm:mx-0 sm:shrink-0 user-image" :src="utils.userImage2(user.image)" :alt="user.username" /></NuxtLink>
        </div>
       
    </div>

    
</template>