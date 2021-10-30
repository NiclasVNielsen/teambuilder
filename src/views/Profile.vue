<template>
  <div class="profile">
    This is you!
  </div>
  <p>
    Email: {{ email }}
  </p>
  <p>
    Summoner Name: {{ name }}
  </p>
  <p>
    Teams: 
    <template v-for="team in teams" :key="team">
      <a :href="'/team/' + team.teamName">
        {{ team.teamName }}
      </a>
    </template>
  </p>
  <p>
    <label for="userRank">Rank:</label>
    <select name="userRank" id="userRank" v-model="userRank">
      <template v-for="tier in ranks" :key="tier">
        <option :value="tier">
          {{ tier }}
        </option>
      </template>
    </select>
  </p>
  <div class="containerVert">
    <template v-for="(lane, group) in lanes" :key="lane">
      <div v-bind:class="{
        'order1': group == 'prefLevel',
        'order2': group == 'champPool'
      }">
        <h4>
          <template v-if="group == 'prefLevel'">
            Lane Preference
          </template>
          <template v-if="group == 'champPool'">
            Favorite Champions
          </template>
        </h4>
        <!-- This needs a rework they should be sepereated -->
        <p v-for="(lan, useless, i) in lane" :key="lan">
          <template v-if="group == 'prefLevel'">
            {{ i + 1 }} {{ lan }}
          </template>
          <template v-else>
            {{ lan }}
            <!-- 
              selected if lan == champion - from all champions list
             -->
            <!-- <select name="" id="" multiple>
              <option value="">1</option>
              <option value="" selected>2</option>
              <option value="" selected>3</option>
            </select> -->
          </template>
        </p>
      </div>
    </template>
  </div>
  <div>
    <hr>
    <div class="containerVert match" v-for="(match) in matches" :key="match" v-bind:class="{
      'won1': match['players'][0].name == name && match['players'][0].team == match['winner'],
      'won1': match['players'][1].name == name && match['players'][1].team == match['winner'],
      'won2': match['players'][2].name == name && match['players'][2].team == match['winner'],
      'won3': match['players'][3].name == name && match['players'][3].team == match['winner'],
      'won4': match['players'][4].name == name && match['players'][4].team == match['winner'],
      'won5': match['players'][5].name == name && match['players'][5].team == match['winner'],
      'won6': match['players'][6].name == name && match['players'][6].team == match['winner'],
      'won7': match['players'][7].name == name && match['players'][7].team == match['winner'],
      'won8': match['players'][8].name == name && match['players'][8].team == match['winner'],
      'won9': match['players'][9].name == name && match['players'][9].team == match['winner'],
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
              <router-link :to="{path: '/team/' + team}">{{ team }}</router-link>
            </div>
          </div>
        </template>

        <div v-if="dataTitle == 'players'" class="container">
          <div>
            <template v-for="player in data" :key="player">
              <template v-if="player.team == 1">
                <div>
                  <router-link :to="{path: '/player/' + player.name}">{{player.name}}</router-link>
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
                  <router-link :to="{path: '/player/' + player.name}">{{player.name}}</router-link>
                </div>
              </template>
            </template>
          </div>
        </div>
        
        <template v-if="dataTitle == 'time'">
          {{ data.toDate().toDateString() }}
        </template>
        
        <template v-if="dataTitle == 'winner'">
          Winner: 
          <router-link :to="{path: '/team/' + match['teams'][data]}">{{ match['teams'][data] }}</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import { ref } from 'vue'
import { getUserById, getRanks, getMatchesByPlayer, getTeamsByPlayer } from '@/main.js'

export default{
    setup() {
        const email = ref('')
        const uid = ref('')
        const name = ref('')
        const rank = ref('')
        const ranks = ref([])
        const lanes = ref('')
        const matches = ref('')
        const teams = ref('')

        const userRank = ref('')

        firebase.auth().onAuthStateChanged(function(user) {
            //Nope you don't belong here check
            if (!user) {
                window.location.href = '/login'
                return
            }
            email.value = user.email
            uid.value = user.uid

            getUserById(user.uid)
              .then(data => {
                name.value = data[0].lolName
                rank.value = data[0].rank
                lanes.value = data[0].lanes
                
                getMatchesByPlayer(data[0].lolName)
                  .then(data => {
                    matches.value = data
                  })
                getTeamsByPlayer(data[0].lolName)
                  .then(data => {
                    teams.value = data
                  })
                getRanks()
                  .then(rankData => {
                    ranks.value = rankData
                    rank.value = rankData[rank.value]
                    userRank.value = `${rank.value}`
                  })
              })
        });
        

          

        return {
            email, name, rank, lanes, matches, teams, ranks, userRank
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