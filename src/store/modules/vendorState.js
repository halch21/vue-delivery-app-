import {db} from "../../firebaseConfig";

export default {
  state: {
    dishes: [],
    currentVendor: {},
  },
  getters: {
    getDishes(state) {
      return state.dishes;
    },
    getCurrentVendor(state) {
      // Возвращает state.vendors.find(vendor => vendor.id === id)
      return state.currentVendor;
    }
  },
  mutations: {
    setDishes(state, date) {
      state.dishes = date.map(item => {
        item.address = state.currentVendor.address;
        item.vendorId = state.currentVendor.id;
        item.vendorName = state.currentVendor.name;
        return item;
      });
    },
    setCurrentVendor(state, data) {
      state.currentVendor = data;
    },
  },
  actions: {
    updateDishes({commit}, id) {
      let menu = db.doc(`restaurants/${id}`).collection('menu')
      menu
      .get()
      .then(data => {
        const menuItems = [];
        data.forEach(doc => {
          menuItems.push({id: doc.id, ...doc.data()});
        })
        commit("setDishes", menuItems);
        });
    },
    updateVendor({commit}, id) {
      db
        .doc(`restaurants/${id}`)
        .get()
        .then(data => {
          console.log('data', data.data());
          commit('setCurrentVendor', data.data());
        });
    }
  },
}
