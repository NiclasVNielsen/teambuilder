<template>
    <div class="login">
        <div>
            <h1>
                Sign up
            </h1>
            <form @submit.prevent="Signup">
                <label for="email">Email</label>
                <input type="text" name="email" id="email" placeholder="Email" v-model="email">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" v-model="password">
                
                <label for="text">Summoner Name</label>
                <input type="text" name="name" id="name" placeholder="Summoner Name" v-model="name">
                <label for="text">Rank</label>
                <input type="text" name="rank" id="rank" placeholder="Rank" v-model="rank">
                <!-- <label for="text">lanes</label>
                <input type="text" name="email" id="email" placeholder="Email" v-model="email"> -->
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
//import firebase from 'firebase/compat/app'
//import { getDatabase, ref as firebaseRef, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from '@/main.js'
import { ref } from 'vue'

export default{
    setup(){
        const email = ref('')
        const password = ref('')
        const userId = ref('')
        const name = ref('')
        const rank = ref('')
        const lanes = ref('')

        //Nope you don't belong here check
        /* firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                window.location.href = '/'
            }
        }); */

        const Signup = () => {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email.value, password.value)
              .then((userCredential) => {
                const user = userCredential.user;
                userId.value = user.uid

                console.log(user)
                console.log(user.uid)

                createUser(userId.value, name.value, rank.value, lanes.value)
              })
              .catch((error) => {
                console.error('Error code: ', error.code);
                console.error('Error message: ', error.message);
              });
        }


        /* function createUserData(userId, name, rank, lanes) {
            console.log('Meep', userId, name, rank, lanes)
            const db = getDatabase();
            set(firebaseRef(db, 'users/' + userId), {
                authId: userId,
                lolName: name,
                rank: rank,
                lanes : lanes
            });
        } */

        return { email, password, Signup, name, rank, lanes }
    }
}

</script>