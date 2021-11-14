<template>
  <div class="info">
    <br>
    <p>
      Summoner Name: {{ name }}
    </p>
    <br>
    <p>
      Teams: 
      <template v-for="team in teams" :key="team">
        <p>
          <a :href="'/team/' + team.teamName">
            {{ team.teamName }}
          </a>
        </p>
      </template>
    </p>
    <br>
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
  </div>
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
        <div class="container championContainer">
          <template v-for="(lan, useless, i) in lane" :key="lan">
            <template v-if="group == 'prefLevel'">
              <template v-if="i < 2">
                <p>
                  {{ laneOrderTitles[i] }} {{ lan }}
                </p>
              </template>
            </template>
            <template v-else>
              <div>
                <img :src="require('@/assets/championsFull/' + lan + '_0.jpg')" alt="Champion Art">
                <p>
                  {{ lan }}
                </p>
              </div>
            </template>
          </template>
        </div>
      </div>
    </template>
  </div>
  <div>
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
        'order11': dataTitle == 'teams',
        'order2': dataTitle == 'players',
        'order3': dataTitle == 'winner',
        'order4': dataTitle == 'time'
      }">
        <template v-if="dataTitle == 'teams'">
          <div class="container">
            <div v-for="team in data" :key="team" style="margin: 5px 10px; width: 50%" class="teamNames">
              <router-link :to="{path: '/team/' + team}">{{ team }}</router-link>
            </div>
          </div>
        </template>

        <div v-if="dataTitle == 'players'" class="container">
          <div class="teamMembers">
            <template v-for="player in data" :key="player">
              <template v-if="player.team == 1">
                <div>
                  <a :href="'/player/' + player.name">{{player.name}}</a>
                </div>
              </template>
            </template>
          </div>
          <div class="vs">
            vs
          </div>
          <div class="teamMembers">
            <template v-for="player in data" :key="player">
              <template v-if="player.team == 2">
                <div>
                  <a :href="'/player/' + player.name">{{player.name}}</a>
                </div>
              </template>
            </template>
          </div>
        </div>
        <template v-if="dataTitle == 'winner'">
          Winner: 
          <router-link :to="{path: '/team/' + match['teams'][data]}">{{ match['teams'][data] }}</router-link>
        </template>
        <template v-if="dataTitle == 'time'">
          {{ data.toDate().toDateString() }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { getUserByName, getRanks, getMatchesByPlayer, getTeamsByPlayer } from '@/main.js'

export default{
  setup() {
    const route = useRoute()
    const name = ref('')
    const rank = ref('')
    const ranks = ref([])
    const lanes = ref('')
    const matches = ref('')
    const teams = ref('')
    const laneOrderTitles = ref([
      'Primary',
      'Secondary'
    ])

    const userRank = ref('')

    getUserByName(route.params.username)
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
    
    return {
        name, rank, lanes, matches, teams, ranks, userRank, laneOrderTitles
    }
  }
}
</script>

<style lang="sass" scoped>
  .containerVert
    display: flex
    flex-direction: column
  
  .container
    display: flex
    justify-content: center
  
  .prefLevel
    display: block !important

  .info
    display: flex
    flex-direction: column
    text-align: left
    width: 100%
    max-width: 700px
    margin: 4vh auto

  .teamNames
    text-align: left
    a
      color: #000
      text-decoration: none
    &:first-of-type
      text-align: right

  .vs
    display: flex
    align-items: center

  .teamMembers
    max-width: 300px
    width: 100%
    text-align: left
    padding: 2px 6px
    &:first-of-type
      text-align: right
    div
      a
        color: #000
        text-decoration: none

  .order1
    order: 1
    h4
      width: 100%
      max-width: 700px
      text-align: left
      margin: 0 auto
    .container
      display: block
      width: 100%
      max-width: 700px
      text-align: left

  .order1
    order: 1
  .order11
    order: 1
    background: #EAE1CD
    box-shadow: 0 0 1vh
    margin-bottom: 1vh
  
  .order2
    order: 2
  
  .order3
    order: 3
    margin: 6px 0 1vh 0
    a
      color: #000
      text-decoration: none
  
  .order4
    order: 4
    margin: 0 0 5vh 0
  

  .match
    background: #F00
  

  .won1, .won2, .won3, .won4, .won5, .won6, .won7, .won8, .won9, .won10 
    background: #0F0 !important
  

  .championContainer
    max-width: 1000px
    width: 100%
    margin: 0 auto 12vh
    >div
      width: 20%
      position: relative
      img
        width: 100%
        height: auto
      p:last-of-type
        position: absolute
        background: linear-gradient(transparent, #000 1em)
        width: 100%
        text-align: center
        bottom: 0
        padding: 1em .3em .3em
        color: #FFF
        text-decoration: none

</style>