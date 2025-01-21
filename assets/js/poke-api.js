

const PokeAPI = {}


function convertPokeAPIDetailToPOkemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.id = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.sprite = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.types = pokeDetail.types.map((typeSlot) =>typeSlot.type.name);
    pokemon.type = pokemon.types[0]

    
    return pokemon
}

PokeAPI.getPokeDetail = (pokemon)=>{
   return fetch(pokemon.url)
   .then((response) =>  response.json())
   .then(convertPokeAPIDetailToPOkemon)
}


PokeAPI.getPokemons = (offset, limit) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`



// Promessa de uma resposta
// FUNCIONA COMO UM BLOCO TRY CATCH e FINALLY
   return fetch(url)
    .then ((response) => response.json())
    .then ((jsonBody)=> jsonBody.results)
    .then ((pokemons) => pokemons.map(PokeAPI.getPokeDetail))
    .then ((detailRequest)=> Promise.all(detailRequest))
    .then ((pokemonDetails)=>pokemonDetails)
} 
