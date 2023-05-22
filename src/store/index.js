import { createStore } from 'vuex'
import { api } from "../../src/plugins/axios";


export default createStore({
  state: {
    events: null
  },
  getters: {
    getData: state => state.events
  },
  mutations: {
    setEvents(state, data) {
      state.events = data;
    }
  },
  actions: {
    fetchData({ commit }) {
      return new Promise((resolve, reject) => {
        api.get('events/')
          .then(response => {
            const data = response.data;
            console.log("Response got from api = ",data);
            commit('setEvents', data);
            resolve(data);
          })
          .catch(error => {
            console.error("Erreur dans le get des donnees = ",error);
            reject(error);
          });
      });
    }
  },
  modules: {
  }
})
