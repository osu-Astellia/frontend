<template>


  <div id="app">

    <v-navbar />
<<<<<<< HEAD
      <transition name="slide-fade" mode="out-in">
=======
      <transition name="slide-fade">
>>>>>>> 403b9ff... update files
          <router-view class="view" />
      </transition>
    <v-footer />
  </div>
</template>

<style>
html,body {
	height:100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
<<<<<<< HEAD
  text-align: center;
=======
  #text-align: center;
>>>>>>> 403b9ff... update files
  color: #2c3e50;
	min-height:100%;
	display:grid;
}
body {
  background-color: #292D3E !important;
  margin: 0;
  padding: 0;




}
.view {
<<<<<<< HEAD
  text-align: center;
  color:white;

=======
  color:white;

  border: 0px solid black;
  border-radius: 20px;
  width: 100%;
  height: 100%;

>>>>>>> 403b9ff... update files
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
<script>
  import { mapActions } from 'vuex';
  import VNavbar from "./components/v-navbar";
  import VFooter from "./components/v-footer";
  export default {

    ...mapActions(['getIP']),
    components: {VFooter, VNavbar},
    mounted() {
      this.$store.dispatch('getIP');

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