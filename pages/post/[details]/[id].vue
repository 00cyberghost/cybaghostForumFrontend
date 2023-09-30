<script setup>
    import {useAuthStore} from "~/stores/authStore"

    defineProps({
        categories : Object
    })
    
    
    const { utils } = useUtils();

    const { post } = usePost();

    const postUtil = post

    const posts = postUtil.postRef
    const isLoading = ref(true)

    myFetch(`/post/${useRoute().params.id}`)
    .then(data => posts.value = data)
    .finally(() => isLoading.value = false)
    const current_url = location.href
    

</script>
<template>
   
   <div class="container w-full mx-auto mt-14">
    <div class="w-full md:grid md:grid-cols-8 h-screen">
        <div class="hidden md:block col-span-2 relative">
            <SideBarDesktopCategory :categories="categories" />
        </div>
        <div class="col-span-7 md:col-span-4 p-2 codes">
            <Loader :isLoading="isLoading" />
            <div v-for="post in posts.post" :key="post.id" class="dark-card iterator w-full mx-auto dark:text-white rounded-xl shadow-2xl overflow-hidden my-5">
                <Head>
                    <Title>{{ post.post_content }}</Title>
                    <Meta name="description" :content="post.post_content" />
                    <Meta name="og:title" :content="post.post_content" />
                    <Meta name="og:image" :content="utils.extractImage(post.post_content)" />
                    <Meta name="og:description" :content="post.post_content" />
                    <Meta name="og:url" :content="current_url" />
                    <Meta name="og:image:type" content="image/jpg" />
                    <Meta name="og:type" content="article" />
                </Head>
                <div :card-post-id="post.id">
                    
                    <div class="w-full pt-2">
                        <div class="flex align-top px-4 py-1">
                            <img :src="`${utils.userImage(post.user_image)}`" class="object-cover rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt="">
                            <div class="w-full block ml-3">
                                <div class="text-xs font-bold"><NuxtLink :to="`/user/${post.username}/${post.user_id}`" class=" no-underline">{{ post.username }}</NuxtLink> <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span><span @click="utils.modifyTextarea" v-if="((useAuthStore().user != null) && (useAuthStore().user.id == post.user_id))" class="float-right cursor-pointer">modify</span></div>
                                <small><span>{{ utils.formatTime(post.createdAt) }}</span></small>
                            </div>
                        </div>
                        <div class="w-full px-4 text-sm md:text-base">
                            <p class="mt-2 text-content" v-html="utils.decodeHtml(post.post_content)"></p>
                        </div>
                    </div>
                    
                
                    <div class="mt-1 w-[90%] mx-auto rounded-xl border p-3 mb-3 shadow-none flex justify-around">
                        <div v-if="((useAuthStore().user != null) && (useAuthStore().user.id == post.like_user_id))" class="text-center text-xs text-rose-500 "><i @click="postUtil.toggleLikePost" :post-id="post.id" :liked-user-id="post.user_id" class="bi bi-heart-fill text-2xl "></i> <span class="block" id="post-like">{{ post.total_likes }}</span></div>
                        <div v-else class="text-center text-xs text-rose-500 "><i @click="postUtil.toggleLikePost" :post-id="post.id" :liked-user-id="post.user_id" class="bi bi-heart text-2xl "></i> <span class="block" id="post-like">{{ post.total_likes }}</span></div>


                        <div v-if="((useAuthStore().user != null) && (useAuthStore().user.id == post.share_user_id))" class="text-center text-xs text-rose-500 "><i @click="postUtil.toggleSharePost" :post-id="post.id" :shared-user-id="post.user_id" class="bi bi-share-fill text-2xl "></i> <span class="block" id="post-share">{{ post.total_shares }}</span></div>
                        <div v-else class="text-center text-xs text-rose-500 "><i @click="postUtil.toggleSharePost" :post-id="post.id" :shared-user-id="post.user_id" class="bi bi-share text-2xl "></i> <span class="block" id="post-share">{{ post.total_shares }}</span></div>

                        <div @click="utils.toggleTextarea" :username="post.username" class="text-center text-xs text-rose-500"><i class="bi bi-chat text-2xl "></i> <span class="block" id="post-comment">Reply</span></div>
                    </div>

                    <div class="mt-1 w-[90%] cont mx-auto rounded-xl border p-3 mb-3 shadow-none hidden" id="pm" @focusout="utils.hideTextarea">
                        <div :post-id="post.id" @blur="utils.hideTextarea" id="text-container" contenteditable="true" class="w-full bg-slate-200 border-none outline-none p-2 rounded-xl dark:bg-darkness-100" placeholder="Type something..."></div>
                        <div class="mt-5">
                            <span @click="postUtil.launchDropzone" class="cursor-pointer mt-5 inline-block p-1 px-2 rounded text-white text-xs bg-primary">Add Image</span>
                            <span @click="postUtil.insertCode" class="cursor-pointer mt-5 mx-2 inline-block p-1 px-2 rounded text-white text-xs bg-primary"><i class="bi bi-code"></i> code</span>
                
                            <span @click="postUtil.replyPost" class="cursor-pointer hidden send mt-5 p-2 px-3 rounded text-white text-xs bg-primary float-right">send</span>
                            <span @click="postUtil.modifyPost" class="cursor-pointer hidden modify mt-5 p-2 px-3 rounded text-white text-xs bg-primary float-right">modify</span>
                            <input type="hidden" :value="post.image">
                        </div>
                    </div>
                </div>
            </div>

            <div v-for="reply in posts.replies" :key="reply.id" class="dark-card iterator w-full mx-auto dark:text-white rounded-xl shadow-2xl overflow-hidden my-5">
                <div :card-reply-id="reply.id">
                    
                    <div class="w-full pt-2 text-sm md:text-base">
                        <div class="flex align-top px-4 py-1">
                            <img :src="`${utils.userImage(reply.user_image)}`" class="object-cover rounded-full h-9 w-9 ring-2 ring-offset-1 ring-rose-500" alt="">
                            <div class="w-full block ml-3">
                                <div class="text-xs font-bold"><NuxtLink :to="`/user/${reply.username}/${reply.user_id}`" class=" no-underline">{{ reply.username }}</NuxtLink> <span><ClientOnly><font-awesome-icon icon="fa-plus" /></ClientOnly></span><span @click="utils.modifyTextarea" v-if="((useAuthStore().user != null) && (useAuthStore().user.id == reply.user_id))" class="float-right cursor-pointer">modify</span></div>
                                <small><span>{{ utils.formatTime(reply.createdAt) }}</span></small>
                            </div>
                        </div>
                        <div class="w-full px-4">
                            <p class="mt-2 text-content" v-html="utils.decodeHtml(reply.reply_content)"></p>
                        </div>
                    </div>
                
                    <!-- <div class="ms-4 relative min-h-[30px] mt-3 mb-4">
                        <div class="min-h-[30px] border-l-2 border-b-2 border-gradient-to-r from-rose-500 to-fuchsia-500 left-0 min-w-[3rem] md:min-w-[5rem] absolute"></div>
                        <NuxtLink :to="`/post/detail/${reply.id}`"><div class="absolute bottom-[-8px] left-[4rem] md:left-[6rem]">View 3 replies</div></NuxtLink>
                    </div> -->
                
                    <div class="mt-3 w-[90%] mx-auto rounded-xl border p-3 mb-3 shadow-none flex justify-around">
                        <div v-if="((useAuthStore().user != null) && (useAuthStore().user.id == reply.like_user_id))" class="text-center text-xs text-rose-500"><i @click="postUtil.toggleLikeReply" :reply-id="reply.id" :post-id="posts.post[0].id" :liked-user-id="reply.user_id" class="bi bi-heart-fill text-2xl "></i> <span class="block" id="reply-like">{{ reply.total_likes }}</span></div>
                        <div v-else class="text-center text-xs text-rose-500 "><i @click="postUtil.toggleLikeReply" :reply-id="reply.id" :post-id="posts.post[0].id" :liked-user-id="reply.user_id" class="bi bi-heart text-2xl "></i> <span class="block" id="reply-like">{{ reply.total_likes }}</span></div>


                        <div v-if="((useAuthStore().user != null) && (useAuthStore().user.id == reply.share_user_id))" class="text-center text-xs text-rose-500 "><i @click="postUtil.toggleShareReply" :reply-id="reply.id" :post-id="posts.post[0].id" :shared-user-id="reply.user_id" class="bi bi-share-fill text-2xl "></i> <span class="block" id="reply-share">{{ reply.total_shares }}</span></div>
                        <div v-else class="text-center text-xs text-rose-500 "><i @click="postUtil.toggleShareReply" :reply-id="reply.id" :post-id="posts.post[0].id" :shared-user-id="reply.user_id" class="bi bi-share text-2xl "></i> <span class="block" id="reply-share">{{ reply.total_shares }}</span></div>

                        <div @click="utils.toggleTextarea" :username="reply.username" class="text-center text-xs text-rose-500"><i class="bi bi-chat text-2xl "></i> <span class="block" id="reply-comment">Reply</span></div>
                    </div>
                    
                    <div class="mt-1 w-[90%] cont mx-auto rounded-xl border p-3 mb-3 shadow-none hidden" id="pm" @focusout="utils.hideTextarea">
                        <div :reply-id="reply.id" :post-id="reply.post_id" @blur="utils.hideTextarea" id="text-container" contenteditable="true" class="w-full bg-slate-200 border-none outline-none p-2 rounded-xl dark:bg-darkness-100" placeholder="Type something...">{{ `@${reply.username}` }}</div>
                        <div class="mt-5">
                            <span @click="postUtil.launchDropzone" class="cursor-pointer mt-5 inline-block p-1 px-2 rounded text-white text-xs bg-primary">Add Image</span>
                            <span @click="postUtil.insertCode" class="cursor-pointer mt-5 mx-2 inline-block p-1 px-2 rounded text-white text-xs bg-primary"><i class="bi bi-code"></i> code</span>
                
                            <span  @click="postUtil.replyPost" class="cursor-pointer send hidden mt-5 p-2 px-3 rounded text-white text-xs bg-primary float-right">send</span>
                            <span  @click="postUtil.modifyReply" class="cursor-pointer modify hidden mt-5 p-2 px-3 rounded text-white text-xs bg-primary float-right">modify</span>
                            <input type="hidden" :value="reply.image">
                        </div>
                    </div>
                </div>
            </div>

           

            <Dropzone @close="postUtil.appendDropzoneImage" />
        </div>
        <div class="hidden md:block relative col-span-2">

            <DesktopViewing />
    
            <!-- <SideBarDesktopRightBar /> -->
            
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