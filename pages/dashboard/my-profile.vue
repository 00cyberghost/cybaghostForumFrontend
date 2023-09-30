<script setup>
  // import { useMyStore } from "~/stores/myStore"
  import { useAuthStore } from '~/stores/authStore';

  definePageMeta({
    middleware: ["auth"]
  })

  useHead({
      title: 'My profile - Cybaghost Forum',
      meta: [
          { name: 'description', content: 'All about my forum' }
      ]
  })


  const { utils } = useUtils();

  const users = ref([])
  const isLoading = ref(true)

  myFetch('/user/my-profile')
  .then(data => {
    users.value = data
  })
  .finally(() => isLoading.value = false)
</script>
<template>
   
   <div class="container w-full mx-auto mt-14">
    <Loader :isLoading="isLoading" />
    <div class="w-full md:grid md:grid-cols-8 h-screen" v-for="user in users.user" :key="user">
        <div class="hidden md:block col-span-2 relative">
            <DashboardSidebar />
        </div>
        <div class="col-span-7 md:col-span-6 text-sm md:text-base dark:text-white">

            

          <div class="w-full md:px-6 px-2 mx-auto h-auto">
              <div class="h-60 relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl bg-[url(/img/curved0.jpg)]">
                  <span class="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
              </div>
              <div class="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
              <div class="flex flex-wrap -mx-3">
                  <div class="flex-none w-auto max-w-full px-3">
                  <div class="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                      <img :src="utils.userImage(user.image)" alt="profile_image" class="w-full object-cover h-14 shadow-soft-sm rounded-xl" />
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
                  

                  <div v-for="topic in users.topics" :key="topic.id" class="dark-card w-[98%] md:w-3/5 dark:text-white rounded-xl shadow-2xl my-3 flex-none mx-1">
                    <div class="md:flex">
                      <div class="md:shrink-0">
                          <img class="h-56 w-full rounded-xl object-cover md:h-full md:w-48" :src="utils.topicImage(topic.image)" alt="Modern building architecture">
                      </div>
                        <div class="w-full pt-2">
                          <div class="w-[85%] inline-block align-top px-4 py-1">
                            <div class="text-xs font-bold">{{ user.username }} <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span></div>
                            <small><span><NuxtLink :to="`/category/${encodeURIComponent(topic.category_name)}`" class=" no-underline">{{ topic.category_name }}</NuxtLink>.</span> &nbsp; <span>{{ utils.formatTime(topic.createdAt) }}</span> &nbsp; <span>{{ topic.views }} <i class="bi bi-eye"></i></span></small>
                            <NuxtLink :to="`/topic/${utils.topicSlug(topic.title)}/${topic.id}`" class="block mt-3 leading-tight font-medium hover:underline">{{ topic.title }}</NuxtLink>
                            <p class="mt-2">{{ utils.topicContent(topic.post) }}</p>
                          </div>

                            <div class="md:shrink-0 w-[14%] pl-2 inline-block align-top">
                              <img :src="utils.userImage(user.image)" class="object-cover rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt="">
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
          </div>

          <div class="flex-none t-tabs hidden w-full max-w-full px-1 md:px-3 mt-6" id="post">
            <div class="relative flex flex-col min-w-0 mb-6 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
              <div class="p-4 pb-0 mb-0 rounded-t-2xl">
                <h6 class="mb-1 dark:text-white">Posts</h6>
              </div>
              <div class="flex-row px-1 md:p-4 overflow-x-auto">
                <div class="flex flex-nowrap overflow-x-auto">
                  

                  <div v-for="post in users.posts" :key="post.id" class="dark-card w-[98%] md:w-3/5 dark:text-white rounded-xl shadow-2xl my-3 flex-none mx-1">
                    <div class="md:flex">
                      <div class="md:shrink-0">
                          <img class="h-56 w-full rounded-xl object-cover md:h-full md:w-48" :src="utils.topicImage(post.image)" alt="Modern building architecture">
                      </div>
                        <div class="w-full pt-2">
                          <div class="w-[85%] inline-block align-top px-4 py-1">
                            <div class="text-xs font-bold">{{ user.username }} <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span></div>
                            <small><span><NuxtLink :to="`/category/${encodeURIComponent(post.category_name)}`" class=" no-underline">{{ post.category_name }}</NuxtLink>.</span> &nbsp; <span>{{ utils.formatTime(post.createdAt) }}</span></small>
                            <NuxtLink :to="`/post/details/${post.id}`" class="block mt-3 leading-tight font-medium hover:underline">view</NuxtLink>
                            <p class="mt-2">{{ utils.topicContent(post.post_content) }}</p>
                          </div>

                            <div class="md:shrink-0 w-[14%] pl-2 inline-block align-top">
                              <img :src="utils.userImage(user.image)" class="object-cover rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt="">
                              <div class="mt-5 h-44 w-full rounded-xl border-l md:border-none md:shadow-none">
                                <div class="text-center text-xs text-rose-500 "><i class="bi bi-heart text-2xl "></i> <span class="block">{{ post.total_likes }}</span></div>
                                  <div class="text-center text-xs text-rose-500 mt-3"><i class="bi bi-share text-2xl "></i> <span class="block">{{ post.total_shares }}</span></div>
                                  <div class="text-center text-xs text-rose-500 mt-3"><i class="bi bi-chat text-2xl "></i> <span class="block">{{ post.comments }}</span></div>
                              
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
                  

                  <div v-for="reply in users.replies" :key="reply.id" class="dark-card w-[98%] md:w-3/5 dark:text-white rounded-xl shadow-2xl my-3 flex-none mx-1">
                    <div class="md:flex">
                      <div class="md:shrink-0">
                          <img class="h-56 w-full rounded-xl object-cover md:h-full md:w-48" :src="utils.topicImage(reply.image)" alt="Modern building architecture">
                      </div>
                        <div class="w-full pt-2">
                          <div class="w-[85%] inline-block align-top px-4 py-1">
                            <div class="text-xs font-bold">{{ user.username }} <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span></div>
                            <small><span>{{ utils.formatTime(reply.createdAt) }}</span></small>
                            <NuxtLink :to="`/topic/details/${reply.id}`" class="block mt-3 leading-tight font-medium hover:underline">{{  }}</NuxtLink>
                            <p class="mt-2">{{ utils.topicContent(reply.reply_content) }}</p>
                          </div>

                            <div class="md:shrink-0 w-[14%] pl-2 inline-block align-top">
                              <img :src="utils.userImage(user.image)" class="object-cover rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt="">
                              <div class="mt-5 h-44 w-full rounded-xl border-l md:border-none md:shadow-none">
                                <div class="text-center text-xs text-rose-500 "><i class="bi bi-heart text-2xl "></i> <span class="block">{{ reply.total_likes }}</span></div>
                                  <div class="text-center text-xs text-rose-500 mt-3"><i class="bi bi-share text-2xl "></i> <span class="block">{{ reply.total_shares }}</span></div>
                                 
                              
                              </div>
                            </div>
                        </div>
                            
                    </div>
                  </div>

                  


                </div>
              </div>
            </div>
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
              <div class="flex-auto p-4 mb-16">
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