import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'
import {useAuthStore} from "~/stores/authStore"
import {formatTimeAgo} from '@vueuse/core'

export const useUtils = () => {

    

    //dark mode handler
    const mode = {

        isDark: 'light',

        toggleMode: () => {
        
            let item = localStorage.getItem('theme')
            
            if(item == 'dark') {
                
                document.documentElement.classList.add('dark')
                mode.isDark = 'dark'
    
            }else{
    
                document.documentElement.classList.remove('dark')
            }
        },

        tmode: () => {

            let item = localStorage.getItem('theme')
            if(item == 'dark') {
                
                mode.lightMode()
                mode.isDark = 'light'
        
            }else{
        
                mode.darkMode()
                mode.isDark = 'dark'
            }
        },
        
        lightMode: () => {
            localStorage.removeItem('theme')
            document.documentElement.classList.remove('dark')   
        },
        darkMode: () => {
            localStorage.setItem('theme','dark')
            document.documentElement.classList.add('dark')
        }
    }

    const utils = {
        refs: ref(),

        goBack: () => {
            
            return history.back()
        },
        toggleTextarea: (event: any) => {

            if(useAuthStore().user == null) return

            const root = event.target.parentElement.parentElement.nextElementSibling
            root.classList.remove('hidden')
            root.firstChild.focus()
            root.querySelector('.modify').classList.add('hidden')
            
            root.querySelector('.send').classList.remove('hidden')
        },
        modifyTextarea: (event: any) => {

            const root = event.target.parentElement.parentElement.parentElement.parentElement.parentElement

            root.querySelector('.cont').classList.remove('hidden')

            let content = root.querySelector('.text-content').innerHTML

            let text_container = root.querySelector('#text-container')

            const pattern = /<img|\[code]/

            if(content.match(pattern) == null){

                let a = content.replaceAll('<div>','')

                let b = a.replaceAll('</div>','')
                
                let c = content.replaceAll('<div class="replace-content"><code><pre>','[code]<br>')
                
                let d = c.replaceAll('</pre></code></div>','[/code]')

                text_container.innerHTML = d

            }else{

               text_container.innerHTML = content
            } 

            

            root.querySelector('.modify').classList.remove('hidden')
            
            root.querySelector('.send').classList.add('hidden')
        },
        profileTab: (event: any) => {
            let ev = event.target
            ev.parentElement.parentElement.querySelector('.bg-primary').classList.remove('bg-primary')
            ev.classList.add('bg-primary')

            let el = document.documentElement.querySelectorAll('.t-tabs')
            

           

            el.forEach(element => {
                element.classList.add('hidden')

                if(element.getAttribute('id') == ev.getAttribute('target')) element.classList.remove('hidden')
            });

           
            
        },
        hideTextarea: (event: any) => {

            // let el = event.target
            // el.parentElement.classList.add('hidden')
        },
        ConfirmPassword : (event: any,password :any) => {

            if(password != event.target.value){
        
                event.target.nextElementSibling.textContent = 'Passwords do not match'
        
            }else{
        
                event.target.nextElementSibling.textContent = ''
        
            }
        
        },
        removeError: (event: any) => {
            event.target.nextElementSibling.textContent = ''
        },
        fetchPage: async (url : String) => {
            myFetch(url)
            .then(data => utils.refs.value = data)
            .catch(err =>  utils.notifyFailure('Could not referesh page','Something went wrong. Try again later'))
        },
        reloadPage: async (url : String) => {
            
            return await myFetch(url)
        },

        notifySuccess: (title : any,message : any) => {

            new Notify ({
            status: 'success',
            title: title,
            text: message,
            effect: 'slide',
            speed: 300,
            customClass: '',
            customIcon: '',
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: 5000,
            gap: 20,
            distance: 20,
            type: 1,
            position: 'right top'
            })
        },
        notifyFailure: (title : any,message : any) => {

            new Notify ({
            status: 'error',
            title: title,
            text: message,
            effect: 'slide',
            speed: 300,
            customClass: '',
            customIcon: '',
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: 5000,
            gap: 20,
            distance: 20,
            type: 1,
            position: 'right top'
            })
        },
        notifyInfo: (title : any,message : any) => {

            new Notify ({
            status: 'info',
            title: title,
            text: message,
            effect: 'slide',
            speed: 300,
            customClass: '',
            customIcon: '',
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: 20000,
            gap: 20,
            distance: 20,
            type: 1,
            position: 'top x-center'
            })
        },

        notifyView: (title : any,message : any) => {

            new Notify ({
            status: 'info' ,
            title: title,
            text: message,
            effect: 'fade',
            speed: 3000,
            customClass: '',
            customIcon: '',
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: 7000,
            gap: 20,
            distance: 20,
            type: 1,
            position: 'bottom x-center'
            })
        },
        
        //returns the first url in the image name string
        //returns sample image if the image string is null
        topicImage: (image_name: any) => {

            if((image_name == null) || (image_name.length < 1)){

                return useAuthStore().image_url + '/sample.jpg'
            
            }else{

                let result = image_name.split()

                return result[0].slice(result[0].indexOf("src")).split('"')[1]
            }
        },

        //returns the first url in the image name string
        //returns sample image if the image string is null
        topicContent: (content: any) => {

            if(content.includes('img')){

                let decode = utils.decodeHtml(content)

                const regex = /<img[^>]*src="([^"]+)"[^>]*>/g;
                
                let res = decode.replaceAll(regex,'')

                let result = res.replaceAll('<br>','')

                //let result = content.slice(300)

                if(result.length > 300){

                    let r = result.slice(0,300) + '...'

                    return utils.decodeHtml(r)
                }else{

                    return utils.decodeHtml(result)
                }
                
            
            }else{

                if(content.length > 300){

                    let r = content.slice(0,300) + '...'

                    return utils.decodeHtml(r)
                }else{

                    return utils.decodeHtml(content)
                }
            }
        },
        //returns the first url in the image name string
        //returns sample image if the image string is null
        topicContentCard: (content: any) => {

            if(content.includes('img')){

                let decode = utils.decodeHtml(content)

                const regex = /<img[^>]*src="([^"]+)"[^>]*>/g;
                
                let res = decode.replaceAll(regex,'')

                let result = res.replaceAll('<br>','')

                //let result = content.slice(130)

                if(result.length > 150){

                    let r = result.slice(0,150) + '...'
                    return utils.decodeHtml(r)
                }else{

                    return utils.decodeHtml(result)
                }
                
            
            }else{

                if(content.length > 150){

                    let r = content.slice(0,150) + '...'

                    return utils.decodeHtml(r)
                }else{

                    return utils.decodeHtml(content)
                }
            }
        },
        //extracts and returns the first image name
        extractImage: (content: any) => {

            let contents = utils.decodeHtml(content)

            if(contents.includes('<img')){

                const regex = /<img[^>]*src="([^"]+)"[^>]*>/g;
                
                let result = contents.replaceAll(regex,'')

                return result[0]
                
            
            }else{

                return useAuthStore().image_url + '/sample.jpg'
            }
        },
        //extracts and returns the first image name
        extractAllImage: (image: any) => {
            
            //first decode the content to remove any html special chars
            let decoded = utils.decodeHtml(image)

            // Match all the images
            const regex = /<img[^>]*src="([^"]+)"[^>]*>/g;
            
            const found = decoded.match(regex);

            const result = found.length < 1 ?  null : found.toString()

            return result
        },
        userImage : (image : String) => {

            const result = image == null ? useAuthStore().image_url + '/user_sample.jpg' : image
            

            return result
        },
        userImage2 : (image : String) => {

            const result = image == null ? useRuntimeConfig().public.baseURL.replaceAll('api/v1','/images/') + '/user_sample.jpg' : image

            return result
        },
        topicSlug : (topic : String) => {

            let text = topic.replaceAll('/','-')

            let result = text.replaceAll(' ','-')

            return result
        },
        formatTime : (databaseTime: any) => {
            const timeAgo = formatTimeAgo(new Date(databaseTime))
            return timeAgo
        },
        replaceContent : (contentdd: any) => {

            let q = contentdd
            
            if(q.includes('[code]') == true){

                let a = contentdd.replaceAll('<div>','')

                let b = a.replaceAll('</div>','')
                
                let c = b.replaceAll('[code]','<div class="replace-content"><code><pre>')
                
                let d = c.replaceAll('[/code]','</pre></code></div>')

                let e = d.replace(/(?:\r\n|\r|\n)/g, '<br>');

                let doc = document.createElement('textarea')

                doc.innerHTML = e

                return doc.value
            
            }else{


                let a = contentdd.replaceAll('<div>','')

                let b = a.replaceAll('</div>','')

                let e = b.replace(/(?:\r\n|\r|\n)/g, '<br>');

                let doc = document.createElement('textarea')

                doc.innerHTML = e

                return doc.value

                //return contentdd

                
            }
        },
        browserNotify : (title: any, message : any) => {
            
            if(Notification.permission == 'granted'){

                if(document.visibilityState == 'hidden'){

                    const notification = new Notification(title,{
                        body : message,
                        tag : "offline Notification"
                    })
    
                    notification.addEventListener('click',() => {
    
                        navigateTo('/notifications')
                    })
                }
            }
            
        },
        removeLike: async (event: any) => {
            
            let tex = event.target
            tex.classList.remove('bi-heart-fill')
            tex.classList.add('bi-heart')
            let nextEl = tex.nextElementSibling
            let subtraction = nextEl.textContent - 1
            nextEl.textContent = subtraction
        },
        addLike: async (event: any) => {
            
            let tex = event.target
            tex.classList.remove('bi-heart')
            tex.classList.add('bi-heart-fill')
            let nextEl = tex.nextElementSibling
            let addition = parseInt(nextEl.textContent) + 1
            nextEl.textContent = addition
        },
        addShare: async (event: any) => {
            
            let tex = event.target
            tex.classList.remove('bi-share')
            tex.classList.add('bi-share-fill')
            let nextEl = tex.nextElementSibling
            let addition = parseInt(nextEl.textContent) + 1
            nextEl.textContent = addition
        },
        removeShare: async (event: any) => {
            
            let tex = event.target
            tex.classList.remove('bi-share-fill')
            tex.classList.add('bi-share')
            let nextEl = tex.nextElementSibling
            let subtraction = nextEl.textContent - 1
            nextEl.textContent = subtraction
        },
        decodeHtml: (texts: any) => {

            let doc = document.createElement('textarea')

            doc.innerHTML = texts

            return doc.value
            
        }
        

        
    }


    return {
        mode,utils
    };
}