<template>
  <div class="profile">
    This is you!
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'

export default{
    setup() {
        //Nope you don't belong here check
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                window.location.href = '/login'
            }
        });
    }
}
</script>