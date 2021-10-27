<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <template v-if="isLoggedIn">  
      <router-link to="/profile">Profile</router-link> |
      <button class="logout" @click="Logout">Log out</button>
    </template>
    <template v-if="!isLoggedIn">
      <router-link to="/login">Login</router-link>
    </template>
    <div>
      User: {{ userEmail }}
    </div>
  </div>
  <router-view/>
</template>

<script>
import { ref } from 'vue'
import firebase from 'firebase/compat/app'

export default {
  setup(){
    let userEmail = ref("")

    const isLoggedIn = ref(false)
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          isLoggedIn.value = true
          userEmail.value = user.email
        } else {
          isLoggedIn.value = false
        }
    })

    const Logout = () => {
      userEmail.value = "Nope"
      firebase
        .auth()
        .signOut()
        .catch(err => alert(err.message))
    }
    
    return { 
      userEmail, isLoggedIn, Logout
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
