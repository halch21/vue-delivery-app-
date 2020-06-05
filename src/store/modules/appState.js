import {db} from "../../firebaseConfig";

export default {
  state: {
    vendors: [],
    loading: false,
  },
  getters: {
    getVendors(state) {
      return state.vendors;
    },
    isLoading(state) {
      return state.loading;
    }
  },
  mutations: {
    setVendors(state, data) {
      state.vendors = data;
    },
    setLoading(state, value) {
      console.log('loading', value);
      state.loading = value;
    }
  },
  actions: {
    updateVendors({commit}) {
      db
        .collection('restaurants')
        .get()
        .then(data => {
          const vendors = [];
          data.forEach(doc => {
            vendors.push({id: doc.id, ...doc.data()});
          })
          commit("setVendors", vendors);
        });
    },
  },
}
