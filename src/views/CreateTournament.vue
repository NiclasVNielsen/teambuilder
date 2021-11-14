<template>
    <div>
        <div>
            <h1>
                Create Tournament
            </h1>
            <form @submit.prevent="create">
                <label for="name">Tournament Name</label>
                <input type="text" name="name" id="name" placeholder="name" v-model="name">
                <p>Tournament Icon</p>
                <file-input v-model="icon" is-image></file-input>
                <label for="desc">Description</label>
                <input type="text" name="desc" id="desc" placeholder="Description" v-model="desc">
                <label for="desc">Amount of Teams</label>
                <input type="number" name="amountOfTeams" id="amountOfTeams" v-model="amountOfTeams">
                <label for="deadLine">Dead Line</label>
                <input type="date" name="deadLine" id="deadLine" v-model="deadLine">
                <label for="startDate">Start Date</label>
                <input type="date" name="startDate" id="startDate" v-model="startDate">
                <button type="submit">Create Tournament</button>
            </form>
        </div>
    </div>
</template>

<script>
import FileInput from 'vue3-simple-file-input'
import { ref } from 'vue'
import { getAuth } from "firebase/auth";
import { getUserById, createTournament, teamLogoUpload } from '@/main.js'

export default{
    setup() {
        const name = ref('')
        const icon = ref('')
        const desc = ref('')
        const amountOfTeams = ref(8)
        const deadLine = ref('')
        const startDate = ref('')
        //const teams = ref([])

        const create = () => {
            const auth = getAuth();
            let user = auth.currentUser.uid;
            getUserById(user)
                .then(data => {
                    const imageName = `${new Date().getTime()}.png`
                    icon.value.fileName = imageName
                    teamLogoUpload(icon.value)
                    createTournament(name.value, imageName, data[0].lolName, desc.value, amountOfTeams.value, deadLine.value, startDate.value)
                                   //name,       icon,      owner,           desc,       amountOfTeams,       signUpDeadline, time
                })

        }
        return { name, icon, desc, amountOfTeams, deadLine, startDate, create }
    },
    components: {
        FileInput
    }
}
</script>

<style lang="sass" scoped>
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
