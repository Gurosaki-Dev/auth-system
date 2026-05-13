<script setup>
import { ref } from 'vue'

const user = ref('')
const password = ref('')
const message = ref('')

async function register() {
    try {
        console.log(import.meta.env.VITE_API_URL)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user.value,
                password: password.value
            })
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        const data = await response.json()
        message.value = data.message
    } catch (error) {
        message.value = 'Registration failed'
        console.error('Error name:', error.name)
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
    }
}
</script>

<template>
    <h1>Register</h1>
    <form @submit.prevent="register">
        <div>
            <label for="user">Username</label>
            <input type="text" id="user" v-model="user" />
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" />
            <p>{{ message }}</p>
        </div>
        <button type="submit">Register</button>
    </form>
    <RouterLink to="/">Já tenho uma conta</RouterLink>
</template>