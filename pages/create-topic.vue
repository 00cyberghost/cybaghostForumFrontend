<script setup>
    // import { useMyStore } from "~/stores/myStore"
    import {useAuthStore} from "~/stores/authStore"
    
    definePageMeta({
        middleware: ["auth"]
    })

    const { utils } = useUtils()

    const categories = ref(null)
    const isLoading = ref(true)

    let errors = ref([])
    
    myFetch('/category')
    .then(data => categories.value = data)
    .finally(() => isLoading.value = false)

    const form = {
        'title' : '',
        'post' : '',
        'category_id' : null,
        'image' : null
    }

    

    //create topic
    const create = async (event) => {

        const rootElement = event.target.parentElement.parentElement

        const post = rootElement.querySelector('#post').innerHTML
              
        form.category_id = rootElement.querySelector('#category').value
        form.post = utils.replaceContent(post)
        form.image = utils.extractAllImage(post)

        isLoading.value = true

        myFetch('/topic',{
            method : 'post',
            body : form
        })
        .then((data) => {
            navigateTo('/dashboard/topics')
        })
        .catch((error) => {
            console.log(error.data)
            errors.value = error.data
        })
    }
    
    //launch the dropzone ui
    const launchDropzone = (event) => {
        const dropzone = document.getElementById('dropzone')
        dropzone.classList.remove('hidden')
        dropzone.click()
    }

    const hideDropzone = (event) => {

        event.target.parentElement.parentElement.classList.add('hidden')
    }

    

    //create an image element and set the src attribute the the dropzone response
    //append this created file to the text div
    //keep track of the uploaded images by pushing it to an array
    //this array will be compared during form submission to know which images was removed by the user if any
    const appendDropzoneImage = (res) => {

        let img = document.createElement('img')
        img.setAttribute('class','rounded-2xl my-4') 
        img.src = res 
        let post = document.getElementById('post')
        post.appendChild(img)
        post.autofocus
    }



    
    
    //insert [code][/code] tags
    //this tag will br replaced with appropriate <code></code> tags during form submission
    const insertCode = (event) => {

        event.target.parentElement.parentElement.querySelector('#post').append('[code]    [/code]')
        utils.notifyInfo('Tips','[code] my codes goes here [/code]')

    }


</script>

<template>
  
   

    <div class="container w-full mx-auto">

        <Loader :isLoading="isLoading" />

        <div class="fixed top-56 z-10 w-full" id="uploadContainer">
            <div class="relative">
                
                <Dropzone @close="appendDropzoneImage" />
            </div>
        </div>
        
        <div class="relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-center bg-cover min-h-50-screen rounded-xl bg-[url(/img/curved8.jpg)]">
            <span class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-60"></span>
            <div class="container z-10">
                <div class="flex flex-wrap justify-center -mx-3">
                <div class="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                    <h1 class="mt-12 mb-2 text-white">Welcome!</h1>
                    <p class="text-white">We are happy that you want to join us. kindly feel the form below</p>
                </div>
                </div>
            </div>
        </div>
        
        <div class="flex flex-wrap mb-5 -mt-48 md:-mt-56 lg:-mt-48">
            <div class="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-4/5">
                <div class="relative md:w-full z-0 flex flex-col min-w-0 break-words bg-white dark:bg-darkness-200 border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                   
                    <div class="flex-auto p-6">
                    <form role="form text-left" @submit.prevent="create">

                        <div class="mt-5">
                            <select  placeholder="Category" class="bg-transparent dark:text-white dark:bg-black w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" required id="category"  aria-label="category">
                                <option value="" selected disabled>Select Category</option>
                                <option v-for="category in categories" :key="category" :value="category.id">{{ category.name }}</option>
                            </select>
                            <div v-if="errors.category" class="text-red-600 text-center w-full ">{{ errors.category.message }}</div>
                        </div>
                        
                        <div class="mt-5">
                            <input v-model="form.title" class="bg-transparent capitalize dark:text-white w-full px-5 h-12  py-1 outline-none border-b-2 border-rose-500" id="title" name="title" type="text" required placeholder="Subject" aria-label="subject">
                            <div v-if="errors.title" class="text-red-600 text-center w-full ">{{ errors.title.message }}</div>
                        </div>


                        <div class="mt-5">
                            <div role="textbox"  contentEditable="true" class="bg-transparent focus:min-h-[30vh] dark:text-white w-full px-5  py-1 outline-none border-0" id="post" name="post" placeholder="Type Something Interesting" required aria-label="Type something interesting">
                                Type something here....
                            </div>
                           
                            <div class="mt-5">
                                <span @click="launchDropzone" class="cursor-pointer mt-5 inline-block p-1 px-2 rounded text-white text-xs bg-primary">Add Image</span> <span @click="insertCode" class="cursor-pointer mt-5 inline-block p-1 px-2 rounded text-white text-xs bg-primary"><i class="bi bi-code"></i> code</span>
                            </div>
                            <div v-if="errors.post" class="text-red-600 text-center w-full ">{{ errors.post.message }}</div>
                        </div>
                        <div class="text-center">
                        <button id="create-button" type="submit" class="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-primary hover:border-rose-700 hover:bg-fuchsia-700 hover:text-white">Upload</button>
                        </div>
                        
                    </form>

                   
                    
                    </div>
                </div>
            </div>
        </div>
    </div>

    

   
</template>







