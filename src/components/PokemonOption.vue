<template lang="">
    <div>
       <div  class="options-container">
          <!-- <ul :disabled="blocked"> -->
          <ul>
            <!-- <li v-for="(pokemon, index) in pokemonArr" :key="pokemon.id" @click="$emit('nombreDelEventoQuequieroDisparar')"> -->
            <li  v-for="(pokemon, index) in pokemonArr" :key="pokemon.id" @click="$emit('selection', pokemon.id)">
              <span>
              {{capitalizeFirstLetter(pokemon.name) }}
              </span>
            </li>
          </ul>
       </div>
    </div>
</template>
<script>
export default {
  props: {
    pokemonArr: {
      type: Array,
      required: true,
      default: [],
    },
    blocked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isDisabled: this.blocked,
    };
  },
  name: "PokemonOption",
  methods: {
    capitalizeFirstLetter(pokemon = "") {
      // console.log(pokemon);
      pokemon = pokemon.trim();
      pokemon = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
      return pokemon;
    },
    hola() {
      // this.$emit(event, ${[…args]})
    },
  },
};
</script>
<style scoped>
ul {
  list-style-type: none;
}
li {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  justify-content: center;
}
</style>