import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    ip: null
  },
  mutations: {
    setToken(state, token){
      localStorage.setItem('token', token);
      state.token = token;
    },

    setIP(state, ip){
      state.ip = ip;
    },



  },
  actions: {

      async errorAlert({commit}, payload){
        payload.$bvtoast.toast(payload.message, {
          title: payload.title,
          variant: 'danger',
          toaster: 'b-toaster-bottom-right',
          solid: true
        })
      },
    async infoAlert({commit}, payload){
      payload.$bvtoast.toast(payload.message, {
        title: payload.title,
        variant: 'info',
        toaster: 'b-toaster-bottom-right',
        solid: true
      })
    },

    async login({commit}, payload){
      let response = await Vue.axios.post('/frontend/api/v1/auth/login', {login: payload.login, password: payload.password, ip: payload.ip, captcha_key: payload.captcha})
          .catch(e => {
            if(e.response.data.result){
              payload.$store.dispatch('errorAlert', {$bvtoast: payload.$bvtoast, title: 'Error', message: e.response.data.result});

            }else{
              payload.$store.dispatch('errorAlert', {$bvtoast: payload.$bvtoast, title: 'Error', message: e.response.data});
            }

          })
          .then(res => {
          if(res.data.token) {

            commit('setToken', res.data.token);
            this.$store.dispatch({
              type: 'infoAlert',
              $bvtoast: options.$bvtoast,
              title: 'Info',
              message: 'Authorization is successful...'
            })
          }

          else {
            this.$store.dispatch({type: 'errorAlert', $bvtoast: options.$bvtoast, title: 'Error', message: 'Invalid server response'});
          }
        })
    },


    async register({commit}, payload){
      let response = await Vue.axios.post('/frontend/api/v1/auth/register', {
        login:  payload.login,
        password:  payload.password,
        email: payload.email,
        captcha_key: payload.captcha,
        ip: payload.ip
      }).then(res => {
        if(res.data.result) {

          commit('setToken', res.data.result)
          payload.$store.dispatch({
            type: 'infoAlert',
            $bvtoast: payload.$bvtoast,
            title: 'Info',
            message: 'Authorization is successful...'
          });
          this.$router.go(0);
        }
        else {
          payload.$store.dispatch({type: 'errorAlert', $bvtoast: payload.$bvtoast, title: 'Error', message: 'Invalid server response'});
        }
      }).catch(e => {
        if(e.response.data.result){
          payload.$store.dispatch('errorAlert', {$bvtoast: payload.$bvtoast, title: 'Error', message: e.response.data.result});
        }else{
          payload.$store.dispatch('errorAlert', {$bvtoast: payload.$bvtoast, title: 'Error', message: e.response.data});
        }
      })
    },
    async getIP({commit}){
      let r = await Vue.axios.get('/frontend/api/v1/getIP').then(res => res.data);
      commit('setIP', r.ip);

    }
  },

  modules: {
  },
  getters: {

    getIPAddress: state => {
      return state.ip
    },
    getToken: state => {
      return state.token ? state.token : localStorage.getItem('token');
    }
  },
})
