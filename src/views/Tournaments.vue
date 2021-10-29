<template>
  <div>
      Tournaments
  </div>
  <router-link to="/CreateTournament">Create Tournament</router-link>
  <hr>
  <div v-for="tournament in tournaments" :key="tournament">
      <div>
        {{ tournament['name'] }}
      </div>
      <div>
        {{ tournament['desc'] }}
      </div>
      <div>
        Max number of teams: {{ tournament['amountOfTeams'] }}
      </div>
      <div>
        {{ tournament['icon'] }}
      </div>
      <div>
        Sign up before: {{ tournament['signUpDeadline'] }}
      </div>
      <div>
        Starts: {{ tournament['time'] }}
      </div>
      <div>
          Teams:
          <div v-for="team in tournament['teams']" :key="team">
              {{ team }}
          </div>
      </div>
      <template v-if="tournament['teams'].length < tournament['amountOfTeams']"><!-- && tournament['signUpDeadline'].seconds * 1000 > (new Date).getTime() -->
        <form action="">
          <select name="signup" id="signup" v-model="signup">
            <template v-for="team in yourTeams" :key="team">
              <option :value="team">
                {{ team }}
              </option>
            </template>
          </select>
          <button type="submit" @click.stop.prevent="signTeamUp(tournament['name'], signup)">Sign up</button>
        </form>
      </template>
      <hr>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getAllTournaments, getTeamsByOwner, signUpToTournament } from '@/main.js'

export default{
    setup() {
        let tournaments = ref('')
        let yourTeams = ref([])

        getAllTournaments()
          .then(data => {
              tournaments.value = data
          })
        
        getTeamsByOwner('adcMonkey')
          .then(teams => {
            teams.forEach(team => {
              yourTeams.value.push(team.teamName)
            })
          })

        const signTeamUp = (tournament, team) => {
          if(team){
            signUpToTournament(tournament, team)
          }
        }

        return { tournaments, yourTeams, signTeamUp }
    }
}
</script>
