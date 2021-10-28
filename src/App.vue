<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/tournaments">Tournaments</router-link> |
    <template v-if="isLoggedIn">  
      <router-link to="/createteam">Create Team</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <button class="logout" @click="Logout">Log out</button>
    </template>
    <template v-if="!isLoggedIn">
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Sign up</router-link>
    </template>

    <form action="" method="get">
      <input type="text" placeholder="Player" v-model="player" name="player">
      <button type="submit" @click.stop.prevent="submitPlayer()">Search</button>
    </form>
    <form action="" method="get">
      <input type="text" placeholder="Team" v-model="team" name="team">
      <button type="submit" @click.stop.prevent="submitTeam()">Search</button>
    </form>
  </div>
  <div v-if="invites.length != 0">
    <p>
      invites
    </p>
    <template v-for="inv in invites" :key="inv">
      <div>
        {{inv}}
        <button type="submit" @click.stop.prevent="acceptInv(inv)">Accept</button>
      </div>
    </template>
  </div>
  <hr>
  <router-view/>
</template>

<script>
import { ref } from 'vue'
import firebase from 'firebase/compat/app'
import { getUserById, acceptTeamInvite } from '@/main.js'

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
    
    return { 
      isLoggedIn, Logout, submitPlayer, submitTeam, player, team, invites, acceptInv
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
