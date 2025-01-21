
const pokemonList = document.getElementById("pokemonList")
const loadButton = document.getElementById("loadButton")


// Limite de pokemon carregados por página
const limit = 10

// ID inicial do pokemon
let offset = 0;

// Determina a quantidade de pokemon que serão carregados
const maxRecords = 151




  
function loadPokemonItems(offset, limit) {
    PokeAPI.getPokemons(offset, limit).then( (pokemons = [])=>{
        const newHtml = pokemons.map((pokemon)=>
            `
            <li class="pokemon ${pokemon.type}">
                <span class ="number">#${pokemon.id}</span>
                <span class ="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type)=> `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src=${pokemon.sprite}
                    // alt="${pokemon.name}">
                </div>
            </li>
            `).join('')
        pokemonList.innerHTML += newHtml

        })
}    

loadPokemonItems(offset,limit)
loadButton.addEventListener("click",()=>{
    offset += limit
    const qtRecord = offset+limit

    if (qtRecord >= maxRecords) {
        const newLimit= maxRecords-offset
        loadPokemonItems(offset,newLimit)
        

        loadButton.parentElement.removeChild(loadButton)
    }
    else{
        loadPokemonItems(offset,limit)
    }
    })
