import { shallowMount } from "@vue/test-utils";
import PokemonPicture from "@/components/PokemonPicture.vue";

describe("Pokemon Picture component", () => {
  it("debe hacer match  con el snapshot", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 1,
        showPokemon: false,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Debe mostrar la imagen oculta y el pokemon 100 ", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: false,
      },
    });

    const [img1, img2] = wrapper.findAll("img");
    expect(img1.exists()).toBeTruthy();
    expect(img2).toBe(undefined);
    // console.log({ img1, img2 });
    // console.log({ imgclasses: img1.classes() });
    expect(img1.classes("hidden-pokemon")).toBeTruthy();
    expect(img1.classes("hidden-pokemon")).toBe(true);
    const imgSrc = img1.attributes('src');
    const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg'
    expect(imgSrc).toBe(url);

  });

  it("Debe de mostrar el pokemon si showPokemon esta esta true showPokemon:true", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: true,
      },
    });
    console.log(wrapper.html());
    const [img1, img2] = wrapper.findAll("img");
    expect(img1.exists()).toBeTruthy();
    // console.log({ imgclasses: img1.classes(), img2: img2.classes() });
    // console.log({ img1 });
    expect(img1.classes("hidden-pokemon")).toBe(true);
    expect(img1.classes("fade-in")).toBe(false);
    expect(img2.classes("hidden-pokemon")).toBe(false);
    expect(img2.classes("fade-in")).toBe(true);
  });
});
