import getPokemonsOptions, {
  getPokemons,
  getPokemonNames,
} from "../../../src/helper/getPokemonOptions";

describe("Getpokemon options helper", () => {
  it("debe de regresar un array de nuemeros", () => {
    const pokemon = getPokemons();
    // console.log({ pokemon });
    expect(pokemon.length).toBe(650);
    expect(pokemon[0]).toBe(1);
    expect(pokemon[500]).toBe(501);
    expect(pokemon[649]).toBe(650);
  });

  it("debe retornar un array de 4 elementos con nombres de pokemon", async () => {
    const pokemons = await getPokemonNames([1, 2, 3, 4]);
    expect(pokemons).toStrictEqual([
      { name: "bulbasaur", id: 1 },
      { name: "ivysaur", id: 2 },
      { name: "venusaur", id: 3 },
      { name: "charmander", id: 4 },
    ]);
  });

  it("Getpokemonoptions debe de retornar un arry mezclado ", async () => {
    const pokemons = await getPokemonsOptions();
    // console.log({ pokemons });
    expect(pokemons.length).toBe(4);
    expect(pokemons).toEqual([
      { name: expect.any(String), id: expect.any(Number) },
      { name: expect.any(String), id: expect.any(Number) },
      { name: expect.any(String), id: expect.any(Number) },
      { name: expect.any(String), id: expect.any(Number) },
    ]);
  });
});
