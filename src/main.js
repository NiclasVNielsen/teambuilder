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
const tournamentsCollection = db.collection('tournaments')
const matchesCollection = db.collection('matches')


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
            for(let i = 0; i < 10; i++){
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

export const getTeamsByOwner = async (player) => {
    try {
        const teams = []

        const q = query(collection(db, "teams"))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            if(doc.data().teamOwner == player){
                teams.push(doc.data())
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
        const members = []

        let x = query(collection(db, "teams"), where("teamName", "==", team))
    
        const querySnapshotx = await getDocs(x)
        querySnapshotx.forEach((doc) => {
            members.push(doc.data().members)
        })

        let alreadyInTeam = false
        members[0].forEach(member => {
            if(member == player){
                alreadyInTeam = true
            }
        })

        if(alreadyInTeam == false){
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

        if(members[0].length < 5){
            members[0].push(player)
    
            teamsCollection.doc(teams[0]).update({
                members: members[0]
            });
        } else {
            console.log('Ehhh nope to many players already')
        }


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

export const declineTeamInvite = async (team, player) => {
    try {        
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


export const signUpToTournament = async (tournament, team) => {
    try {        
        const tournaments = []
        const teams = []
        console.log('Me me here')

        let q = query(collection(db, "tournaments"), where("name", "==", tournament))
    
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            tournaments.push(doc.id)
            teams.push(doc.data().teams)
        })
        teams[0].push(team)
        
        tournamentsCollection.doc(tournaments[0]).update({
            teams: teams[0]
        });
    } 

    catch {
        err => console.error('This is burning🔥 ', err)
    }
}

export const createTournament = async (name, icon, owner, desc, amountOfTeams, signUpDeadline, time) => {
    return tournamentsCollection.add({
        name: name,
        icon: icon,
        owner: owner,
        desc: desc,
        amountOfTeams: amountOfTeams,
        signUpDeadline: signUpDeadline,
        time: time,
        teams: []
    })
}

export const createMatch = async (winner, looser) => {
    const players = []

    let q = query(collection(db, "teams"), where("teamName", "==", winner))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        doc.data().members.forEach(member => {
            players.push({
                name: member,
                team: 1
            })
        })
    })
    let x = query(collection(db, "teams"), where("teamName", "==", looser))

    const querySnapshotx = await getDocs(x)
    querySnapshotx.forEach((doc) => {
        doc.data().members.forEach(member => {
            players.push({
                name: member,
                team: 2
            })
        })
    })

    return matchesCollection.add({
        players: players,
        teams: {
            1: winner,
            2: looser
        },
        time: new Date,
        winner: 1
    })
}

createApp(App).use(store).use(router).mount('#app')

