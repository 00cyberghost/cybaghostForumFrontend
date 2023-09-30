<script setup>
  import { useAuthStore } from "~/stores/authStore";
  const { utils } = useUtils();

  let auth = useAuthStore()

  defineProps({
    categories : Object
  })

  const users = ref([])
  const isLoading = ref(true)

  myFetch(`/user/profile?id=${useRoute().params.id}`)
  .then(data => {
    users.value = data
  })
  .finally(() => isLoading.value = false)

  const toggleFollowUser = (event) => {

    if(auth.user == null) {

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
        .catch((error) => {
          utils.notifyFailure('error',error.data.message)
        })

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
        .catch((error) => {
          utils.notifyFailure('error',error.data.message)
        })
    }
  }
</script>
<template>
   
   <div class="container w-full mx-auto mt-14">
    <div class="w-full md:grid md:grid-cols-8 h-screen" v-for="user in users.user" :key="user">
        <div class="hidden md:block col-span-2 relative">
            <SideBarDesktopCategory :categories="categories" />
        </div>
        <div class="col-span-7 md:col-span-6">

          <Loader :isLoading="isLoading" />

        <div class="w-full md:px-6 px-2 mx-auto h-auto">
            <div :class="`h-60 relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl bg-[url(/img/curved0.jpg)]`">
                <span class="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
            </div>
            <div class="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
            <div class="flex flex-wrap -mx-3 dark:text-white text-sm md:text-base">
                <div class="flex-none w-auto max-w-full px-3">
                <div class="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                    <img :src="utils.userImage(user.image)" alt="profile_image" class="w-14 object-cover h-14 shadow-soft-sm rounded-xl" />
                </div>
                </div>
                <div class="flex-none w-auto max-w-full px-3 my-auto">
                <div class="h-full">
                    <h5 class="mb-1">{{ user.username }}</h5>
                    <p class="mb-0 font-semibold leading-normal text-sm">{{ user.email }}</p>
                </div>
                </div>
                <div class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
                <div class="relative right-0">
                    <ul class="profile-tab relative flex flex-wrap p-1 list-none bg-transparent rounded-xl" nav-pills role="tablist">
                        <li class="flex-auto text-center">
                            <span @click="utils.profileTab" target="topic" class="block cursor-pointer bg-primary w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit" role="tab" aria-selected="true">Topics</span>
                        </li>
                        <li class=" flex-auto text-center">
                            <span @click="utils.profileTab" target="post" class="block cursor-pointer w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit" role="tab" aria-selected="false">Posts</span>
                        </li>
                        <li  class="flex-auto text-center">
                            <span @click="utils.profileTab" target="reply" class="block cursor-pointer w-full px-0 py-1 mb-0 transition-colors border-0 rounded-lg ease-soft-in-out bg-inherit" role="tab" aria-selected="false">Replies</span>
                        </li>
                    </ul>
                </div>
                
                </div>
            </div>
            </div>
        </div>

        <div class="flex-none t-tabs w-full max-w-full px-1 md:px-3 mt-6" id="topic">
          <div class="relative flex flex-col min-w-0 mb-6 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
            <div class="p-4 pb-0 mb-0 rounded-t-2xl">
              <h6 class="mb-1 dark:text-white">Topics</h6>
            </div>
            <div class="flex-row px-1 md:p-4 overflow-x-auto">
              <div class="flex flex-nowrap overflow-x-auto">
                

                <div v-for="topic in users.topics" :key="topic.id" class="dark-card w-[98%] md:w-2/5 dark:text-white rounded-xl shadow-2xl my-3 flex-none mx-1">
                  <div class="md:flex">
                    
                      <div class="w-full pt-2 text-sm md:text-base">
                        <div class="w-[85%] inline-block align-top px-4 py-1">
                          <div class="text-xs font-bold">{{ user.username }} <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span></div>
                          <small><span><NuxtLink :to="`/category/${topic.category_name}`" class=" no-underline">{{ topic.category_name }}</NuxtLink>.</span> &nbsp; <span>{{ utils.formatTime(topic.createdAt) }}</span></small>
                          <NuxtLink :to="`/topic/${utils.topicSlug(topic.title)}/${topic.id}`" class="block mt-3 leading-tight font-medium hover:underline">{{ topic.title }}</NuxtLink>
                          <p class="mt-2 font-jost">{{ utils.topicContentCard(topic.post) }}</p>
                        </div>

                          <div class="md:shrink-0 w-[14%] pl-2 inline-block align-top">
                            <img :src="utils.userImage(user.image)" class="object-cover rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt="">
                            <div class="mt-2 h-44 w-full rounded-xl border mb-1">
                                <div class="text-center text-xs text-rose-500 "><i class="bi bi-heart text-xl"></i> <span class="block">{{ topic.total_likes }}</span></div>
                                <div class="text-center text-xs text-rose-500 mt-3"><i class="bi bi-share text-xl "></i> <span class="block">{{ topic.total_shares }}</span></div>
                                <div class="text-center text-xs text-rose-500 mt-3"><i class="bi bi-chat text-xl "></i> <span class="block">{{ topic.comments }}</span></div>
                            
                            </div>
                          </div>
                      </div>
                          
                  </div>
                </div>

                


              </div>
            </div>
          </div>
        </div>

        <div class="flex-none t-tabs hidden w-full max-w-full px-1 md:px-3 mt-6" id="post">
          <div class="relative flex flex-col min-w-0 mb-6 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
            <div class="p-4 pb-0 mb-0 rounded-t-2xl">
              <h6 class="mb-1 dark:text-white">Posts</h6>
            </div>
            <div class="flex-row px-1 md:p-4 overflow-x-auto">
              <div class="flex flex-nowrap overflow-x-auto">
                

                <div v-for="post in users.posts" :key="post.id" class="dark-card w-[98%] md:w-2/5 dark:text-white rounded-xl shadow-2xl my-3 flex-none mx-1">
                  <div class="md:flex">
    
                      <div class="w-full pt-2 text-sm md:text-base">
                        <div class="w-[85%] inline-block align-top px-4 py-1">
                          <div class="text-xs font-bold">{{ user.username }} <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span></div>
                          <small><span><NuxtLink :to="`/category/${post.category_name}`" class=" no-underline">{{ post.category_name }}</NuxtLink>.</span> &nbsp; <span>{{ utils.formatTime(post.createdAt) }}</span></small>
                          <NuxtLink :to="`/post/details/${post.id}`" class="block mt-3 leading-tight font-medium hover:underline">view</NuxtLink>
                          <p class="mt-2 font-jost">{{ utils.topicContentCard(post.post_content) }}</p>
                        </div>

                          <div class="md:shrink-0 w-[14%] pl-2 inline-block align-top">
                            <img :src="utils.userImage(user.image)" class="object-cover rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt="">
                            <div class="mt-2 h-44 w-full rounded-xl mb-1 border">
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

        <div class="flex-none t-tabs hidden w-full max-w-full px-1 md:px-3 mt-6" id="reply">
          <div class="relative flex flex-col min-w-0 mb-6 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
            <div class="p-4 pb-0 mb-0 rounded-t-2xl">
              <h6 class="mb-1 dark:text-white">Replies</h6>
            </div>
            <div class="flex-row px-1 md:p-4 overflow-x-auto">
              <div class="flex flex-nowrap overflow-x-auto">
                

                <div v-for="reply in users.replies" :key="reply.id" class="dark-card w-[98%] md:w-2/5 dark:text-white rounded-xl shadow-2xl my-3 flex-none mx-1">
                  <div class="md:flex">
                    
                      <div class="w-full pt-2 text-sm md:text-base">
                        <div class="w-[85%] inline-block align-top px-4 py-1">
                          <div class="text-xs font-bold">{{ user.username }} <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span></div>
                          <small><span></span> &nbsp; <span>{{ utils.formatTime(reply.createdAt) }}</span></small>
                          <NuxtLink :to="`/topic/details/${reply.id}`" class="block mt-3 leading-tight font-medium hover:underline">{{  }}</NuxtLink>
                          <p class="mt-2 font-jost">{{ utils.topicContentCard(reply.reply_content) }}</p>
                        </div>

                          <div class="md:shrink-0 w-[14%] pl-2 inline-block align-top">
                            <img :src="utils.userImage(user.image)" class="object-cover rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt="">
                            <div class="mt-2 mb-1 h-44 w-full rounded-xl border">
                              <div class="text-center text-xs text-rose-500 "><i class="bi bi-heart text-xl "></i> <span class="block">{{ reply.total_likes }}</span></div>
                                <div class="text-center text-xs text-rose-500 mt-3"><i class="bi bi-share text-xl "></i> <span class="block">{{ reply.total_shares }}</span></div>
                              
                            
                            </div>
                          </div>
                      </div>
                          
                  </div>
                </div>

                


              </div>
            </div>
          </div>
        </div>

        <div v-if="auth.user != null" class="w-[50%] mx-auto">
          <button v-if="users.isFollowing == false"  @click="toggleFollowUser" :user-id="user.id" :follower-user-id="user.follower" :name="user.username" class="mb-3 px-4 py-1 w-full text-primary text-sm font-semibold rounded-full border border-rose-500 hover:text-rose-600 hover:bg-rose-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2">Follow</button>
          <button v-else  @click="toggleFollowUser" :user-id="user.id" :follower-user-id="user.follower" :name="user.username" class="mb-3 px-4 py-1 w-full text-white bg-primary text-sm font-semibold rounded-full border border-rose-500 hover:text-rose-600 hover:bg-rose-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2">unFollow</button>
        </div>

        <div class="dark-card w-full max-w-full px-3 shadow-2xl mx-auto mb-5">
          <div class="relative flex flex-col h-full min-w-0 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
            <div class="p-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
              <div class="flex flex-wrap -mx-3">
                <div class="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                  <h6 class="mb-0">Profile Information</h6>
                </div>
                <div class="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none">
                  <a href="javascript:;" data-target="tooltip_trigger" data-placement="top">
                    <i class="leading-normal fas fa-user-edit text-sm text-slate-400"></i>
                  </a>
                  <div data-target="tooltip" class="hidden px-2 py-1 text-center text-white bg-black rounded-lg text-sm" role="tooltip">
                    Edit Profile
                    <div class="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-auto p-4 iterator">
              <p class="leading-normal text-sm">{{ user.about }}</p>
              <hr class="h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent" />
              <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                <li class="relative block px-4 py-2 pt-0 pl-0 leading-normal border-0 rounded-t-lg text-sm text-inherit" v-if="user.name"><strong class="">Full Name:</strong> &nbsp; {{ user.name }}</li>
                <li class="relative block px-4 py-2 pl-0 leading-normal border-0 border-t-0 text-sm text-inherit" v-if="user.email"><strong class="">Email:</strong> &nbsp; {{ user.email }}</li>
                <li class="relative block px-4 py-2 pl-0 leading-normal border-0 border-t-0 text-sm text-inherit" v-if="location"><strong class="">Location:</strong> &nbsp; {{ user.location }}</li>
                <li class="relative block px-4 py-2 pb-0 pl-0 border-0 border-t-0 rounded-b-lg text-inherit">
                  <strong class="leading-normal text-sm ">Social:</strong> &nbsp;
                  <a class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center text-blue-800 align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none" target="_blank" v-if="user.facebook" :href="user.facebook">
                    <i class="bi bi-facebook fa-lg"></i>
                  </a>
                  <a class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none text-sky-600" target="_blank" v-if="user.twitter" :href="user.twitter">
                    <i class="bi bi-twitter fa-lg"></i>
                  </a>
                  <a class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none text-sky-900" target="_blank" v-if="user.instagram" :href="user.instagram">
                    <i class="bi bi-instagram fa-lg"></i>
                  </a>
                  <a class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none text-sky-900" target="_blank" v-if="user.tiktok" :href="user.tiktok">
                    <i class="bi bi-tiktok fa-lg"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        

      </div>
       
    </div>
   </div>

</template>