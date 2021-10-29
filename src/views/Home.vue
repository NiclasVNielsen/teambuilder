<template>
  This nerd likes to play {{ champion }}

  <br>
  
  <ul>
    <li>Edit profile</li>
    <li>Leave team</li>
  </ul>
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
