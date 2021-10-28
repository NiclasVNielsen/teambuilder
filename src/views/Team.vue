<template>
  <p>
    Team Name: {{ name }}
  </p>
  <div>
      <template v-for="member in members" :key="member">
          <div>
            <template v-if="member == owner">
              Owner
            </template>
            {{ member }}
          </div>
      </template>
  </div>
  <div>
    <hr>
    <div class="containerVert match" v-for="(match) in matches" :key="match" v-bind:class="{
      'won': name == match['teams'][match['winner']]
    }">
      <div v-for="(data, dataTitle) in match" :key="data" v-bind:class="{
        'order1': dataTitle == 'teams',
        'order2': dataTitle == 'players',
        'order3': dataTitle == 'time',
        'order4': dataTitle == 'winner'
      }">
        <template v-if="dataTitle == 'teams'">
          <div class="container">
            <div v-for="team in data" :key="team" style="margin: 5px 10px">
                <a :href="'/team/' + team">{{team}}</a>
            </div>
          </div>
        </template>

        <div v-if="dataTitle == 'players'" class="container">
          <div>
            <template v-for="player in data" :key="player">
              <template v-if="player.team == 1">
                <div>
                  <a :href="'/player/' + player.name">{{player.name}}</a>
                </div>
              </template>
            </template>
          </div>
          <div>
            vs
          </div>
          <div>
            <template v-for="player in data" :key="player">
              <template v-if="player.team == 2">
                <div>
                  <a :href="'/player/' + player.name">{{player.name}}</a>
                </div>
              </template>
            </template>
          </div>
        </div>
        
        <template v-if="dataTitle == 'time'">
          {{ data.toDate().toDateString() }}
        </template>
        
        <template v-if="dataTitle == 'winner'">
          Winner: {{ match['teams'][data] }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getTeamByName, getMatchesByTeam } from '@/main.js'

export default{
    setup() {
        const route = useRoute()

        let name = ref('')
        let members = ref('')
        let matches = ref('')
        let owner = ref('')
        getTeamByName(route.params.teamname)
            .then(data => {
                name.value = data[0].teamName
                members.value = data[0].members
                owner.value = data[0].teamOwner
                
                getMatchesByTeam(data[0].teamName)
                    .then(data => {
                        matches.value = data
                    })
            })

        return {
            name, members, matches, owner
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

  .won{
    background: #0F0 !important;
  }
</style>