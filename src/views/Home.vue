<template>
  This nerd likes to play {{ champions.champion }}
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
    /* End of spagetti code ---------------------------------------------------*/
  
    return { champions };
  },

  name: 'Home',
}
</script>
