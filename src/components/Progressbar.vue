<script setup>
import {computed} from 'vue'
   const props = defineProps({
        stats: {
            type: Object,
            required: true
        }
    })

    const colorbar = computed(() => {
        if(props.stats.base_stat < 50) {
            return 'bg-red-400'
        }else{
            return 'bg-green-400'
        }
    })
</script>

<template>
    <p class="text-gray-500">{{ stats.stat.name }}</p>
    <p class="text-right mr-2">{{ stats.base_stat }}</p>
    <div class="w-full bg-gray-200 rounded-full h-2.5 flex">
        <div class="h-2.5 rounded-full" :class="colorbar" :style="`width: ${stats.base_stat}%`"></div>
    </div>
</template>