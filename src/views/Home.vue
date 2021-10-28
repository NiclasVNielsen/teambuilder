<template>
  This nerd likes to play {{ champion }}

  <br>
  
  <ul>
    <li>Make Teams</li>
    <li>Invite player to team</li>
    <li>Make Tournaments</li>
    <li>Team sign up to tournament</li>
    <li>Edit profile</li>
    <li>tournament control wins and loses</li>
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
