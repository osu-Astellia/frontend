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

    async login({commit}, options){
      let response = await Vue.axios.post('/frontend/api/v1/auth/login', {login: options.login, password: options.password, ip: this.ip}).then(res => {
        if(res.data.token) commit('setToken', res.data.token);
        else {
          alert('No token, maybe you made a typo?')
        }
      }).catch(e => {
        alert('Invalid login data or captcha ...')
      })
    },


    async register({commit}, options){
      let response = await Vue.axios.post('/frontend/api/v1/auth/register', {
        data: {
          login:  options.login,
          password:  options.password,
          email: options.email,
          capchaKey: options.captchaKey,
          ip: this.ip
        }
      }).then(res => {
        if(res.data.token) commit('setToken', res.data.token)
        else {
          alert('No token, maybe you made a typo?')
        }
      }).catch(e => {
        alert('Look`s like captcha are invalid')
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
