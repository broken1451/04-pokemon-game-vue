import { shallowMount, mount } from "@vue/test-utils";
import Pokemon from "../../../src/pages/PokemonPage.vue";
import { mockPokemos } from "../mocks/mockPokemons";

describe("Pokemonpage component", () => {
  let wrapper;
  //   let nixPokemonArrPokemon;

  beforeEach(() => {
    // nixPokemonArrPokemon = jest.spyOn(Pokemon.methods, "nixPokemonArr");
    wrapper = shallowMount(Pokemon);
  });

  it("debe hacer match con el snapshot ", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("debe de llamar al metodo nixPokemonArr  al montar (mounted)", () => {
    const nixPokemonArrPokemon = jest.spyOn(Pokemon.methods, "nixPokemonArr");
    shallowMount(Pokemon);
    expect(nixPokemonArrPokemon).toHaveBeenCalled();
  });

  it("debe hacer match con el snapshot cuando cargan los pokemons", () => {
    const wrapper = shallowMount(Pokemon, {
      // const wrapper = mount(Pokemon, {
      data() {
        return {
          pokemonArr: mockPokemos,
          heart: false,
          pokemon: mockPokemos[0],
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
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("debe de mostrar los componentes de pokemonPicture y pkemonOption", async () => {
    const wrapperMain = shallowMount(Pokemon, {
      // const wrapper = mount(Pokemon, {
      data() {
        return {
          pokemonArr: mockPokemos,
          heart: false,
          pokemon: mockPokemos[0],
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
    });
    const picture = wrapperMain.find("pokemon-picture-stub");
    const option = wrapperMain.find("pokemon-option-stub");
    expect(picture.exists()).toBe(true);
    expect(option.exists()).toBe(true);
    expect(picture.attributes("pokemonid")).toBe("1");
    expect(option.attributes("pokemonarr")).toBeTruthy();
  });

  it("pruebas con checkAnswer ", async () => {
    const wrapperMain = shallowMount(Pokemon, {
      // const wrapper = mount(Pokemon, {
      data() {
        return {
          pokemonArr: mockPokemos,
          heart: false,
          pokemon: mockPokemos[1],
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
    });

    await wrapperMain.vm.checkAnswer(2);
    expect(wrapperMain.find("h2").exists()).toBeTruthy();
    expect(wrapperMain.vm.showPokemon).toBeTruthy();
    expect(wrapperMain.find("h2").text()).toBe(`Genial, eres un maestro Pokemon, el pokemon es ${mockPokemos[1].name}`);
    // console.log(wrapperMain.vm);
      
    await wrapperMain.vm.checkAnswer(1);
    // console.log(wrapperMain.vm.message);
    expect(wrapperMain.vm.message).toBe(`Opss, no eres un maestro Pokemon, el pokemon era ${mockPokemos[1].name}`);
  });
});
