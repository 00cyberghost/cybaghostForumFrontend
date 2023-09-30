<script setup>
import Loading from 'vue-loading-overlay';
//import 'vue-loading-overlay/dist/css/index.css';
defineProps({
    isLoading : null
})


</script>
<template>
    <loading :active="isLoading"
    class="w-16 mx-auto"
    :can-cancel="true"
    :loader="'spinner'"
    :is-full-page="false"/>
</template>