<script setup>
import { usePokemonStore } from '../stores/pokemons';
defineProps({
    pokemon: {
        type: Object,
        required: true
    }
})

const pokemons = usePokemonStore()

</script>

<template>
        <RouterLink :to="{name: 'pokemons', params: {id: pokemon.id}}">
            <div :class="pokemon.types[0].type.name" class=" relative px-4 py-10 flex justify-between rounded-lg min-h-full overflow-hidden">
                <div class="">
                    <h4 class="text-white font-bold text-2xl mb-3">{{ pokemon.name }}</h4>
                    <p v-for="item in pokemon.types" class="bg-white rounded-lg text-center py-1 mb-2"><span class="opacity-100">{{ item.type.name
                    }}</span></p>
                    
                </div>
                <img class="w-40 h-auto absolute top-0 -right-0 over" :src="pokemon.sprites.other.dream_world.front_default"
                    :alt="`Image of ${pokemon.name}`">
            </div>
        </RouterLink>
</template>
