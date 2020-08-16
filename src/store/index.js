import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    ip: null,
      user: null
  },
  mutations: {
    setToken(state, token){
      localStorage.setItem('token', token);
      state.token = token;
    },
      removeToken(state){
        localStorage.removeItem('token');
        state.token = null;

      },

    setIP(state, ip){
      state.ip = ip;
    },



  },
  actions: {

      logout({commit}){
          commit('removeToken');
          window.location.href = '/';
      },

      async errorAlert({commit}, payload){
        payload.$bvtoast.toast(payload.message, {
          title: 'Error',
          variant: 'danger',
          toaster: 'b-toaster-bottom-right',
          solid: true
        })
      },
    async infoAlert({commit}, payload){
      payload.$bvtoast.toast(payload.message, {
        title: 'info',
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

      }).catch(e => {


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
              payload.$store.dispatch('errorAlert', {$bvtoast: payload.$bvtoast, title: 'Error', message: "Server can't response any data"});
            }

          })
          .then(res => {

          if(res.data.token) {
              payload.$bvModal.hide('LoginModal');

              setTimeout(() => {
                  payload.$store.dispatch('infoAlert', {
                      $bvtoast: payload.$bvtoast,
                      title: 'Info',
                      message: 'Authorized'
                  });
                  setTimeout(() => {window.location.href = '/'}, 300)
              }, 300);
              commit('setToken', res.data.token);

            


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
                $bvtoast: payload.$bvtoast,
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

          console.log(payload);
        if(res.data.result) {

            payload.$bvModal.hide('registerModal');

            setTimeout(() => {
                payload.$store.dispatch('infoAlert', {
                    $bvtoast: payload.$bvtoast,
                    title: 'Info',
                    message: 'Authorized'
                });
                setTimeout(() => {window.location.href = '/'}, 300)
            }, 300);
            commit('setToken', res.data.result);

        }
        else {
          payload.$store.dispatch({type: 'errorAlert', $bvtoast: payload.$bvtoast, title: 'Error', message: 'Invalid server response'});
        }
      }).catch(e => {
        if(e.response.data.result){
              payload.$store.dispatch('errorAlert', {$bvtoast: payload.$bvtoast, title: 'Error', message: e.response.data.result});

        }else{
          payload.$store.dispatch('errorAlert',
              {$bvtoast: payload.$bvtoast, title: 'Error', message:  "Server can't response any data"});
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
