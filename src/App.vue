<template>


  <div id="app">
    <Snowf
    :amount="100"
    :size="5"
    :speed="0.5"
    :wind="1"
    :opacity="0.7"
    :swing="1"
    :image="null"
    :zIndex="-5"
    :resize="true"
    color="#fff"
    />
      <v-navbar />
      <transition name="slide-fade" >
        <router-view class="view" />
      </transition>
      <v-footer />



  </div>
</template>

<script>
import Snowf from 'vue-snowf';
import VNavbar from "./components/v-navbar";
import VFooter from "./components/v-footer";
export default {

  components: {VFooter, VNavbar, Snowf},
  mounted() {

    this.$store.dispatch('loadUser');

  },
  metaInfo() {
    return {
      title: 'Homepage',
      titleTemplate: '%s - Astellia',
      meta: [
        {property: 'og:site_name', content: 'Astellia'}
      ]/*,
        titleTemplate: '%s - Astellia',*/
    }

  },

}
</script>

<style>
html,body {
	height:100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color: #292D3E !important;
  margin: 0;
  padding: 0;
}
.view {
  color:white;

  border: 0px solid black;
  border-radius: 20px;
  width: 100%;
  min-height: calc(100vh - 285px);


}
.fade-enter-active, .fade-leave-active {
  transition: opacity 500ms;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.topPanel {
  height: 58px !important;
}

.grecaptcha-badge {
  visibility: hidden;
}
</style>
