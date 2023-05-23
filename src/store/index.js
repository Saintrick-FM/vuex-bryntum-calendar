import { createStore } from 'vuex'
import { api } from "../../src/plugins/axios";


export default createStore({
  state: {
    events: [],
    resources: [],
  },
  getters: {
    getData: state => state.events
  },
  mutations: {
    setEvents(state, data) {
      state.events = data;
    },
    
    setResources(state, data) {
      state.resources = data;
    }
  },
  actions: {
    getEvents({ commit }) {
      return new Promise((resolve, reject) => {
        api.get('events/')
          .then(response => {
            const data = response.data;
            console.log("Events reçus de l'api = ",data);
            commit('setEvents', data);
            resolve(data);
          })
          .catch(error => {
            console.error("Erreur dans le get des donnees = ",error);
            reject(error);
          });
      });
    },
    getResources({ commit }) {
      return new Promise((resolve, reject) => {
        api.get('resources/')
          .then(response => {
            const data = response.data;
            console.log("Ressources  reçues de l'api = ",data);
            commit('setResources', data);
            resolve(data);
          })
          .catch(error => {
            console.error("Erreur dans le get des donnees = ",error);
            reject(error);
          });
      });
    },
    async addDataToApi(state, data) {
      let eventUrl = 'http://localhost:9000/' //changer l'url de l'api
      
      // Utilisation de l'api fetch afin de varier les outils
      const response = await fetch(eventUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...data]),
      });

      if (response.ok) {
        const responseData2 = await response2.json();
        console.log(responseData2);
        // set response value to responseData
        this.events = responseData2;
      }
    },
  },
  modules: {
  }
})
