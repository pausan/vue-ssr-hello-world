import Vue from 'vue'
import Vuex from 'vuex'

import * as Api from '../api';

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: () => ({
      items: {/* [id: number]: Item */}
    }),

    actions : {
      fetchItems: ({ commit, state }) => {
        if (Object.keys(state.items).length == 0) {
          console.log ("store.actions.fetchItems => Api.fetch")
          return Api.fetchItems().then(items => commit('setItems', { items }))
        }
        else {
          console.log ("store.actions.fetchItems => cached!");
        }
      }
    },

    mutations : {
      setItems: (state, { items }) => {
        items.forEach(item => {
          if (item) {
            Vue.set(state.items, item.id, item)
          }
        })
      }
    },

    getters : {
      // getterName (state) {
      //  ...
      // }
    }
  })
}
