<script setup>
    import Dropzone from "dropzone";

    const hideDropzone = (event) => {

        event.target.parentElement.classList.add('hidden')

    }

    onMounted(() => {

        //instantiate dropzone and bind it to the dropzone form
        let dropzone = new Dropzone("#dropzone",
        {
            resizeHeight: 800,
            resizeQuality: 0.7,
            resizeMethod: 'contain',
            headers: {'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('TOKEN'))}`},
        });

        //on successful upload of file
        //hide the dropzone form
        //emit response with the close event
        dropzone.on("success", function(file) {
            dropzone.removeFile(file);
            document.getElementById('dropzone').classList.add('hidden')
        });


    })
</script>
<template>
    <div class="fixed top-[40vh] w-[95vw] md:w-[45vw]">
        <form :action="`${useRuntimeConfig().public.baseURL}/user/my-profile/image`" method="post" class="dropzone hidden relative mx-auto bg-primary my-4 dark:text-white" id="dropzone">
            <i @click="hideDropzone" class="cursor-pointer bi bi-x bg-rose-500 text-white absolute right-0 md:right-0 p-1 rounded top-0"></i>
        </form>
    </div>
</template>