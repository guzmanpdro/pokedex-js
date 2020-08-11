const pokedex = document.querySelector('#pokedex-content')
const form = document.querySelector('#form-pokedex')

form.onsubmit = (e) => {
  e.preventDefault()
  const pokemon = document.querySelector('#pokemon')
  let pokemonValue = pokemon.value
  if (pokemonValue !== '') {
    init(`https://pokeapi.co/api/v2/pokemon/${pokemonValue}`)
    pokemon.value = ''
  } else {
    alert('Debes rellenar el formulario')
    return false
  }
}

function init(url) {
  const req = new XMLHttpRequest()
  req.open('GET', url, true)
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        let res = JSON.parse(req.responseText)
        let pokemon = {
          name: res.name,
          img: res.sprites.front_default,
          type: res.types.map(type => type.type.name).join(', '),
        }
        renderPokemon(pokemon)
      } else {
        alert(`Pokémon no registrado en la pokédex`)
      }
    }
  }
  req.send(null)
}

init('https://pokeapi.co/api/v2/pokemon/25')


function renderPokemon(pokemon) {
  const templatePokemon = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.img}" alt="Imagen Pokemon ${pokemon.name}" />
    <p>Type: ${pokemon.type}</p>
  `
  pokedex.innerHTML = templatePokemon
}