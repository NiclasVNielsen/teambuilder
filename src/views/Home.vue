<template>
  <div class="home">
    Pirate says
  </div>

  plz work 😭 = {{ champions.champion }}
</template>

<script>
import { champs } from '@/main.js'
import { reactive } from '@vue/reactivity'

export default {
  setup(){

    const champions = reactive({
      champion: champs
    })

    /* Fine italian pasta ---------------------------------------------------*/
    champions.champion
      .then(cmp => champions.champion = cmp)
    /* End of spagetti code---------------------------------------------------*/

    console.log(champions.champion)
  
    return { champions };
  },

  name: 'Home',
}
</script>
