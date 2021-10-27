<template>
  <p>
    Team Name: {{ name }}
  </p>
  <div>
      <template v-for="member in members" :key="member">
          <div>
            {{ member }}
          </div>
      </template>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getTeamByName/* , getMatchesByPlayer */ } from '@/main.js'

export default{
    setup() {
        const route = useRoute()

        let name = ref('')
        let members = ref('')
        let matches = ref('')
        getTeamByName(route.params.teamname)
            .then(data => {
                name.value = data[0].teamName
                members.value = data[0].members
                
                /* getMatchesByPlayer(data[0].teamName)
                    .then(data => {
                        matches.value = data
                    })
                 */
            })

        return {
            name, members, matches
        }
    }
}
</script>

<style lang="scss" scoped>
  .containerVert{
    display: flex;
    flex-direction: column;
  }
  .container{
    display: flex;
    justify-content: center;
  }

  .order1{
    order: 1
  }
  .order2{
    order: 2
  }
  .order3{
    order: 3
  }
  .order4{
    order: 4
  }

  .match{
    background: #F00;
  }

  .won1, .won2, .won3, .won4, .won5, .won6, .won7, .won8, .won9, .won10 {
    background: #0F0 !important;
  }
</style>