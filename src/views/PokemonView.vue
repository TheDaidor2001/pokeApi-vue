<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '../stores/pokemons';

import ArrowIcon from '../components/icons/ArrowIcon.vue'
import Hearticon from '../components/icons/HeartIcon.vue'
import PokemonService from '../services/PokemonService';
import ProgressBar from '../components/Progressbar.vue'

const route = useRoute()
const pokemons = usePokemonStore()
const pokemon = ref({})
const especies = ref({})
const tabs = ref('tab-2')

const colorPokemon = ref('')
const imagenPokemon = ref('')


onMounted(async () => {
    await pokemons.getPokemon(route.params.id);
    colorPokemon.value = pokemons.pokemon.types[0].type.name
    imagenPokemon.value = pokemons.pokemon.sprites.other.dream_world.front_default
    pokemon.value = pokemons.pokemon

    PokemonService.obtenerEspecie(route.params.id)
        .then(({ data }) => especies.value = data)
        .catch(e => console.log(e))

})


function isActive(tab) {
    tabs.value = tab
}

</script>

<template>
    <main :class="colorPokemon" class="h-screen overflow-hidden">
        <p v-if="pokemons.loading">Loading...</p>
        <header v-else class="py-10 px-5 relative">
            <nav class="flex justify-between items-center">
                <RouterLink :to="{ name: 'home' }">
                    <ArrowIcon />
                </RouterLink>
                <Hearticon />
            </nav>
            <h1 class="text-3xl mt-5 capitalize text-white font-bold">{{ pokemons.pokemon.name }}</h1>
            <div class="flex w-1/3 gap-3 mt-3 mb-32">
                <p v-for="item in pokemon.types" class="bg-white rounded-lg text-center py-1 px-3 capitalize"><span class="opacity-100">{{ item.type.name
                }}</span></p>
                
            </div>
            <div class="flex items-center justify-center">
                <img class="w-60 absolute" :src="imagenPokemon" :alt="`Image del pokemon ${pokemons.pokemon.name}`">
            </div>
        </header>

        <section class="bg-white rounded-t-3xl mt-12 px-5 py-24 transition-all h-screen">
            <nav class="flex justify-between">
                <button type="button" class="text-gray-500"
                    :class="[tabs === 'tab-1' && 'text-gray-800 border-b-2 border-blue-500']" @click="isActive('tab-1')">
                    Info
                </button>
                <button type="button" class="text-gray-500"
                    :class="[tabs === 'tab-2' && 'text-gray-800 border-b-2 border-blue-500']" @click="isActive('tab-2')">
                    Stats iniciales
                </button>
                <button type="button" class="text-gray-500">
                    Evoluciones
                </button>
                <button type="button" class="text-gray-500">
                    Movimientos
                </button>
            </nav>
            <div class="mt-10">
                <div v-if="tabs === 'tab-1'">
                    <div class="flex gap-8 mt-6 mb-2">
                        <p class="text-gray-500">Height</p>
                        <p class="text-gray-800">{{ pokemon.height }} meters</p>
                    </div>
                    <div class="flex gap-8">
                        <p class="text-gray-500">Weight</p>
                        <p class="text-gray-800">{{ pokemon.weight }} kg</p>
                    </div>
                    <div class="flex gap-4">
                        <p class="text-gray-500">Abilities</p>
                        <p v-for="item in pokemon.abilities">{{ item.ability.name }},</p>
                    </div>
                    <h5 class="text-black font-semibold mt-5">Breading</h5>
                    <div class="flex gap-4">
                        <p class="text-gray-500">Egg Groups</p>
                        <p v-for="item in especies.egg_groups">{{ item.name }},</p>
                    </div>
                </div>
                <div v-if="tabs === 'tab-2'">
                    <h5 class="text-black font-semibold mt-5">Stats</h5>
                    <div class="grid grid-cols-3 items-center "  v-for="item in pokemon.stats">
                        <ProgressBar 
                            :stats="item"
                        />
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>