<template>
    <div class="login">
        <div>
            <h1>
                Login
            </h1>
            <form @submit.prevent="Login">
                <label for="email">Email</label>
                <input type="text" name="email" id="email" placeholder="Email" v-model="email">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" v-model="password">
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import firebase from 'firebase/compat/app'

export default{
    setup() {
        const email = ref('')
        const password = ref('')
        const Login = () => {
            firebase
                .auth()
                .signInWithEmailAndPassword(email.value, password.value)
                .catch(err => alert(err.message))
        }

        //Nope you don't belong here check
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                window.location.href = '/'
            }
        });

        return {
            Login,
            email,
            password
        }
    },
    name: 'Login',
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