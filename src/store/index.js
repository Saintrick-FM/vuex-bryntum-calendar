import { createStore } from "vuex";
import { api } from "../../src/plugins/axios";

export default createStore({
  state: {
    events: [],
    resources: [],
  },
  getters: {
    getData: (state) => state.events,
  },
  mutations: {
    setEvents(state, data) {
      state.events = data;
    },

    setResources(state, data) {
      state.resources = data;
    },
  },
  actions: {
    getEvents({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("events/")
          .then((response) => {
            const data = response.data;
            console.log("Events reçus de l'api = ", data);
            /**
             * L'api doit renvoyer un json d'events identique à celui-ci :
             * "events": [
                {
                  "id": "1",
                  "name": "Controle Qualité Poids N°1",
                  "startDate": "2023-11-09T08:00:00.000Z",
                  "endDate": "2023-11-11T02:00:00.000Z",
                  "resourceId": "Gilles",
                  "site": "Site: Secteur 3",
                  "state": "Urgent"
                },
                {
                  "id": "2",
                  "name": "Controle Qualité Poids N°2",
                  "startDate": "2022-11-29T08:00:00.000Z",
                  "endDate": "2022-12-01T11:00:00.000Z",
                  "resourceId": "francy",
                  "site": "Site: Secteur 1",
                  "state": "Faible"
                },
              ]
              * 
              */

            commit("setEvents", data);
            resolve(data);
          })
          .catch((error) => {
            console.error("Erreur dans le get des donnees = ", error);
            reject(error);
          });
      });
    },
    getResources({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("resources/")
          .then((response) => {
            const data = response.data;
            console.log("Ressources  reçues de l'api = ", data);

            /**L'api doit renvoyer un json de ressources identique a celui-ci:
             * {
              "resources": {
                "rows": [
                  {
                    "id": "francy",
                    "name": "Francy",
                    "eventColor": "violet"
                  },
                  {
                    "id": "yann",
                    "name": "Yann",
                    "eventColor": "grey"
                  },
                ]
                }
              }
             */
            commit("setResources", data);
            resolve(data);
          })
          .catch((error) => {
            console.error("Erreur dans le get des donnees = ", error);
            reject(error);
          });
      });
    },
    async addDataToApi(state, data) {
      let eventUrl = "http://localhost:9000/"; //changer l'url de l'api

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
  modules: {},
});
