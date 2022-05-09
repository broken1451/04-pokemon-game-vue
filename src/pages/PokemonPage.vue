<template>
  <div>
    <h1>Quien es este Pokemon?</h1>
    <!-- <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-if="pokemon">
      <PokemonPicture :pokemonId="pokemon.id" :showPokemon="true" />
    </div> -->

    <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-else>
      <i id="1" style="font-size: 24px; margin-left: 5px" class="fa color"
        >&#xf004;</i
      >
      <i id="2" style="font-size: 24px; margin-left: 5px" class="fa color"
        >&#xf004;</i
      >
      <i id="3" style="font-size: 24px; margin-left: 5px" class="fa color"
        >&#xf004;</i
      >

      <span class="scored"> Scored: {{ scored }}</span>
      <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    </div>

    <!-- opciones -->
    <PokemonOption
      :blocked="blocked"
      :pokemonArr="pokemonArr"
      @selection="checkAnswer($event)"
    />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button type="button" @click="newGame()">Nuevo Juego</button>
    </template>
  </div>
</template>
<script>
import PokemonOption from "../components/PokemonOption";
import PokemonPicture from "../components/PokemonPicture";
import getPokemonsOptions from "../helper/getPokemonOptions";
import Swal from "sweetalert2";

// console.log(getPokemonsOptions());

export default {
  name: "Pokemon",
  components: {
    PokemonOption,
    PokemonPicture,
  },

  data() {
    return {
      pokemonArr: [],
      heart: false,
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
      blocked: false,
      contador: 0,
      scored: 0,
      recordsScored: [],
      records: [],
    };
  },
  methods: {
    async nixPokemonArr() {
      this.pokemonArr = await getPokemonsOptions();
      // console.log(this.pokemonArr);
      const nroRndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[nroRndInt];
      this.showPokemon = false;
    },
    checkAnswer(event) {
      // console.log("pokemonpage llamado ", event);
      // console.log("this.pokemon llamado ", this.pokemon);
      this.showAnswer = true;
      this.heart = false;
      this.blocked = false;
      // console.log({ event });
      this.showPokemon = true;
      // this.showPokemon = false;
      if (event === this.pokemon?.id) {
        this.scored++;
        this.message = `Genial, eres un maestro Pokemon, el pokemon es ${this.pokemon.name}`;
        this.showPokemon = true;
        localStorage.setItem("scored", JSON.stringify(this.scored));
        // if (this.scored == 2) {
        //   Swal.fire({
        //     icon: "info",
        //     title: "Has ganado una medalla",
        //     showConfirmButton: false,
        //     timer: 1500,
        //   });
        // }
        setTimeout(() => {
          this.nixPokemonArr();
        }, 500);
      } else {
        this.contador++;
        // let acumula = 0 ;
        // acumula = acumula + acumula
        // console.log('acumula ', acumula);
        // Swal.fire('hola','hola','success')
        // console.log("contador ", this.contador);
        if (this.contador == 1) {
          document.getElementById("3")?.classList.remove("color");
          this.message = `Opss, no eres un maestro Pokemon, el pokemon era ${this.pokemon?.name}`;
          this.showPokemon = false;
          this.nixPokemonArr();
        } else if (this.contador == 2) {
          document.getElementById("2")?.classList.remove("color");
          this.message = `Opss, no eres un maestro Pokemon, el pokemon era ${this.pokemon?.name}`;
          this.showPokemon = false;
          this.nixPokemonArr();
        } else if (this.contador == 3) {
          document.getElementById("1")?.classList.remove("color");
          this.contador = 0;
          this.message = "";
          document.getElementById("1")?.classList.add("color");
          document.getElementById("2")?.classList.add("color");
          document.getElementById("3")?.classList.add("color");
          Swal.fire({
            icon: "info",
            title: "Perdiste, no eres un maestro pokemon",
            showConfirmButton: false,
            timer: 1500,
          });
          this.blocked = true;
          this.showPokemon = false;
          this.nixPokemonArr();
          this.records.push(JSON.parse(localStorage.getItem("scored")));
          this.scored = 0;
          localStorage.setItem("scored", JSON.stringify(this.scored));
        }
      }
      // console.log('hola mundo ', this.showPokemon);
      // console.log('hola mundo ', this.pokemon);
    },
    newGame() {
      this.showPokemon = false;
      this.showAnswer = false;
      this.blocked = false;
      this.pokemonArr = [];
      this.pokemon = null;
      this.nixPokemonArr();
    },
  },
  mounted() {
    // ciclo de vida apenas carge el componente
    // console.log("mounted");
    this.scored = 0;
    this.scored = JSON.parse(localStorage.getItem("scored"));
    // this.recordsScored = Array.from(Array(3))
    // console.log( this.recordsScored);
    // console.log( this.records);
    this.nixPokemonArr();
  },
};
</script>
<style scoped>
.color {
  color: red;
}

.scored {
  position: absolute;
  margin-left: 5%;
}
</style>