<template>
    <div class="login">
        <div>
            <h1>
                Create Team
            </h1>
            <form @submit.prevent="createTeam">
                <label for="name">Team Name</label>
                <input type="text" name="name" id="name" placeholder="name" v-model="name">
                <button type="submit">Create Team</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import firebase from 'firebase/compat/app'

export default{
    setup() {
        const name = ref('')

        const createTeam = () => {
            console.log(name.value)
        }

        //Nope you don't belong here check
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                window.location.href = '/login'
            }
        });

        return {
            createTeam,
            name
        }
    },
    name: 'Login',
}
</script>