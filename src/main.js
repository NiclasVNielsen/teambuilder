import { collection, query, where, getDocs/* , doc, setDoc */ } from "firebase/firestore"
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'



var config = {
    apiKey: "AIzaSyD46rcoZYKcuKVn0tSJ64zsGXvxVbt6cHU",
    authDomain: "teambuilder-f3a0f.firebaseapp.com",
    projectId: "teambuilder-f3a0f",
    storageBucket: "teambuilder-f3a0f.appspot.com",
    messagingSenderId: "1006369768476",
    appId: "1:1006369768476:web:3d1dd4b3f1d12e37d20bd9"
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()




const championsCollection = db.collection('champions')
const usersCollection = db.collection('users') 
const teamsCollection = db.collection('teams')
/*const ranksCollection = db.collection('ranks')
/*const tournamentsCollection = db.collection('tournaments')
/*const matchesCollection = db.collection('matches')*/


export const getChampions = async () => {
    try {
        const champions = await championsCollection.doc("QhLJT5VYNbWjpDAkWJXE").get()
        return champions.exists ? champions.data() : null
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}


export const getAllMatches = async () => {
    try {
        const matches = []

        let q = query(collection(db, "matches"))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            matches.push(doc.data())
        })

        return matches
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}



export const getMatchesByPlayer = async (player) => {
    try {
        const matches = []

        const q = query(collection(db, "matches"))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            for(let i = 1; i < 11; i++){
                if(doc.data().players[i]['name'] == player){
                    matches.push(doc.data())
                }
            }
        })

        return matches
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}


export const getMatchesByTeam = async (team) => {
    try {
        const matches = []

        const q = query(collection(db, "matches"))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            for(let i = 1; i < 3; i++){
                if(doc.data().teams[i] == team){
                    matches.push(doc.data())
                }
            }
        })
        
        return matches
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}


export const getRanks = async () => {
    try {
        let ranks

        const q = query(collection(db, "ranks"))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            ranks = doc.data()
        })

        return ranks
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}


export const getAllTeams = async () => {
    try {
        const teams = []

        let q = query(collection(db, "teams"))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            teams.push(doc.data())
        })

        return teams
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}

export const getTeamsByPlayer = async (player) => {
    try {
        const teams = []

        const q = query(collection(db, "teams"))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            for(let i = 0; i < 5; i++){
                if(doc.data().members[i] == player){
                    teams.push(doc.data())
                }
            }
        })

        return teams
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}

export const getTeamByName = async (name) => {
    try {
        const team = []

        let q = query(collection(db, "teams"), where("teamName", "==", name))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            team.push(doc.data())
        })

        return team
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}

export const createTeam = async (name, icon, owner) => {
    return teamsCollection.add({
        teamName: name,
        teamIcon: icon,
        teamOwner: owner,
        members: [owner]
    })
}


export const getAllTournaments = async () => {
    try {
        const tournaments = []

        let q = query(collection(db, "tournaments"))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            tournaments.push(doc.data())
        })

        return tournaments
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}


export const getAllUsers = async () => {
    try {
        const users = []

        let q = query(collection(db, "users"))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        })

        return users
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}

export const getUserById = async (id) => {
    try {
        const user = []

        let q = query(collection(db, "users"), where("authId", "==", id))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            user.push(doc.data())
        })

        return user
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}

export const getUserByName = async (name) => {
    try {
        const user = []

        let q = query(collection(db, "users"), where("lolName", "==", name))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            user.push(doc.data())
        })

        return user
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}

export const createUser = async (userId, name, rank, lanes) => {
    return usersCollection.add({
        authId: userId,
        lolName: name,
        rank: rank,
        lanes: lanes
    })
}

export const teamLogoUpload = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `${file.fileName}`);

    uploadBytes(storageRef, file.file).then(() => {
        console.log('BLOB');
    });
}

export const sendTeamInvite = async (team, player) => {
    try {
        //needs to check if player is already in the team
        const user = []
        const invites = []

        let q = query(collection(db, "users"), where("lolName", "==", player))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            user.push(doc.id)
            invites.push(doc.data().invitations)
        })

        invites[0].push(team)

        usersCollection.doc(user[0]).update({
            invitations: invites[0]
        });
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}

export const acceptTeamInvite = async (team, player) => {
    try {        
        const teams = []
        const members = []

        let q = query(collection(db, "teams"), where("teamName", "==", team))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            teams.push(doc.id)
            members.push(doc.data().members)
        })


        members[0].push(player)

        teamsCollection.doc(teams[0]).update({
            members: members[0]
        });

        //clean invs from team
        const user = []
        const invites = []

        let x = query(collection(db, "users"), where("lolName", "==", player))
    
        const querySnapshotx = await getDocs(x)
        querySnapshotx.forEach((doc) => {
            user.push(doc.id)
            invites.push(doc.data().invitations)
        })

        const newInvs = []

        invites[0].forEach(inv => {
            if(inv != team){
                newInvs.push(inv)
            }
        })

        //needs to refresh when done to clear it for the user

        usersCollection.doc(user[0]).update({
            invitations: newInvs
        });
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}

createApp(App).use(store).use(router).mount('#app')

