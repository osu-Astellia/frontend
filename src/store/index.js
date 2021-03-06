import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
 
    user: null
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('token', token);
      state.token = token;
    },
    removeToken(state) {
      state.token = null;
      state.user = null;

    },

    setIP(state, ip) {
      state.ip = ip;
    },
    setUser(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem('token', payload.token);

    }



  },
  actions: {

    logout({ commit }) {
      commit('removeToken');
      localStorage.removeItem('token');


    },

    async loadUser({ commit }) {
      if (localStorage.getItem('token')) {
        let user = await fetch('/api/users/me', {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then(res => res.json());
        commit('setUser', { token: localStorage.getItem('token'), user });
      }
    },

    async errorAlert({ commit }, payload) {
      payload.$bvtoast.toast(payload.message, {
        title: 'Error',
        variant: 'danger',
        toaster: 'b-toaster-bottom-right',
        solid: true
      })
    },
    async infoAlert({ commit }, payload) {
      payload.$bvtoast.toast(payload.message, {
        title: 'info',
        variant: 'info',
        toaster: 'b-toaster-bottom-right',
        solid: true
      })
    },

    async getUser({ commit }, payload) {

      let me = await fetch('/api/users/me', {
        headers: {
          'Authorization': payload.token
        }
      })
      commit('setUser', me);
    },
    async login({ commit }, payload) {

      let response = await Vue.axios.post('/api/users/login', {
        login: payload.login,
        password: payload.password,
        captcha_key: payload.captcha

      }).catch(e => {

        if (e.response.status === 400) {
          payload.$store.dispatch('mergeAccount', payload);
          return;
        }


        if (e.response.data.result) {

            payload.$store.dispatch('errorAlert', {
              $bvtoast: payload.$bvtoast,
              title: 'Error',
              message: e.response.data.result
            });


        } else {
          payload.$store.dispatch('errorAlert', { $bvtoast: payload.$bvtoast, title: 'Error', message: "Server can't response any data" });
        }

      })
        .then(async res => {

          if (res.data.token) {
            let user = '';
            payload.$bvModal.hide('LoginModal');
            await fetch('/api/users/me', {
              headers: {
                'Authorization': res.data.token
              }
            }).then(async res => {
              if (!res.ok) return;
              user = await res.json();

            })



            commit('setUser', { token: res.data.token, user });


          }

          else {
            this.$store.dispatch({ type: 'errorAlert', $bvtoast: options.$bvtoast, title: 'Error', message: 'Invalid server response' });
          }
        })
    },




    async mergeAccount({ commit }, payload) {
      let response = await Vue.axios.post(`/api/users/merge_password`, {
        username: payload.login,
        password: payload.password,
        type: 'merge'
      }).then(async res => {
        await payload.$store.dispatch({
          type: 'infoAlert',
          $bvtoast: payload.$bvtoast,
          title: 'Account merged',
          message: 'Account merged successful'
        });
      }).catch(e => {

        if (e.response.data.result) {
          payload.$store.dispatch('errorAlert', { $bvtoast: payload.$bvtoast, title: 'Error', message: e.response.data.result });

        } else {
          payload.$store.dispatch('errorAlert', { $bvtoast: payload.$bvtoast, title: 'Error', message: e.response.data });
        }
      })
    },

    async register({ commit }, payload) {
      let response = await Vue.axios.post('/frontend/api/v1/auth/register', {
        login: payload.login,
        password: payload.password,
        email: payload.email,
        captcha_key: payload.captcha,
        ip: payload.ip
      }).then(res => {

        if (res.data.result) {

          payload.$bvModal.hide('registerModal');

          setTimeout(() => {
            payload.$store.dispatch('infoAlert', {
              $bvtoast: payload.$bvtoast,
              title: 'Info',
              message: 'Authorized'
            });
            setTimeout(() => { window.location.href = '/' }, 300)
          }, 300);
          commit('setToken', res.data.result);

        }
        else {
          payload.$store.dispatch({ type: 'errorAlert', $bvtoast: payload.$bvtoast, title: 'Error', message: 'Invalid server response' });
        }
      }).catch(e => {
        if (e.response.data.result) {
          payload.$store.dispatch('errorAlert', { $bvtoast: payload.$bvtoast, title: 'Error', message: e.response.data.result });

        } else {
          payload.$store.dispatch('errorAlert',
            { $bvtoast: payload.$bvtoast, title: 'Error', message: "Server can't response any data" });
        }
      })

    },
  },

  modules: {
  },
  getters: {

    getToken: state => {
      return state.token ? state.token : localStorage.getItem('token');
    },
    getUser: state => {
      return state.user;
    }
  },
})
