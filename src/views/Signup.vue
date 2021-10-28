<template>
    <div class="login">
        <div>
            <h1>
                Sign up
            </h1>
            <form @submit.prevent="Signup">
                <div>
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email" placeholder="Email" v-model="email">
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" v-model="password">
                </div>
                <div>
                    <label for="text">Summoner Name</label>
                    <input type="text" name="name" id="name" placeholder="Summoner Name" v-model="name">
                </div>
                <div>
                    <label for="text">Rank</label>
                    <input type="text" name="rank" id="rank" placeholder="Rank" v-model="rank">
                </div>
                
                <p>
                    Lane Preference
                </p>
                <draggable  v-model="lanePref" item-key="id" @start="drag=true" @end="drag=false" id="lanePref">
                    <template #item="{element}">
                        <div>{{element.title}}</div>
                    </template>
                </draggable>
                <br>

                <select name="champions" id="champions" multiple>
                    <template v-for="(champs) in champions" :key="champs">
                        <option :value="champs">{{champs}}</option>
                    </template>
                </select>

                <button type="submit">Sign up</button>
            </form>
        </div>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createUser, getChampions } from '@/main.js'
import { ref } from 'vue'
import draggable from 'vuedraggable'

export default{
    components: {
        draggable,
    },
    data() {
        return {
            drag: false,
            lanePref: [
                {
                    'id': 1,
                    'title': 'top'
                },
                {
                    'id': 2,
                    'title': 'jungle'
                },
                {
                    'id': 3,
                    'title': 'mid'
                },
                {
                    'id': 4,
                    'title': 'adc'
                },
                {
                    'id': 5,
                    'title': 'support'
                }
            ]
        }
    },
    setup(){
        const email = ref('')
        const password = ref('')
        const userId = ref('')
        const name = ref('')
        const rank = ref('')
        const lanes = ref({
            champPool: {
                
                },
            prefLevel: {
                
                }
        })
        const champions = ref()

        getChampions()
            .then(data => {
                champions.value = data['champions']
            })

        const laneOrderCalc = () => {
            /* 
                Problem:  Not secure, the user can manipulate their front page and send uninteded data to the database
                Solution: Validate the data from the user
            */
            let laneOrder = document.querySelector('#lanePref').innerHTML
            laneOrder = laneOrder.split(/[<>]/g)
            laneOrder = [laneOrder[2], laneOrder[6], laneOrder[10], laneOrder[14], laneOrder[18]]
            lanes.value['prefLevel']['1'] = laneOrder[0]
            lanes.value['prefLevel']['2'] = laneOrder[1]
            lanes.value['prefLevel']['3'] = laneOrder[2]
            lanes.value['prefLevel']['4'] = laneOrder[3]
            lanes.value['prefLevel']['5'] = laneOrder[4]
            return laneOrder
        }

        const Signup = () => {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email.value, password.value)
              .then((userCredential) => {
                const user = userCredential.user;
                userId.value = user.uid
                laneOrderCalc()

                createUser(userId.value, name.value, rank.value, lanes.value)
              })
              .catch((error) => {
                console.error('Error code: ', error.code);
                console.error('Error message: ', error.message);
              });
        }

        return { email, password, Signup, name, rank, lanes, champions }
    },
}

</script>