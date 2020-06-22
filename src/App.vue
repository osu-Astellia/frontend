<template>
  <div id="app">
    <v-navbar />
      <transition name="fade">
          <router-view class="view" />
      </transition>
    <v-footer />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

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