import pokemonApi from "../../../src/api/api";

describe("Pokemon Api", () => {
  it("Axios debe estar configurado con el api de pokemon", () => {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon";
    expect(pokemonApi.defaults.baseURL).toBe(apiUrl);
  });
});
