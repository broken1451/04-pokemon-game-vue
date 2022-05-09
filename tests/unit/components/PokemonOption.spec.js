import { shallowMount } from "@vue/test-utils";
import PokemonOption from "@/components/PokemonOption.vue";
import { mockPokemos } from "../mocks/mockPokemons";

describe("PokemonOption component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOption, {
      props: {
        pokemonArr: mockPokemos,
      },
    });
  });

  it("debe de hacer match con el snapshot ", () => {
    //   console.log(wrapper.html());
    // expect(wrapper.html())..toMatchInlineSnapshot();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("debe de mostrar las 4 opciones correctamente", () => {
    // console.log(wrapper.html());
    const listado = wrapper.findAll("li");
    expect(listado.length).toBe(4);
    expect(listado[0].text()).toBe("Bulbasaur");
    expect(listado[1].text()).toBe("Ivysaur");
    expect(listado[2].text()).toBe("Venusaur");
    expect(listado[3].text()).toBe("Charmander");
  });

  it("debe emitir 'selection' con sus respectivos parametros  al hacer click", () => {
    const [l1, l2, l3, l4] = wrapper.findAll("li");

    l1.trigger("click");
    l2.trigger("click");
    l3.trigger("click");
    l4.trigger("click");
    console.log(wrapper.emitted("selection"));
    expect(wrapper.emitted("selection").length).toBe(4);
    // expect(wrapper.emitted("selection")[0]).toBe([1]);
    expect(wrapper.emitted("selection")[0]).toStrictEqual([1]);
    expect(wrapper.emitted("selection")[1]).toStrictEqual([2]);
    expect(wrapper.emitted("selection")[2]).toStrictEqual([3]);
    expect(wrapper.emitted("selection")[3]).toStrictEqual([4]);
  });
});
