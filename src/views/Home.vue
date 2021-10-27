<template>
  This nerd likes to play {{ champion }}
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
