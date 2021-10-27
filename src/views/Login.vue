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
                .then(data => console.log("Brænder det?", data))
                .catch(err => alert(err.message))
        }
        return {
            Login,
            email,
            password
        }
    },
    name: 'Login',
}
</script>