import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import PokemonService from "../services/PokemonService";
import axios from "axios";

export const usePokemonStore = defineStore("pokemons", () => {
  const pokemons = ref([]);
  const pokemon = ref({});
  const cantidadPokemons = ref(20);
  const loading = ref(false);
  const typesColor = ref([
    {
      type: "grass",
      color: "bg-lime-700",
    },
    {
      type: "fire",
      color: "bg-red-600",
    },
  ]);

  async function getPokemons() {
    loading.value = true;
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
      console.log(pokemon);
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }


  async function getMorePokemons() {

    cantidadPokemons.value += 20
    try {
      for (let index = cantidadPokemons.value - 20; index < cantidadPokemons.value; index++) {
        const { data } = await PokemonService.obtenerPokemon(index);
        pokemons.value.push(data);
      };
  } catch (error) {
      console.log(error);
  }
  }

  
  return {
    pokemons,
    pokemon,
    loading,
    typesColor,
    getPokemons,
    getPokemon,
    getMorePokemons
  };
});
