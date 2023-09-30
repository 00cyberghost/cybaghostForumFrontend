import 'simple-notify/dist/simple-notify.min.css'
import {useAuthStore} from "~/stores/authStore"
const { utils } = useUtils();
export const useNotifications = () => {

    //dark mode handler
    const notifications = {

        isDark: 'light',

        reactionEvent: (value) => {
        
            let user = useAuthStore().user

            if((user != null) && (value.user_id == user.id)) return

            console.log(value.id)

            switch (value.subtype) {
                case 'topic':
                notifications.reactionTopic(value.id,value.type)
                    
                    break;

                case 'post':
                notifications.reactionPost(value.id,value.type)
                    
                    break;

                case 'reply':
                notifications.reactionReply(value.id,value.type)
                    
                    break;
            
                default:
                    break;
            }
        },

        //upadate count of like,share or comment in a topic
        //the id field helps to identify the element in the dom
        //type can be like,share or comment
        reactionTopic : (id,type) => {

            let el

            switch (type) {
                case 'like':
                el = document.querySelector(`[card-topic-id="${id}"] #topic-like`)
                el.textContent = parseInt(el.textContent) + 1
                    break;

                case 'share':
                el = document.querySelector(`[card-topic-id="${id}"] #topic-share`)
                el.textContent = parseInt(el.textContent) + 1
                    break;

                case 'comment':
                el = document.querySelector(`[card-topic-id="${id}"] #topic-comment`)
                el.textContent = parseInt(el.textContent) + 1
                    break;
            
                default:
                    break;
            }
            
            
        },


        //upadate count of like,share or comment in a post
        //the id field helps to identify the element in the dom
        //type can be like,share or comment
        reactionPost : (id,type) => {

            let el

            switch (type) {
                case 'like':
                el = document.querySelector(`[card-post-id="${id}"] #post-like`)
                el.textContent = parseInt(el.textContent) + 1
                    break;

                case 'share':
                el = document.querySelector(`[card-post-id="${id}"] #post-share`)
                el.textContent = parseInt(el.textContent) + 1
                    break;

                case 'comment':
                if(useRoute().path == '/'){
                    el = document.querySelector(`[card-post-id="${id}"] #post-comment`)
                    el.textContent = parseInt(el.textContent) + 1
                }
                break;

                default:
                    break;
            }


        },

        //upadate count of like,share or comment in a reply
        //the id field helps to identify the element in the dom
        //type can be like,share or comment
        reactionReply : (id,type) => {

            let el

            switch (type) {
                case 'like':
                el = document.querySelector(`[card-reply-id="${id}"] #reply-like`)
                el.textContent = parseInt(el.textContent) + 1
                    break;

                case 'share':
                el = document.querySelector(`[card-reply-id="${id}"] #reply-share`)
                el.textContent = parseInt(el.textContent) + 1
                    break;

                case 'comment':
                    if(useRoute().path == '/'){
                        el = document.querySelector(`[card-reply-id="${id}"] #reply-comment`)
                        el.textContent = parseInt(el.textContent) + 1
                    }
                    break;

                default:
                    break;
            }


        },
        
        //notify the logged in user of a notification using the notify plugin
        notificationEvents : (value) => {

            let user = useAuthStore().user

            if(user == null) return

            if(user.id == value.user_id){
                
                //offline notification
                utils.browserNotify('New notification',value.content)
                
                //notify the user with the notify plugin
                utils.notifySuccess('New Notification',value.content)
                
                //increment the notification count
                let el = document.getElementById('notification-count')
                if(el != null){
                    let c = parseInt(el.textContent)
                    c > 0 ? el.textContent = c + 1 : el.classList.add('hidden')
                }
                
                let el2 = document.getElementById('notification-count-mobile')

                if(el2 != null){
                    let d = parseInt(el2.textContent)
                d > 0 ? el2.textContent = d + 1 : el2.classList.add('hidden')
                }
            }

            
        },
        //show people viewing a topic
        viewingNotification : (value) => {

            if(useRoute().params.id == value.id){

                if(value.user_id == 0){

                    utils.notifyView('','A guest is viewing this thread')

                    let el = document.querySelector('.image-text-template').cloneNode()
                    el.classList.remove('hidden')
                    el.textContent = 'G'
                    document.getElementById('viewing-this').prepend(el)
                    
                
                }else{

                    utils.notifyView('',`${value.username} is viewing this thread`)
    
                    if(value.user_image != null){
    
                        let el = document.querySelector('.image-template').cloneNode()
                        el.classList.remove('hidden')
                        el.setAttribute('src',value.user_image)
                        document.getElementById('viewing-this').prepend(el)
                    
                    }else{
        
                        let el = document.querySelector('.image-text-template').cloneNode()
                        el.classList.remove('hidden')
                        el.textContent = value.username.slice(0,2)
                        document.getElementById('viewing-this').prepend(el)
        
                    }
                }
            }

                
            
            

        }
    }

    return {notifications}
}