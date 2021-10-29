<template>
  <div>
      Tournaments
  </div>
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
        Sign up before: {{ tournament['signUpDeadline'].toDate().toDateString() }}
      </div>
      <div>
        Starts: {{ tournament['time'].toDate().toDateString() }}
      </div>
      <div>
          Teams:
          <div v-for="team in tournament['teams']" :key="team">
              {{ team }}
          </div>
      </div>
      <form action="">
        <select name="signup" id="signup" v-model="signup">
          <template v-for="team in yourTeams" :key="team">
            <option :value="team">
              {{ team }}
            </option>
          </template>
        </select>
        <button type="submit">Sign up</button>
      </form>
      <hr>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getAllTournaments, getTeamsByOwner } from '@/main.js'

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
        return { tournaments, yourTeams }
    }
}
</script>
