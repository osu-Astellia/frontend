<template>
  <div id="app">
    <v-navbar />
    <router-view class="view" />
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
  margin: 0;
  padding: 0;
}
.view {
  text-align: center;
  width: 50%;
  height: auto;
  color:white;
  margin: 50px auto !important;

  border: 0px solid black;
  border-radius: 20px;
}

</style>
<script>
  import { mapActions } from 'vuex';
  import VNavbar from "./components/v-navbar";
  export default {

    ...mapActions(['getIP']),
    components: {VNavbar},
    mounted() {
      this.$store.dispatch('getIP');

    }
  }
</script>