<template>
  <main>
    <div class="create">
      <router-link to="/CreateTournament">Create Tournament</router-link>
    </div>
    <div v-for="tournament in tournaments" :key="tournament">
        <div v-if="user == tournament['owner'] && tournament['time'].split('-').join('')  < `${(new Date).getUTCFullYear()}${(new Date).getUTCMonth() + 1}${(new Date).getUTCDate()}`">
          <p>
            {{ tournament['name'] }}
          </p>
          <form action="">
            <label for="winner">Winner</label>
            <select name="winner" id="winner" v-model="winner">
              <template v-for="team in tournament['teams']" :key="team">
                <option :value="team">{{ team }}</option>
              </template>
            </select>
            <label for="looser">Looser</label>
            <select name="looser" id="looser" v-model="looser">
              <template v-for="team in tournament['teams']" :key="team">
                <option :value="team">{{ team }}</option>
              </template>
            </select>
            <button type="submit" @click.stop.prevent="createMatchInHistorie(winner, looser)">Create Match in Historie</button>
          </form>
        </div>
    </div>
    <hr>
    <div v-for="tournament in tournaments" :key="tournament" class="tournament">
        <div class="tournamentTitle">
          <div>
            <img class="tournamentIcon" alt="Tournament Icon">
          </div>
          <h3>
            {{ tournament['name'] }}
          </h3>
        </div>
        <div class="tournamentCrucialInfo">
          <div>
            Max Teams: {{ tournament['amountOfTeams'] }}
          </div>
          <div>
            Deadline: {{ tournament['signUpDeadline'] }}
          </div>
          <div>
            Starts: {{ tournament['time'] }}
          </div>
        </div>
        <div>
          {{ tournament['desc'] }}
        </div>
        <div class="tournamentTeams">
            Teams:
            <div v-for="team in tournament['teams']" :key="team">
                {{ team }}
            </div>
        </div>
        <template v-if="tournament['teams'].length < tournament['amountOfTeams'] && tournament['signUpDeadline'].split('-').join('')  > `${(new Date).getUTCFullYear()}${(new Date).getUTCMonth() + 1}${(new Date).getUTCDate()}`"><!-- && tournament['signUpDeadline'].seconds * 1000 > (new Date).getTime() -->
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
  </main>
</template>

<script>
import { onBeforeUpdate, ref } from 'vue'
import { getAllTournaments, getTeamsByOwner, signUpToTournament, getUserById, createMatch } from '@/main.js'
import { getStorage, ref as refrence, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

export default{
    setup() {
        const tournaments = ref('')
        const yourTeams = ref([])
        const user = ref('')

        onBeforeUpdate(() => {
          const auth = getAuth();
          const userId = auth.currentUser.uid;
          getUserById(userId)
            .then(data => {
              user.value = data[0].lolName
            })
        })

        const getTournamentIcon = (icon, index) =>{
          const storage = getStorage()
          getDownloadURL(refrence(storage, icon))
            .then(url => {
              document.querySelectorAll('.tournamentIcon')[index].src = url;
            })
        }

        getAllTournaments()
          .then(data => {
              tournaments.value = data
              tournaments.value.forEach((tournament, index) => {
                getTournamentIcon(tournament.icon, index)
              })
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

        const createMatchInHistorie = (winner, looser) => {
          if(winner != looser){
            createMatch(winner, looser)
          }
        }

        return { tournaments, yourTeams, signTeamUp, user, createMatchInHistorie }
    }
}
</script>

<style lang="sass" scoped>
  main
    position: relative

  .create
    position: absolute
    top: .5vh
    left: .5vh
    background: #0f0
    padding: 1vh 1vh
    border-radius: 2vh
    transition: 200ms
    &:hover
      background: #090
    a
      text-decoration: none
      color: #FFF
      display: block

  .tournament
    .tournamentTitle
      display: flex
      justify-content: center
      align-items: center
      font-size: 2em
    .tournamentCrucialInfo
      display: flex
      justify-content: center
      opacity: .8
      div
        padding: .5em
    .tournamentTeams
      margin-top: .5em
</style>