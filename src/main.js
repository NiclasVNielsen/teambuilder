import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'



var config = {
    apiKey: "AIzaSyD46rcoZYKcuKVn0tSJ64zsGXvxVbt6cHU",
    authDomain: "teambuilder-f3a0f.firebaseapp.com",
    projectId: "teambuilder-f3a0f",
    storageBucket: "teambuilder-f3a0f.appspot.com",
    messagingSenderId: "1006369768476",
    appId: "1:1006369768476:web:3d1dd4b3f1d12e37d20bd9"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore()




const championsCollection = db.collection('champions')
/*const matchesCollection = db.collection('matches')
/*const ranksCollection = db.collection('ranks')
/*const teamsCollection = db.collection('teams')
/*const tournamentsCollection = db.collection('tournaments')
/*const usersCollection = db.collection('users') */


/* Fine italian pasta ---------------------------------------------------*/

export const getChampions = async () => {
    try {
        const champions = await championsCollection.doc("QhLJT5VYNbWjpDAkWJXE").get().then()
        return champions.exists ? champions.data() : null
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}

export const champs = getChampions()
    .then(champions => champions.champions[Math.floor(Math.random() * 157)])
    .catch(err => console.error('This is burning🔥 ', err))

/* End of spagetti code---------------------------------------------------*/

createApp(App).use(store).use(router).mount('#app')