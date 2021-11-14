<template>
<div class="home">
  <div class="infoBox">
    <figure>
      <img src="@/assets/logo.png" alt="Logo">
    </figure>
    <p>
      The best thing you can do is focus your champion pool on a couple champions so you 
      can try to figure out the most important things about the game like map awareness 
      and when you can kill the enemy.
    </p>
  </div>
</div>
</template>

<script>
import { ref } from 'vue'
import { getChampions } from '@/main.js'

export default {
  setup(){
    const champion = ref("")

    getChampions()
      .then(data => {
        champion.value = data['champions'][53]
      })
  
    return { champion };
  },

  name: 'Home',
}
</script>

<style lang="sass" scoped>
.home
  background: url('../assets/lux.png'), #EAE1CD
  background-size: cover
  background-repeat: no-repeat
  background-position: 20vw 7vh
  height: 92.5vh

.infoBox
  width: 100%
  max-width: 810px
  text-align: left
  padding: 177px 0 0 218px
  img
    width: 100%
    height: auto
    margin-bottom: 38px

@media screen and (max-width: 1000px)
  .infoBox
    padding: 5vh
    max-width: 100%
    img
      width: 70%
      margin: 10vh 15% 5vh

</style>