import {useAuthStore} from "~/stores/authStore"
const { utils } = useUtils();

export const usePost = () => {
    const post = {

        postRef : ref([]),

        //submit a reply to a post
        replyPost : (event) => {

            if(useAuthStore().user == null) return

            let tex = event.target.parentElement.parentElement.querySelector('#text-container')

            const posts = tex.innerHTML

            //hide the reply box
            event.target.parentElement.parentElement.classList.add('hidden')

            myFetch(`/reply`,{
                method: 'post',
                body: {'post_id' : tex.getAttribute('post-id'),'reply_content' : utils.replaceContent(posts), 'image' : utils.extractAllImage(posts)}
            })
            .then((data) => {
                console.log(data)
                utils.notifySuccess('SUCCESS!','Your Reply Was Submitted Successful')
                //reload the page
                utils.reloadPage(`/post/${useRoute().params.id}`)
                .then(data => post.postRef.value = data)
            })
            .catch((err) => {
                if(err.length > 0) utils.notifyFailure('Error','Something Went Wrong While Submitting Your Reply. Please Try Again Later')
            })
        },

        //modify a post
        modifyPost : (event) => {

            if(useAuthStore().user == null) return

            let tex = event.target.parentElement.parentElement.querySelector('#text-container')

            const posts = tex.innerHTML
             
            //hide the reply box
            event.target.parentElement.parentElement.classList.add('hidden')

            myFetch(`/post`,{
                method: 'put',
                body: {'post_id' : tex.getAttribute('post-id'),'post_content' : utils.replaceContent(posts), 'image' : utils.extractAllImage(posts)}
            })
            .then((data) => {

                utils.notifySuccess('SUCCESS!','Your Reply Was Modified Successful')
                //reload the page
                utils.fetchPage(`/topic/${useRoute().params.id}`)
            })
            .catch((err) => {
                if(err.length > 0) utils.notifyFailure('Error','Something Went Wrong While Modifying Your Reply. Please Try Again Later')
            })
        },
        //modify a reply
        modifyReply : (event) => {

            if(useAuthStore().user == null) return

            let tex = event.target.parentElement.parentElement.querySelector('#text-container')

            const pattern = /<img|\[code]/

            const posts = tex.innerHTML

            //hide the reply box
            event.target.parentElement.parentElement.classList.add('hidden')

            myFetch(`/reply`,{
                method: 'put',
                body: {'reply_id' : tex.getAttribute('reply-id'),'reply_content' : utils.replaceContent(posts), 'image' : utils.extractAllImage(posts)}
            })
            .then((data) => {

                utils.notifySuccess('SUCCESS!','Your Reply Was Modified Successful')
                //reload the page
                utils.fetchPage(`/topic/${useRoute().params.id}`)
            })
            .catch((err) => {
                if(err.length > 0) utils.notifyFailure('Error','Something Went Wrong While Modifying Your Reply. Please Try Again Later')
            })
        },
        
        

        toggleLikePost : (event) => {

            if(useAuthStore().user == null) {

                navigateTo('/login')
                return

            }

            let tex = event.target

            if(tex.classList.contains('bi-heart-fill')){
                
                //subtract like from the clicked post
                utils.removeLike(event)

                myFetch(`/like/post`,{
                    method: 'delete',
                    body: {'post_id' : tex.getAttribute('post-id'), 'liked_user_id' : tex.getAttribute('liked-user-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','')
                    
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong','')
                        //add like to the clicked post
                    utils.addLike(event)
                })
            
            }else{

                //subtract like from the clicked post
                utils.addLike(event)

                myFetch(`/like/post`,{
                    method: 'post',
                    body: {'post_id' : tex.getAttribute('post-id'), 'liked_user_id' : tex.getAttribute('liked-user-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','Your liked this post Successful')
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong','')
                    //subtract like from the clicked post
                    utils.removeLike(event)
                })
            }
        },

        toggleSharePost : (event) => {

            if(useAuthStore().user == null) {

                navigateTo('/login')
                return

            }

            let tex = event.target

            if(tex.classList.contains('bi-share-fill')){

                //subtract share from the clicked post
                utils.removeShare(event)

                myFetch(`/share/post`,{
                    method: 'delete',
                    body: {'post_id' : tex.getAttribute('post-id'),'shared_user_id' : tex.getAttribute('shared-user-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','')
                    
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong','')
                    //add like to the clicked post
                    utils.addShare(event)
                })
            
            }else{

                //add share to the clicked post
                utils.addShare(event)

                myFetch(`/share/post`,{
                    method: 'post',
                    body: {'post_id' : tex.getAttribute('post-id'),'shared_user_id' : tex.getAttribute('shared-user-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','Share Received')
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong')
                    //add share to the clicked post
                    utils.removeShare(event)
                })
            }
            
        },

        toggleLikeReply : (event) => {

            if(useAuthStore().user == null) {
    
                navigateTo('/login')
                return
    
            }
    
            let tex = event.target

            if(tex.classList.contains('bi-heart-fill')){

                //remove like from the clicked post
                utils.removeLike(event)

                myFetch(`/like/reply`,{
                    method: 'delete',
                    body: {'reply_id' : tex.getAttribute('reply-id'),
                    'liked_user_id' : tex.getAttribute('liked-user-id'),
                    'post_id' : tex.getAttribute('post-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','')
                    
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong','')
                    //add like to the clicked post
                    utils.addLike(event)
                })
            
            }else{

                //add like to the clicked post
                utils.addLike(event)

                myFetch(`/like/reply`,{
                    method: 'post',
                    body: {'reply_id' : tex.getAttribute('reply-id'),
                    'liked_user_id' : tex.getAttribute('liked-user-id'),
                    'post_id' : tex.getAttribute('post-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','Like Received!')
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong','')
                    //remove like from the clicked post
                    utils.removeLike(event)
                })
            }
            
        },
        toggleShareReply : (event) => {

            if(useAuthStore().user == null) {
    
                navigateTo('/login')
                return
    
            }
    
            let tex = event.target

            if(tex.classList.contains('bi-share-fill')){

                //subtract share from the clicked post
                utils.removeShare(event)

                myFetch(`/share/reply`,{
                    method: 'delete',
                    body: {'reply_id' : tex.getAttribute('reply-id'),
                    'shared_user_id' : tex.getAttribute('shared-user-id'),
                    'post_id' : tex.getAttribute('post-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','')
                    
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong','')
                    //add share from the clicked post
                    utils.addShare(event)
                })

            
            }else{

                //add share to the clicked post
                utils.addShare(event)

                myFetch(`/share/reply`,{
                    method: 'post',
                    body: {'reply_id' : tex.getAttribute('reply-id'),
                    'shared_user_id' : tex.getAttribute('shared-user-id'),
                    'post_id' : tex.getAttribute('post-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','Post shared!')
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong','')
                    //subtract share from the clicked post
                    utils.removeShare(event)
                })
            }
            
        },

        
        image_array : [],

        //create an image element and set the src attribute the the dropzone response
        //append this created file to the text conatiner
        //keep track of the uploaded images by pushing it to an array
        //this array will be compared during form submission to know which images was removed by the user if any
        appendDropzoneImage : (res) => {

            let img = document.createElement('img')
            img.setAttribute('class','rounded-2xl my-4') 
            img.src = res 
            let root_element = document.querySelector('[event-source="click"]')
            let posts = root_element.parentElement.parentElement.querySelector('#text-container')
            posts.appendChild(img)
            posts.autofocus
            post.image_array.push(`<img class="rounded-2xl my-4" src="${res}">`)
            root_element.removeAttribute('event-source')
            
        },

        compareArray : (arr1,arr2) => {

            if((arr1 == null) || (arr2 == null)){
                
                return null

            }else{

                let res = arr1.filter(element => arr2.includes(element));

                return res.toString()
            }

        },


        extractImage : (param) => {

            // Match all the images
            const regex = /<img[^>]*src="([^"]+)"[^>]*>/g;
            const result = param.match(regex);
            return result;
        },

        //launch the dropzone ui
        launchDropzone : (event) => {
            event.target.setAttribute('event-source','click')
            const dropzone = document.getElementById('dropzone')
            dropzone.classList.remove('hidden')
            dropzone.click(event)
        },

        
        
        //insert [code][/code] tags
        //this tag will br replaced with appropriate <code></code> tags during form submission
        insertCode : (event) => {

            event.target.parentElement.parentElement.querySelector('#text-container').append('[code]    [/code]')
            utils.notifyInfo('Tips','[code] my codes goes here [/code]')

        }
    }

    return {post}
}