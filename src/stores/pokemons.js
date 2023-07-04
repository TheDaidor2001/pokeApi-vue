import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import PokemonService from "../services/PokemonService";
import axios from "axios";

export const usePokemonStore = defineStore("pokemons", () => {
  const pokemons = ref([]);
  const pokemon = ref({});
  const cantidadPokemons = ref(20);
  const loading = ref(false);
  const favoritos = ref([]);

  async function getPokemons() {
    loading.value = true;
    pokemons.value = [];
    try {
      for (let index = 1; index < 20; index++) {
        const { data } = await PokemonService.obtenerPokemon(index);
        pokemons.value.push(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  async function getPokemon(id) {
    loading.value = true;
    try {
      const { data } = await PokemonService.obtenerPokemon(id);
      pokemon.value = data;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  async function getMorePokemons() {
    cantidadPokemons.value += 20;
    try {
      for (
        let index = cantidadPokemons.value - 20;
        index < cantidadPokemons.value;
        index++
      ) {
        const { data } = await PokemonService.obtenerPokemon(index);
        pokemons.value.push(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function favoritosPoke(poke, id) {
    
    favoritos.value.push({
      ...poke
    });

    console.log(favoritos.value);
  }

  return {
    pokemons,
    pokemon,
    loading,
    getPokemons,
    getPokemon,
    getMorePokemons,
    favoritosPoke
  };
});
