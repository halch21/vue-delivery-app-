import {db} from "../../firebaseConfig";

export default{
  state: {
    orderHistory: [],
  },
  getters: {
    getOrderHistory(state) {
      return state.orderHistory
    }
  },
  mutations: {
    setOrderHistory(state, data) {
      state.orderHistory = data;
    }
  },
  actions: {
    updateOrderHistory({commit, getters}) {
      db
        .collection('orders')
        .where("userId", "==", getters.getUser.uid)
        .get()
        .then(data => {
          const orders = [];
          data.forEach(doc => {
            orders.push({id: doc.id, ...doc.data()});
          })
          commit("setOrderHistory", orders);
        });
    }
  },
  modules: {
  }
}
