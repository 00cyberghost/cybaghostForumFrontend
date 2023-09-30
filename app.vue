<script setup>
import { io } from "socket.io-client";
import {useAuthStore} from "/stores/authStore"
const socket = io("https://api.cybaghost.com.ng");

const { utils } = useUtils();

const { notifications } = useNotifications()

const categories = ref([])

const usersToFollow = ref([])

myFetch('/category')
.then(data => categories.value = data)

myFetch('/follow')
.then(data => usersToFollow.value = data)



if(useAuthStore().user != null){

    useAuthStore().fetchNotifications()
}




socket.on("connect", () => {
    // console.log(socket.id);
});

socket.on("reactionEvent",(value) => {

    notifications.reactionEvent(value)

})

//upadate count of like,share or comment in a topic
//the id field helps to identify the element in the dom
//type can be like,share or comment
const reactionTopic = (id,type) => {

    notifications.reactionTopic(id,type)
    
    
}


//upadate count of like,share or comment in a post
//the id field helps to identify the element in the dom
//type can be like,share or comment
const reactionPost = (id,type) => {

    notifications.reactionPost(id,type)


}

//upadate count of like,share or comment in a reply
//the id field helps to identify the element in the dom
//type can be like,share or comment
const reactionReply = (id,type) => {

    notifications.reactionReply


}

//notify the logged in user of a notification using the notify plugin
socket.on("notificationEvent",(value) => {

    
    notifications.notificationEvents(value)
    

})

//notify the logged in user of a notification using the notify plugin
socket.on("viewingEvent",(value) => {

    notifications.viewingNotification(value)
})





</script>
<template>
    <NuxtLayout>
        <VitePwaManifest />
        <NuxtLoadingIndicator />
        <Header />
        <NuxtPage :categories="categories" :usersToFollow="usersToFollow" />
        <MobileNavigation :categories="categories" />
    </NuxtLayout>
</template>
