<script setup>
    import {useAuthStore} from "~/stores/authStore"

    defineProps({
        categories : Object
    })
    
    const { utils } = useUtils();

    const { topic } = useTopic();

    const topicUtil = topic

    const topics = topicUtil.topicRef

    const isLoading = ref(true)

    myFetch(`/topic/${useRoute().params.id}`)
    .then(data => topics.value = data)
    .finally(() => isLoading.value = false)

    const current_url = location.href


    onMounted(() => {
        //increment topic views
        myFetch(`/topic/${useRoute().params.id}`,{'method' : 'put'})


    })

</script>
<template>
   
   <div class="container w-full mx-auto mt-14">
    <div class="w-full md:grid md:grid-cols-8 h-screen">
        <div class="hidden md:block col-span-2 relative">
            <SideBarDesktopCategory :categories="categories" />
        </div>
        <div class="col-span-7 md:col-span-4 p-2 codes">
            <Loader :isLoading="isLoading" />
            <div v-for="topic in topics.topic" :key="topic.id" class="dark-card iterator w-full mx-auto dark:text-white rounded-xl shadow-2xl overflow-hidden my-5">
                <Head>
                    <Title>{{ topic.title }}</Title>
                    <Meta name="description" :content="topic.post" />
                    <Meta name="og:title" :content="topic.title" />
                    <Meta name="og:description" :content="topic.post" />
                    <Meta name="og:image" :content="utils.extractImage(topic.post)" />
                    <Meta name="og:url" :content="current_url" />
                    <Meta name="og:image:type" content="image/jpg" />
                    <!-- <Meta name="og:type" content="article" /> -->
                    <Meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                </Head>
                <div :card-topic-id="topic.id">
                    
                    <div class="w-full pt-2 text-sm md:text-base">
                        <div class="flex align-top px-4 py-1">
                            <img :src="`${utils.userImage(topic.user_image)}`" class="object-cover rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt="">
                            <div class="w-full block ml-3">
                                <div class="text-xs font-bold"><NuxtLink :to="`/user/${topic.username}/${topic.user_id}`" class=" no-underline">{{ topic.username }}</NuxtLink> <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span> <span @click="utils.modifyTextarea" v-if="((useAuthStore().user != null) && (useAuthStore().user.id == topic.user_id))" class="float-right cursor-pointer">modify</span></div>
                                <small><span>{{ topic.category_name }}.</span> &nbsp; <span>{{ utils.formatTime(topic.createdAt) }}</span> &nbsp; <span>{{ topic.views }} <i class="bi bi-eye"></i></span></small>
                            </div>
                        </div>
                        <div class="w-full px-4 ">
                            <a href="#" class="block mt-3 leading-tight font-semibold hover:underline">{{ topic.title }}</a>
                            <ClientOnly><div class="mt-2 text-content" v-html="utils.decodeHtml(topic.post)"></div></ClientOnly>
                        </div>
                    </div>
                
                    <div class="mt-1 w-[90%] mx-auto rounded-xl border p-3 mb-3 shadow-none flex justify-around">
                        <div v-if="((useAuthStore().user != null) && (useAuthStore().user.id == topic.like_user_id))" class="text-center text-xs text-rose-500 "><i @click="topicUtil.toggleLikeTopic" :topic-id="topic.id" :liked-user-id="topic.user_id" class="bi bi-heart-fill text-2xl "></i> <span class="block" id="topic-like">{{ topic.total_likes }}</span></div>
                        <div v-else class="text-center text-xs text-rose-500 "><i @click="topicUtil.toggleLikeTopic" :topic-id="topic.id" :liked-user-id="topic.user_id" class="bi bi-heart text-2xl "></i> <span class="block" id="topic-like">{{ topic.total_likes }}</span></div>


                        <div v-if="((useAuthStore().user != null) && (useAuthStore().user.id == topic.share_user_id))" class="text-center text-xs text-rose-500 "><i @click="topicUtil.toggleShareTopic" :topic-id="topic.id" :shared-user-id="topic.user_id" class="bi bi-share-fill text-2xl "></i> <span class="block" id="topic-share">{{ topic.total_shares }}</span></div>
                        <div v-else class="text-center text-xs text-rose-500 "><i @click="topicUtil.toggleShareTopic" :topic-id="topic.id" :shared-user-id="topic.user_id" class="bi bi-share text-2xl "></i> <span class="block" id="topic-share">{{ topic.total_shares }}</span></div>


                        
                        <div @click="utils.toggleTextarea" class="text-center text-xs text-rose-500"><i class="bi bi-chat text-2xl "></i> <span class="block" id="topic-comment">Reply</span></div>
                    </div>

                    <div class="mt-1 w-[90%] mx-auto cont rounded-xl border p-3 mb-3 shadow-none hidden" id="pm" @focusout="utils.hideTextarea">
                        <div id="text-container" contenteditable="true" :topic-id="topic.id" :category-id="topic.category_id" class="w-full bg-slate-200 border-none outline-none p-2 rounded-xl dark:bg-darkness-100" placeholder="Type something..."></div>
                        <div class="mt-5">
                            <span @click="topicUtil.launchDropzone" class="cursor-pointer mt-5 inline-block p-1 px-2 rounded text-white text-xs bg-primary">Add Image</span>
                            <span @click="topicUtil.insertCode" class="cursor-pointer mt-5 mx-2 inline-block p-1 px-2 rounded text-white text-xs bg-primary"><i class="bi bi-code"></i> code</span>
                            
                            <span @click="topicUtil.replyTopic" :user-id="topic.user_id" class="cursor-pointer hidden send mt-5  p-2 px-3 rounded text-white text-xs bg-primary float-right">send</span>
                            <span @click="topicUtil.modifyTopic" class="cursor-pointer hidden modify mt-5  p-2 px-3 rounded text-white text-xs bg-primary float-right">Modify</span>
                            <input type="hidden" :value="topic.image">
                        </div>

                        
                        
                        
                    </div>
                </div>
            </div>

            <div v-for="post in topics.posts" :key="post.id" class="dark-card iterator w-full mx-auto dark:text-white rounded-xl shadow-2xl overflow-hidden my-5">
                <div :card-post-id="post.id">
                    
                    <div class="w-full pt-2 text-sm md:text-base">
                        <div class="flex align-top px-4 py-1">
                            <img :src="`${utils.userImage(post.user_image)}`" class="object-cover rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt="">
                            <div class="w-full block ml-3">
                                <div class="text-xs font-bold"><NuxtLink :to="`/user/${post.username}/${post.user_id}`" class=" no-underline">{{ post.username }}</NuxtLink> <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span><span @click="utils.modifyTextarea" v-if="((useAuthStore().user != null) && (useAuthStore().user.id == post.user_id))" class="float-right cursor-pointer">modify</span></div>
                                <small><span>{{ utils.formatTime(post.createdAt) }}</span></small>
                            </div>
                        </div>
                        <div class="w-full px-4">
                            <div class="p-3 text-content" v-html="utils.decodeHtml(post.post_content)"></div>
                           
                        </div>
                    </div>

                    <div v-if="post.replies > 0" class="ms-4 text-sm md:text-base relative min-h-[30px] mt-3 mb-4">
                        <div class="min-h-[30px] border-l-2 border-b-2 border-gradient-to-r from-rose-500 to-fuchsia-500 left-0 min-w-[3rem] md:min-w-[5rem] absolute"></div>
                        <NuxtLink :to="`/post/detail/${post.id}`"><div class="absolute bottom-[-8px] left-[4rem] md:left-[6rem]">View {{ post.replies }} replies</div></NuxtLink>
                    </div>
                
                    <div class="mt-1 w-[90%] mx-auto rounded-xl border p-3 mb-3 shadow-none flex justify-around">
                        <div v-if="((useAuthStore().user != null) && (useAuthStore().user.id == post.like_user_id))" class="text-center text-xs text-rose-500 "><i @click="topicUtil.toggleLikePost" :post-id="post.id" :liked-user-id="post.user_id" class="bi bi-heart-fill text-2xl "></i> <span class="block" id="post-like">{{ post.total_likes }}</span></div>
                        <div v-else class="text-center text-xs text-rose-500 "><i @click="topicUtil.toggleLikePost" :post-id="post.id" :liked-user-id="post.user_id" class="bi bi-heart text-2xl "></i> <span class="block" id="post-like">{{ post.total_likes }}</span></div>


                        <div v-if="((useAuthStore().user != null) && (useAuthStore().user.id == post.share_user_id))" class="text-center text-xs text-rose-500 "><i @click="topicUtil.toggleSharePost" :post-id="post.id" :shared-user-id="post.user_id" class="bi bi-share-fill text-2xl "></i> <span class="block" id="post-share">{{ post.total_shares }}</span></div>
                        <div v-else class="text-center text-xs text-rose-500 "><i @click="topicUtil.toggleSharePost" :post-id="post.id" :shared-user-id="post.user_id" class="bi bi-share text-2xl "></i> <span class="block" id="psot-share">{{ post.total_shares }}</span></div>

                        <div @click="utils.toggleTextarea" class="text-center text-xs text-rose-500"><i class="bi bi-chat text-2xl "></i> <span class="block" id="post-comment">Reply</span></div>
                    </div>
                    <div class="mt-1 w-[90%] cont mx-auto cont rounded-xl border p-3 mb-3 shadow-none hidden" id="pm" @focusout="utils.hideTextarea">
                        <div id="text-container" contenteditable="true" :post-id="post.id" class="w-full bg-slate-200 border-none outline-none p-2 rounded-xl dark:bg-darkness-100"></div>

                        <div class="mt-5">
                            <span @click="topicUtil.launchDropzone" class="cursor-pointer mt-5 inline-block p-1 px-2 rounded text-white text-xs bg-primary">Add Image</span>
                            <span @click="topicUtil.insertCode" class="cursor-pointer mt-5 mx-2 inline-block p-1 px-2 rounded text-white text-xs bg-primary"><i class="bi bi-code"></i> code</span>
                           
                            <span  @click="topicUtil.replyPost" class="cursor-pointer hidden send mt-5 p-2 px-3 rounded text-white text-xs bg-primary float-right">send</span>
                            <span  @click="topicUtil.modifyPost" class="cursor-pointer hidden modify mt-5 p-2 px-3 rounded text-white text-xs bg-primary float-right">Modify</span>
                            <input type="hidden" :value="post.image">
                        </div>
                    </div>
                </div>
            </div>
            
           
            <Dropzone @close="topicUtil.appendDropzoneImage" />

        </div>
        <div class="hidden md:block relative col-span-2">
    
            <!-- <SideBarDesktopRightBar /> -->

            <DesktopViewing />
            
        </div>
    </div>
   </div>
</template>
<style>
.codes .replace-content{

    padding: 30px;
    margin-bottom : 30px;
    width: 98%;
    border-radius: 10px;
    margin: 0 auto;
    overflow-x: auto;
    color: white;
    background-color: #000;
    text-align:start;
}

@media (prefers-color-scheme:dark){
    .codes .replace-content{
        background-color: #212529;
    }
}
</style>