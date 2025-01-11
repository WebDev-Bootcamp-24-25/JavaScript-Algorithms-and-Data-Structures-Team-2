const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const clearButton = document.getElementById("clear-button");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const pokename = document.getElementById("pokemon-name");
const pokeid = document.getElementById("pokemon-id");
const pokeweight = document.getElementById("weight");
const pokeheight = document.getElementById("height");
const poketypes = document.getElementById("types");
const pokesprite = document.getElementById("pokemon-sprite");

function setInfo(pname, pid, pweight, pheight, ptypes, psprite) {
  pokename.textContent = pname;
  pokeid.textContent = pid;
  pokeweight.textContent = pweight;
  pokeheight.textContent = pheight;
  poketypes.innerHTML = ptypes;
  pokesprite.innerHTML = psprite;
}

function setStats(vhp, vattack, vdefense, vspattack, vspdefense, vspeed) {
    hp.textContent = vhp;
    attack.textContent = vattack;
    defense.textContent = vdefense;
    specialAttack.textContent = vspattack;
    specialDefense.textContent = vspdefense;
    speed.textContent = vspeed;
}

// Function to fetch and display Pokémon data
const getPokemonData = async () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (!searchTerm) {
    alert("Please enter a Pokémon name or ID.");
    return;
  }

  try {
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchTerm}`);
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const data = await response.json();

    // Set Pokémon information
    const typeElements = data.types
      .map(
        (type) =>
          `<div class="type ${type.type.name}">${type.type.name.toUpperCase()}</div>`
      )
      .join("");
    const spriteElement = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} sprite" />`;
    setInfo(
      data.name.toUpperCase(),
      data.id,
      data.weight,
      data.height,
      typeElements,
      spriteElement
    );

    // Set Pokémon stats
    setStats(
      data.stats[0].base_stat,
      data.stats[1].base_stat,
      data.stats[2].base_stat,
      data.stats[3].base_stat,
      data.stats[4].base_stat,
      data.stats[5].base_stat
    );
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

// Add event listener to search button
searchButton.addEventListener("click", getPokemonData);

// Add event listener to clear button
clearButton.addEventListener("click", () => {
    setInfo("", "", "", "", "", "");
    setStats("", "", "", "", "", "");
    searchInput.value = "";
    searchInput.focus();
});