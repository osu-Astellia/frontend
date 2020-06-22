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
      let response = await Vue.axios.post('/frontend/api/v1/auth/login', {
          login: payload.login,
          password: payload.password,
          ip: payload.ip,
          captcha_key: payload.captcha,
          is_bancho: false

      })
          .catch(e => {


            if(e.response.data.result){
                if(e.response.data.result.includes('merge')) {
                    payload.$store.dispatch('infoAlert', {$bvtoast: payload.$bvtoast, title: 'Info', message: 'Account merge is needed... merging account password to new version!'});

                    payload.$store.dispatch('mergeAccount', payload);
                }else {
                    payload.$store.dispatch('errorAlert', {
                        $bvtoast: payload.$bvtoast,
                        title: 'Error',
                        message: e.response.data.result
                    });
                }
            }else{
              payload.$store.dispatch('errorAlert', {$bvtoast: payload.$bvtoast, title: 'Error', message: e.response.data});
            }

          })
          .then(res => {
          if(res.data.result) {

            commit('setToken', res.data.result);
            this.$store.dispatch({
              type: 'infoAlert',
              $bvtoast: options.$bvtoast,
              title: 'Info',
              message: 'Authorization is successful...'
            });
            this.$router.go(0);
            payload.$bvModal.hide('loginModal');
          }

          else {
            this.$store.dispatch({type: 'errorAlert', $bvtoast: options.$bvtoast, title: 'Error', message: 'Invalid server response'});
          }
        })
    },



    async mergeAccount({commit}, payload){
        let response = await Vue.axios.post('/frontend/api/v1/merge', {
          username: payload.login,
          password: payload.password,
          type: 'merge'
        }).then(async res => {
            await payload.$store.dispatch({
                type: 'infoAlert',
                $bvtoast: options.$bvtoast,
                title: 'Account merged',
                message: 'Account merged successful'
            });
        }).catch(e => {

            if(e.response.data.result){


                    payload.$store.dispatch('errorAlert', {$bvtoast: payload.$bvtoast, title: 'Error', message: e.response.data.result});

            }else{
                payload.$store.dispatch('errorAlert', {$bvtoast: payload.$bvtoast, title: 'Error', message: e.response.data});
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
          console.log(res.data);
          console.log(payload);
          commit('setToken', res.data.result)
          payload.$store.dispatch({
            type: 'infoAlert',
            $bvtoast: payload.$bvtoast,
            title: 'Info',
            message: 'Authorization is successful...'
          });
          this.$router.go(0);
          payload.$bvModal.hide('registerModal');
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
