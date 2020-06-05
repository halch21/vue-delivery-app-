import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Basket from '../components/BasketDude.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Компонент Корзины', () => {
  let actions
  let store
  let mutations

   beforeEach(() => {
    actions = {
        addItemToBasket: jest.fn(),
        createOrder: jest.fn()
    };
    mutations = {
      incrementItemCount: jest.fn(),
      pushToBasket: jest.fn(),
      incrementItemCount: jest.fn(),
      decrementItemCount: jest.fn(),
      clearAllBasket: jest.fn(),
      setBasketVendor: jest.fn(),
    };

    store = new Vuex.Store({
      state: {
        basketItems: [],
        customerAddress: '',
        customerPhone: '',
        vendor: '',
      },
      getters: {
        getBasketItems: jest.fn(() => [{
          address: "Средняя Семеновская",
          count: 3,
          id: "YR43zDg2YTMRwurQiRSo",
          price: 526,
          title: "Сырный соус",
        }]),
        getTotalPrice: jest.fn(() => 1000),
        getBasketVendor: jest.fn(function () {
          return {name: 'Test Name'};
       })
      },
      actions,
      mutations
    })
  })

  test('Компонент является экземпляром Vue', () => {
    const wrapper = shallowMount(Basket,  { store, localVue })
    expect(wrapper.findComponent(Basket).vm).toBeTruthy()
  })

  test('Компоненту присваивается название заведения', () => {
    const wrapper = shallowMount(Basket,  { store, localVue })

    const heading = wrapper.find('#vendorName');
    expect(heading.text()).toBe('Test Name')
  })

  test('Компонент переводит на страницу оплаты', () => {
    const push = jest.fn();
    const $router = {
      push: jest.fn()
    }
    const $route = {
      name: "checkout"
    };
    const wrapper = shallowMount(Basket,  { store, localVue, mocks: { $router, $route } })
    const button = wrapper.find('#checkout')

    button.trigger('click')

    expect(wrapper.vm.$route.name).toBe($route.name)
  })

  test('Компонент корзины правильно выводит сумму заказа', () => {
    const wrapper = shallowMount(Basket,  { store, localVue })
    const button = wrapper.find('#checkout')

    expect(button.props('label')).toBe('Заказать 1000 ₽ ')
  })

  test('Компонент корзины очищается', () => {
    const wrapper = shallowMount(Basket,  { store, localVue })
    const button = wrapper.find('#clear')

    button.trigger('click')

    expect(mutations.clearAllBasket).toHaveBeenCalled()
  })

  test('В корзине можно уменьшить количество товара', () => {
    const wrapper = shallowMount(Basket,  { store, localVue })
    const buttonDecrement = wrapper.find('#decrement')

    buttonDecrement.trigger('click')

    expect(mutations.decrementItemCount).toHaveBeenCalled()
  })

  test('В корзине можно увеличить количество товара', () => {
    const wrapper = shallowMount(Basket,  { store, localVue })
    const buttonDecrement = wrapper.find('#increment')

    buttonDecrement.trigger('click')

    expect(mutations.incrementItemCount).toHaveBeenCalled()
  })
})
