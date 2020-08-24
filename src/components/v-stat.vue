<template>
  <div class="stat">

      
      <div class="smallText">
          {{ name }}
      </div>
      <div :style="statStyle">
          {{ description }}
      </div>

  </div>
</template>

<script>
export default {
    name: 'v-stat',
    props: ['name', 'color', 'description', 'descsize'],
    data(){
        return {
            statStyle: `border-top: 3px solid ${this.color}; font-size: ${this.descsize ? this.descsize : '24px'};`
        }
    }

}
</script>
<style scoped>
.stat {
    display: flex;
    flex-direction: column;
    min-width: 60px;
    height: auto;
    width: auto;
}

    .smallText {
        font-size: 17px;
        font-weight: bold;
    }

</style>