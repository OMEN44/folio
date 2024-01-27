//create jwt token store
import {createStore} from "vuex";

export default createStore({
    state() {
        return {
            token: null
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            //localStorage.setItem('token', token)
        },
        clearToken(state) {
            state.token = null
            // localStorage.removeItem('toke')
        }
    },
    actions: {
        login({ commit }, token) {
            commit('setToken', token)
        },
        logout({ commit }) {
            commit('clearToken')
        }
    },
    getters: {
        token: state => state.token,
        isAuthenticated: state => !!state.token
    }
})