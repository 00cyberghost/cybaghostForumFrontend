import {useAuthStore} from "~/stores/authStore"
const { utils } = useUtils();

export const useHome = () => {
    const home = {

        toggleLikeTopic : (event) => {

            if(useAuthStore().user == null) {

                navigateTo('/login')

                return

            }
            

            let tex = event.target

            if(tex.classList.contains('bi-heart-fill')){
                
                //subtract like from the element
                utils.removeLike(event)

                myFetch(`/like/topic`,{
                    method: 'delete',
                    body: {'topic_id' : tex.getAttribute('topic-id'),'liked_user_id' :tex.getAttribute('liked-user-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','')
                    
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong','')
                    utils.addLike(event)
                })

                
            
            }else{
                
                //add like to the element
                utils.addLike(event)

                myFetch(`/like/topic`,{
                method: 'post',
                body: {'topic_id' : tex.getAttribute('topic-id'),'liked_user_id' :tex.getAttribute('liked-user-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','Your liked this post Successful')
                })
                .catch((err) =>{
                    utils.notifyFailure('something went wrong','')
                    utils.removeLike(event)
                })
            }
            


        },

        

        toggleShareTopic : (event) => {

            if(useAuthStore().user == null) {

                navigateTo('/login')

                return
            }

            let tex = event.target

            if(tex.classList.contains('bi-share-fill')){
                
                //subtract share from the element
                utils.removeShare(event)

                myFetch(`/share/topic`,{
                    method: 'delete',
                    body: {'topic_id' : tex.getAttribute('topic-id'), 'shared_user_id' : tex.getAttribute('shared-user-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','')
                    
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong','')
                    utils.addShare(event)
                })
            
            }else{
                
                //add like to the element
                utils.addShare(event)

                myFetch(`/share/topic`,{
                    method: 'post',
                    body: {'topic_id' : tex.getAttribute('topic-id'), 'shared_user_id' : tex.getAttribute('shared-user-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','Share Received')
                    utils.fetchPage('/topic')
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong','')
                    utils.removeShare(event)
                })
            }
            


        },

        
    }

    return {home}
}