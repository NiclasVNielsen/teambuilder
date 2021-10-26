import { collection, query, where, getDocs } from "firebase/firestore";
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

/* export const getMatches = async () => {
    try {
        const matches = await matchesCollection.get().then()
        return matches.exists ? matches.data() : null
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}

console.log(getMatches()) */


export const getAllMatches = async () => {
    try {
        let q = query(collection(db, "matches"));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}
//getAllMatches()



export const getMatchesByPlayer = async (player) => {
    try {
        const q = query(collection(db, "matches"), 
            where("players.1.name", "==", player) ||
            where("players.2.name", "==", player) ||
            where("players.3.name", "==", player) ||
            where("players.4.name", "==", player) ||
            where("players.5.name", "==", player) ||
            where("players.6.name", "==", player) ||
            where("players.7.name", "==", player) ||
            where("players.8.name", "==", player) ||
            where("players.9.name", "==", player) ||
            where("players.10.name", "==", player)
        );
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}
//getMatchesByPlayer("topMonkey")


export const getMatchesByTeam = async (team) => {
    try {
        console.log('meow')
        const q = query(collection(db, "matches"), 
            where("players.1.name", "==", team)
        );
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}


createApp(App).use(store).use(router).mount('#app')

