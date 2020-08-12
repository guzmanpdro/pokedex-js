const pokedex = document.querySelector('#pokedex-content')
const form = document.querySelector('#form-pokedex')

form.onsubmit = (e) => {
  e.preventDefault()
  const pokemon = document.querySelector('#pokemon')
  let pokemonValue = pokemon.value
  init(`${pokemonValue}`)
  pokemon.value = ''
}

function init(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then((response) => response.json())
    .then((pokemon) => {
      let propertiesPokemon = {
        name: pokemon.name,
        img: pokemon.sprites.front_default,
        type: pokemon.types.map(type => type.type.name).join(', '),
        }
      renderPokemon(propertiesPokemon)
    })
  .catch(() => {
    const messageError = `<p>Pokémon no encontrado</p>`
    pokedex.innerHTML = messageError
  })
}

function renderPokemon(objPokemon) {
  const templatePokemon = `
    <h2>${objPokemon.name}</h2>
    <img src="${objPokemon.img}" alt="Imagen Pokemon ${pokemon.name}" />
    <p>Type: ${objPokemon.type}</p>
  `
  pokedex.innerHTML = templatePokemon
}

init(25)