<template>
  <div class="team">
    <div>
      <img class="teamIcon" alt="team icon">
    </div>
    <h2>
      {{ name }}
    </h2>
  </div>
  <div v-if="user == owner" class="invite">
    <form>
      <input type="text" placeholder="Player" v-model="invPlayer" name="player">
      <button type="submit" @click.stop.prevent="invite()">Invite</button>
    </form>
  </div>
  <div class="playerContainer container">
      <template v-for="(member, index) in members" :key="member">
          <div>
            <p>
              <template v-if="member == owner">
                  Owner
              </template>
              &nbsp;
            </p>
            <img :src="require('@/assets/championsFull/' + champPortraits[index] + '_0.jpg')" alt="Champion Art">
            <p>
              <a :href="'/player/' + member">{{ member }}</a>
            </p>
          </div>
      </template>
  </div>
  <div>
    <div class="containerVert match" v-for="(match) in matches" :key="match" v-bind:class="{
      'won': name == match['teams'][match['winner']]
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
import { onBeforeUpdate, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getTeamByName, getMatchesByTeam, getUserById, sendTeamInvite, getUserByName } from '@/main.js'
import { getAuth } from "firebase/auth";
import { getStorage, ref as refrence, getDownloadURL } from "firebase/storage";

export default{
    setup() {        
        const getTeamIcon = (icon) =>{
          const storage = getStorage()
          getDownloadURL(refrence(storage, icon))
            .then(url => {
              document.querySelector('.teamIcon').src = url;
            })
        }

        const route = useRoute()

        let name = ref('')
        let icon = ref('')
        let members = ref('')
        let matches = ref('')
        let owner = ref('')
        let user = ref('')
        let player = ref('')
        let invPlayer = ref('')
        let champPortraits = ref([])

        onBeforeUpdate(() => {
          const auth = getAuth();
  
          getUserById(auth.currentUser.uid)
            .then(data => {
              user.value = data[0].lolName
            })
        })

        getTeamByName(route.params.teamname)
            .then(data => {
                name.value = data[0].teamName
                icon.value = data[0].teamIcon
                members.value = data[0].members
                owner.value = data[0].teamOwner
                members.value.forEach(member => {
                  getUserByName(member)
                    .then(userData => {
                      console.log(userData.length)
                      if(userData.length == 0){
                        champPortraits.value.push('Yasuo')
                      }else{
                        champPortraits.value.push(userData[0].lanes.champPool[1])
                      }
                    })
                    console.log(champPortraits.value)
                })

                getTeamIcon(icon.value)
                
                getMatchesByTeam(data[0].teamName)
                    .then(data => {
                        matches.value = data
                    })
            })

        const invite = () => {
          sendTeamInvite(name.value, invPlayer.value)
        }

        return {
            name, members, matches, owner, user, invite, player, invPlayer, champPortraits
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
  
  .team
    display: flex
    justify-content: center
    align-items: center
    margin: 2vh 0
    .teamIcon
      margin-right: 1em

  .invite
    margin-bottom: 2vh

  .playerContainer
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
        a
          color: #FFF
          text-decoration: none

  
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
  

  .won
    background: #0F0 !important
  
</style>