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
      <hr>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getAllTournaments } from '@/main.js'

export default{
    setup() {
        let tournaments = ref('')

        getAllTournaments()
            .then(data => {
                tournaments.value = data
            }) 
        return { tournaments }
    }
}
</script>
