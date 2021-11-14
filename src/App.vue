<template>
  <header>
    <figure class="logo">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="Logo">
      </router-link>
    </figure>
    <nav id="nav">
      <div class="links">
        <router-link to="/">Home</router-link>
        <template v-if="isLoggedIn">  
          <router-link to="/tournaments">Tournaments</router-link>
          <router-link to="/createteam">Create Team</router-link>
          <router-link to="/profile">Profile</router-link>
          <button class="logout" @click="Logout">Log out</button>
        </template>
        <template v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
          <router-link to="/signup">Sign up</router-link>
        </template>
      </div>

      <div class="search">
        <form action="" method="get">
          <input type="text" placeholder="Player" v-model="player" name="player" required>
          <button type="submit" @click.stop.prevent="submitPlayer()">🔍</button>
        </form>
        <form action="" method="get">
          <input type="text" placeholder="Team" v-model="team" name="team" required>
          <button type="submit" @click.stop.prevent="submitTeam()">🔍</button>
        </form>
      </div>
    </nav>
    <div v-if="invites.length != 0">
      <p>
        invites
      </p>
      <template v-for="inv in invites" :key="inv">
        <div>
          {{inv}}
          <button type="submit" @click.stop.prevent="acceptInv(inv)">Accept</button>
          <button type="submit" @click.stop.prevent="declineInv(inv)">Decline</button>
        </div>
      </template>
    </div>
  </header>
  <router-view/>
</template>

<script>
import { ref } from 'vue'
import firebase from 'firebase/compat/app'
import { getUserById, acceptTeamInvite, declineTeamInvite } from '@/main.js'

export default {
  setup(){
    const player = ref("")
    const team = ref("")
    const invites = ref("")
    const loggedInUser = ref("")
    const isLoggedIn = ref(false)

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          isLoggedIn.value = true
          getUserById(user.uid)
            .then(data => {
              invites.value = data[0].invitations
              loggedInUser.value = data[0].lolName
            })
        } else {
          isLoggedIn.value = false
        }
    })

    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .catch(err => alert(err.message))
    }

    const submitPlayer = () => {
      window.location.href = `/player/${player.value}`
    }

    const submitTeam = () => {
      window.location.href = `/team/${team.value}`
    }
    
    const acceptInv = (team) => {
      acceptTeamInvite(team, loggedInUser.value)
    }
    
    
    const declineInv = (team) => {
      declineTeamInvite(team, loggedInUser.value)
    }
    
    return { 
      isLoggedIn, Logout, submitPlayer, submitTeam, player, team, invites, acceptInv, declineInv
    }
  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box

#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center

body
  font-size: 18px
  background: #EAE1CD

img
  width: 100px
  height: auto

/* Header --------------------------------- */

header
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  align-items: center
  height: 7.5vh
  background: #000
  .logo
    height: 100%
    padding: 1.3vh
    img
      height: 100%
      width: auto
  #nav
    display: flex
    .links
      font-size: 1em
      color: #FFF
      display: flex
      align-items: center
      a, button
        color: inherit
        font-size: 1em
      button
        border: none
        background: none
        margin-right: 2.6vh
        cursor: pointer
      a
        text-decoration: none
        display: block
        margin: 0 1.3vh
    .search
      display: flex
      padding: 0 1.3vh
      form
        display: flex
        &:last-of-type
          margin-left: 1.3vh
        input, button
          height: 3.2vh
          font-size: .9em
          border: none
          background: #FFF
        input
          border-radius: 1.6vh 0 0 1.6vh
          padding-left: 1.4vh
          width: 10em
        button
          border-radius: 0 1.6vh 1.6vh 0
          padding-right: 1.4vh

@media screen and (max-width: 750px)
  header
    display: block
    height: auto
    .logo
      height: 80px
    #nav
      display: block
      .links
        display: block
        a
          margin: 2vh auto
      .search
        flex-direction: column
        form
          margin: 2vh auto
          &:last-of-type
            margin: 2vh auto
          input, button
            padding: 2vh
            height: auto

</style>
