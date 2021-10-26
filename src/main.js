import { collection, query, getDocs } from "firebase/firestore";
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
/*const ranksCollection = db.collection('ranks')
/*const teamsCollection = db.collection('teams')
/*const tournamentsCollection = db.collection('tournaments')
/*const usersCollection = db.collection('users') 
/*const matchesCollection = db.collection('matches')*/


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


export const getAllMatches = async () => {
    try {
        const matches = []

        let q = query(collection(db, "matches"));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            matches.push(doc.data())
        });

        console.log(matches)

        return matches
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}



export const getMatchesByPlayer = async (player) => {
    try {
        const matches = []

        const q = query(collection(db, "matches"));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            for(let i = 1; i < 11; i++){
                if(doc.data().players[i]['name'] == player){
                    matches.push(doc.data())
                }
            }
        });
        console.log(matches)
        return matches
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}


export const getMatchesByTeam = async (team) => {
    try {
        const matches = []

        const q = query(collection(db, "matches"));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            for(let i = 1; i < 3; i++){
                if(doc.data().teams[i] == team){
                    matches.push(doc.data())
                }
            }
        });
        console.log(matches)
        return matches
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}


export const getRanks = async () => {
    try {
        let ranks;

        const q = query(collection(db, "ranks"));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            ranks = doc.data()
        });

        console.log(ranks[1]) /*TESTING*/

        return ranks
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}


createApp(App).use(store).use(router).mount('#app')

