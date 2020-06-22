<template>


  <div id="app">
    <meta property="og:site_name" content="By Astellia Team">
    <meta property="og:title" content="ASTELLIA">
    <meta property="og:description" content="Amelia is a private osu! server with a multiplayer, PP, active community and development team that adds new features and fixes bugs. We have a friendly community and we have open source!">
    <meta name="theme-color" content="#3F2B5E">
    <meta name="description" content="Amelia is a private osu! server with a multiplayer, PP, active community and development team that adds new features and fixes bugs. We have a friendly com... Join us!">
    <meta name="keywords" content="discord, servers, server, discord servers, list, top, popular, anime, games, community, music, reviews, nsfw, join">
    <v-navbar />
      <transition name="fade">
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
  text-align: center;
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
  text-align: center;
  color:white;

  border: 0px solid black;
  border-radius: 20px;
  width: 100%;
  height: 100%;

}
.fade-enter-active, .fade-leave-active {
  transition: opacity 500ms;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
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

    }
  }
</script>