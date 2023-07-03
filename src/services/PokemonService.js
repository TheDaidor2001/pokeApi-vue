import api from "../lib/axios";


export default {
    obtenerPokemons(cantidad) {
        return api.get(`/pokemon?offset=${cantidad}&limit=20`)
    },
    obtenerPokemon(id) {
        return api.get(`pokemon/${id}`)
    },
    obtenerEspecie(id) {
        return api.get(`pokemon-species/${id}`)
    }
}