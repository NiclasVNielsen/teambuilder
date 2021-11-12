<template>
    <div>
        <div>
            <h1>
                Create Team
            </h1>
            <form @submit.prevent="create">
                <label for="name">Team Name</label>
                <input type="text" name="name" id="name" placeholder="name" v-model="name">
                <file-input v-model="icon" is-image></file-input>
                <button type="submit">Create Team</button>
            </form>
        </div>
    </div>
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

</style>