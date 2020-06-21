<template>
  <div class="home">
    <div class="content">
      <div class="image"></div>


      <div class="serverText">
        <div class="bigText">
          Astellia
        </div>
        <div class="description cent">
          Astellia - уникальный сервер с собственным сайтом, активной командой разработчиков, которая добавляет новые функции и исправляет баги.
        </div>

        <b-modal id="LoginModal" hide-footer title="Log In">
          <Login />
        </b-modal>
        <div class="buttongroup">
          <button v-b-modal.registerModal>Register</button>
          <a class="link" href="/files/client.exe">Скачать свитчер</a>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {

  },

  methods: {
    downloadSwitcher(){
    }
  }
}
</script>


<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

  .buttongroup {
    margin-top: 15px;
    display: inline-flex;
  }

  .link {
    background-color: #46297C;
    border: 1px solid #46298E;
    color: white;
    width: 150px;
    height: 50px;
    text-align: center;
    line-height: 2.9;
    margin: 0 20px;
    border-radius: 10px;
    text-decoration: none !important;
    transition: .4s;
  }

  button {
    background-color: #46297C;
    border: 1px solid #46298E;
    color: white;
    border-radius: 10px;
    width: 100px;
    height: 50px;
    transition: .4s;
  }

  button:hover {
    background-color: #25293E;
    border: 1px solid #25293E;
  }
  .content {
    text-align: center !important;
    width: 90%;
    height: 400px;
    background-color: #222533;
    display: inline-flex;
    margin: 25px auto;
    border-radius: 30px;
  }

  .cent {
    margin: 0 auto;
  }
  .description {
    width: 90%;
  }

  .bigText {
    margin-left: 0;
    width: ;
    font-size: 35px;
    font-family: 'Krona One', sans-serif;

  }

  .serverText {

    margin: 50px auto;
  }


  @media only screen and (min-width: 900px) {



    .image {
      background-image: url("/imgs/nekoha.png");
      width: 500px;
      height: 400px;
      background-size: cover;
    }
    .bigText {
      font-size: 60px;
      font-family: 'Krona One', sans-serif;
    }

    .description {
      font-size: 20px;
    }

  }
</style>