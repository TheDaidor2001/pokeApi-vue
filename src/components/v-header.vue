<script setup>
import RouterLink from './RouterLink.vue';
</script>

<template>
    <header class="p-5">
        <div class="flex justify-between items-center">
            <img src="/pokemon.png" alt="Logo de pokemon" class="w-40">
            <nav class="flex gap-5 uppercase">
               <RouterLink text="home">Inicio</RouterLink>
            </nav>
        </div>
    </header>
</template>