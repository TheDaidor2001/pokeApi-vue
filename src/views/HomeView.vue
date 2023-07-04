<script setup>
import { onMounted, ref } from 'vue';
import { usePokemonStore } from '../stores/pokemons';
import { computed } from 'vue';
import PokemonCard from '../components/pokemonCard.vue';
import Header from '../components/v-header.vue';
import PokemonService from '../services/PokemonService';

import LoadingComponent from '../components/LoadingComponent.vue'

const pokemons = usePokemonStore()

const result = ref({})


const types = (i) => {
  return pokemons.pokemons[i].types
}


onMounted(() => {
  pokemons.getPokemons()

  PokemonService.obtenerPokemons('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
  .then(({data}) => {
    result.value = data;
  })
})

 
</script>

<template>
  <Header />
  <main class="mt-10 px-10 xl:p-0">
    <section class="container mx-auto">
      <h1 class="text-4xl font-bold text-gray-900">Pokedex</h1>

      <LoadingComponent v-if="pokemons.loading"/>
      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10 ">
          <PokemonCard v-for="pokemon in pokemons.pokemons" :key="pokemon.id" :pokemon="pokemon" />
        </div>
  
        <button 
          type="button"
          class="w-full bg-indigo-500 mb-10 py-3 text-white text-lg rounded-md hover:bg-indigo-600 transition-colors"
          @click="pokemons.getMorePokemons()"
        >
          Ver Más
      </button>
      </div>
    </section>
  </main>
</template>
