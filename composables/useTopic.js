import {useAuthStore} from "~/stores/authStore"
const { utils } = useUtils();

export const useTopic = () => {

    
    const topic = {

        topicRef : ref([]),

        //submit a reply to a topic
        replyTopic : async (event) => {

            if(useAuthStore().user == null) return

            let tex = event.target.parentElement.parentElement.querySelector('#text-container')

            const pattern = /<img|\[code]/

            let post = tex.innerHTML

            //hide the reply box
            event.target.parentElement.parentElement.classList.add('hidden')

            myFetch(`/post`,{
                method: 'post',
                body: {'topic_id' : tex.getAttribute('topic-id'),'category_id' : tex.getAttribute('category-id'),
                       'post_content' : utils.replaceContent(post), 'image' : topic.compareArray(topic.image_array,topic.extractImage(post)),
                       'user_id' : tex.getAttribute('user-id')}
            })
            .then(data => {
                utils.notifySuccess('SUCCESS!','Your Post Was Submitted Successful')
                //reload the page
                utils.reloadPage(`/topic/${useRoute().params.id}`)
                .then(data => topic.topicRef.value = data)
                // myFetch()
                // .then(data => topic.topicRef.value = data)
                
            })
            .catch((err) => {
                console.log(err)
                if(err.length > 0)  utils.notifyFailure('Error','Something Went Wrong While Submitting Your Post. Please Try Again Later')
            })
        },
        //modify a topic
        modifyTopic : (event) => {

            if(useAuthStore().user == null) return

            let tex = event.target.parentElement.parentElement.querySelector('#text-container')

            const post = tex.innerHTML

            //hide the reply box
            event.target.parentElement.parentElement.classList.add('hidden')

            const image = utils.extractAllImage(post)

            myFetch(`/topic`,{
                method: 'put',
                body: {'topic_id' : tex.getAttribute('topic-id'),'post' : utils.replaceContent(post), 'image' : image}
            })
            .then(data => {
                utils.notifySuccess('SUCCESS!','Your Post Was Modified Successful')
                //reload the page
                utils.fetchPage(`/topic/${useRoute().params.id}`)
                
            })
            .catch((err) => {
                console.log(err)
                if(err.length > 0)  utils.notifyFailure('Error','Something Went Wrong While Modifying Your Post. Please Try Again Later')
            })
        },
        //modify a post
        modifyPost : (event) => {

            if(useAuthStore().user == null) return

            let tex = event.target.parentElement.parentElement.querySelector('#text-container')

            const post = tex.innerHTML

            //hide the reply box
            event.target.parentElement.parentElement.classList.add('hidden')

            myFetch(`/post`,{
                method: 'put',
                body: {'post_id' : tex.getAttribute('post-id'),'post_content' : utils.replaceContent(post), 'image' : utils.extractAllImage(post)}
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
        //reply a post
        replyPost : (event) => {

            if(useAuthStore().user == null) return

            let tex = event.target.parentElement.parentElement.querySelector('#text-container')

            const post = tex.innerHTML 

            //hide the reply box
            event.target.parentElement.parentElement.classList.add('hidden')

            myFetch(`/reply`,{
                method: 'post',
                body: {'post_id' : tex.getAttribute('post-id'),'reply_content' : utils.replaceContent(post), 'image' : utils.extractAllImage(post)}
            })
            .then((data) => {

                utils.notifySuccess('SUCCESS!','Your Reply Was Submitted Successful')
                //reload the page
                utils.fetchPage(`/topic/${useRoute().params.id}`)
            })
            .catch((err) => {
                if(err.length > 0) utils.notifyFailure('Error','Something Went Wrong While Submitting Your Reply. Please Try Again Later')
            })
        },

        toggleLikeTopic : (event) => {

            if(useAuthStore().user == null) {

                navigateTo('/login')
                return

            }

            let tex = event.target

            if(tex.classList.contains('bi-heart-fill')){
                
                //subtract like from the clicked post
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
                        //add like to the clicked post
                    utils.addLike(event)
                })
            
            }else{

                //subtract like from the clicked post
                utils.addLike(event)

                myFetch(`/like/topic`,{
                    method: 'post',
                    body: {'topic_id' : tex.getAttribute('topic-id'),'liked_user_id' :tex.getAttribute('liked-user-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','Your liked this post Successful')
                    tex.classList.remove('bi-heart')
                    tex.classList.add('bi-heart-fill')
                    let nextEl = tex.nextElementSibling
                    let addition = parseInt(nextEl.textContent) + 1
                    nextEl.textContent = addition
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong','')
                    //subtract like from the clicked post
                    utils.removeLike(event)
                })
            }
            
        },

        


        toggleLikePost : (event) => {

            if(useAuthStore().user == null) {
    
                navigateTo('/login')
                return
    
            }
    
            let tex = event.target

            if(tex.classList.contains('bi-heart-fill')){

                //remove like from the clicked post
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

                //add like to the clicked post
                utils.addLike(event)

                myFetch(`/like/post`,{
                    method: 'post',
                    body: {'post_id' : tex.getAttribute('post-id'), 'liked_user_id' : tex.getAttribute('liked-user-id')}
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


        

        toggleShareTopic : (event) => {

            if(useAuthStore().user == null) {
    
                navigateTo('/login')
                return
    
            }
    
            let tex = event.target

            if(tex.classList.contains('bi-share-fill')){

                //subtract share from the clicked post
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
                    //add share from the clicked post
                    utils.addShare(event)
                })
            
            }else{

                //add share to the clicked post
                utils.addShare(event)

                myFetch(`/share/topic`,{
                    method: 'post',
                    body: {'topic_id' : tex.getAttribute('topic-id'), 'shared_user_id' : tex.getAttribute('shared-user-id')}
                })
                .then(data => {
                    utils.notifySuccess('SUCCESS!','Share Received')
                })
                .catch((err) => {
                    utils.notifyFailure('something went wrong','')
                    //subtract share from the clicked post
                    utils.removeShare(event)
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
                    body: {'post_id' : tex.getAttribute('post-id'), 'shared_user_id' : tex.getAttribute('shared-user-id')}
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

                myFetch(`/share/post`,{
                    method: 'post',
                    body: {'post_id' : tex.getAttribute('post-id'), 'shared_user_id' : tex.getAttribute('shared-user-id')}
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
        
        //adds new image or return original result
        compareNewImage : (arr1,arr2) => {

            let arr = arr2

            if(arr == null){

                if(arr1 == null){
                    return null
                }else{

                    return arr1
                }
            }else{

                if(arr1 == null){

                    return arr
                
                }else{

                    return [...arr1,...arr]
                }
            }
        },

        //create an image element and set the src attribute to the dropzone response
        //append this created file to the text conatiner
        //keep track of the uploaded images by pushing it to an array
        //this array will be compared during form submission to know which images was removed by the user if any
        appendDropzoneImage : (res) => {

            let img = document.createElement('img')
            img.setAttribute('class','rounded-2xl my-4') 
            img.src = res 
            let root_element = document.querySelector('[event-source="click"]')
            let post = root_element.parentElement.parentElement.querySelector('#text-container')
            post.appendChild(img)
            post.autofocus
            topic.image_array.push(`<img class="rounded-2xl my-4" src="${res}">`)
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
            return result
        },
        // extractAllImage : (param) => {

        //     // Match all the images
        //     const regex = /<img[^>]*src="([^"]+)"[^>]*>/g;
        //     const result = param.match(regex);
        //     return result.toString()
        // },

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

    return {topic}
}