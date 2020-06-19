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

    async login({commit}, payload){
      
      let response = await fetch('/frontend/api/v1/auth/login', {
        body: JSON.stringify(
            {

              login: payload.login,
              password: payload.password,
              ip: this.ip,
                captcha_key: payload.captcha

            }),
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(resp => {
        resp.json().then(async res => {
          if(res.token) commit('setToken', res.token);

          else {
            this.$store.dispatch({type: 'errorAlert', $bvtoast: options.$bvtoast, title: 'Error', message: 'Invalid server response'});
          }
        })
      }).catch(e => {
        this.$store.dispatch({type: 'errorAlert', $bvtoast: options.$bvtoast, title: 'Error', message: 'Invalid captcha or Login data'});
      })
    },


    async register({commit}, payload){
      let response = await Vue.axios.post('/frontend/api/v1/auth/register', {
        data: {
          login:  payload.login,
          password:  payload.password,
          email: payload.email,
          captcha_key: payload.captcha,
          ip: this.ip
        }
      }).then(res => {
        if(res.data.token) commit('setToken', res.data.token)
        else {
          this.$store.dispatch({type: 'errorAlert', $bvtoast: options.$bvtoast, title: 'Error', message: 'Invalid server response'});
        }
      }).catch(e => {
        this.$store.dispatch({type: 'errorAlert', $bvtoast: options.$bvtoast, title: 'Error', message: 'Invalid server response'});
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
    getToken: state => {
      return state.token ? state.token : localStorage.getItem('token');
    }
  },
})
