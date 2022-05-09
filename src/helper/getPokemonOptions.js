import pokemonApi from "../api/api";

export const getPokemons = () => {
  const pokemonsArrys = Array.from(Array(650));
  return pokemonsArrys.map((arg, index) => {
    // console.log({arg,index});
    return index + 1;
  });
};

const getPokemonsOptions = async () => {
  // hacer aleatorio con js
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  // console.log(Math.random() - 0.5);
  //   console.log(mixedPokemons);
  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));
//   console.table(pokemons);
  return pokemons;
};

export const getPokemonNames = async ([a, b, c, d] = []) => {
  //   const resp = await pokemonApi.get(`/`);
  //   console.table(a, b, c, d);
  //   console.log({ resp });
  const arrPromise = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ];

  const [p1, p2, p3, p4] = await Promise.all(arrPromise);
  //   console.table(resps);
  return [
    { name: p1.data.name, id: p1.data.id },
    { name: p2.data.name, id: p2.data.id },
    { name: p3.data.name, id: p3.data.id },
    { name: p4.data.name, id: p4.data.id },
  ];
};

export default getPokemonsOptions;
