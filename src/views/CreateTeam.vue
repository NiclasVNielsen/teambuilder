<template>
    <main>
        <div class="createContainer">
            <h1>
                Create Team
            </h1>
            <form @submit.prevent="create">
                <label for="name">Team Name</label>
                <input type="text" name="name" id="name" placeholder="name" v-model="name">
                <p>Team Logo</p>
                <file-input v-model="icon" is-image></file-input>
                <button type="submit">Create Team</button>
            </form>
        </div>
    </main>
</template>

<script>
import { ref } from 'vue'
import firebase from 'firebase/compat/app'
import { getAuth } from "firebase/auth";
import FileInput from 'vue3-simple-file-input'
import { teamLogoUpload, createTeam, getUserById } from '@/main.js'

export default{
    setup() {
        const name = ref('')
        const icon = ref('')

        const create = () => {
            const auth = getAuth();
            let user = auth.currentUser.uid;
            getUserById(user)
                .then(data => {
                    const imageName = `${new Date().getTime()}.png`
                    icon.value.fileName = imageName
                    teamLogoUpload(icon.value)
                    createTeam(name.value, imageName, data[0].lolName)
                })

        }

        //Nope you don't belong here check
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                window.location.href = '/login'
            }
        });

        return {
            create,
            name,
            icon
        }
    },
    components: {
        FileInput
    }
}
</script>

<style lang="sass" scoped>
main
    position: relative
    height: 87.5vh
    
.createContainer
    max-width: 500px
    width: 100%
    position: absolute
    left: 50%
    top: 20%
    transform: translateX(-50%)
    
form
    max-width: 500px
    margin: 0 auto

input, label, button, p
    display: block
    text-align: left
    width: 100%

label, p, button
    margin-top: 2vh

input, button
    font-size: 1em
    border: none
    padding: .5em
    border-radius: .2em

button
    text-align: center
    background: #00E000
    color: #fff
    &:hover        
        background: #090

</style>