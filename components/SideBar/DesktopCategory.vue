<script setup>

defineProps({
    categories : Object
})


    
    
    

</script>
<template>
    <div class="dark:text-white h-screen left-scrollbar fixed overflow-y-auto w-[23%]">
        <ul class="flex flex-col gap-y-4 relative mt-7" v-if="categories">
            <li class="p-4 w-[90%] mx-auto dark:text-white" :class="{'bg-primary text-white rounded-2xl dark:bg-black' : $route.path == '/'}"><NuxtLink to="/"><span class="ml-5">Home</span></NuxtLink></li>
            <li class="p-4 w-[90%] mx-auto dark:text-white" :class="{'bg-primary text-white rounded-2xl dark:bg-black' : $route.path == `/category/${category.name}`}" v-for="category in categories" :key="category"><NuxtLink :to="`/category/${category.name}`"><span class="ml-5">{{ category.name }}</span></NuxtLink></li>
        
            
        </ul>
    </div>
</template>
<style scoped>
li:last-child{
    margin-bottom: 3rem;
}
</style>