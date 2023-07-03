<script setup>
    defineProps({
        text: {
            type: String,
            required: true
        }
    })
</script>


<template>
     <router-link active-class="text-blue-600" :to="{name: text}">
        <slot />
     </router-link>
</template>