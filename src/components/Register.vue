<script setup>
import { ref } from 'vue'

const user = ref('')
const password = ref('')

async function register() {
    try {
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
            throw new Error(errorData.message || 'Registration failed')
        }
        const data = await response.json()
        console.log('Success:', data)
    } catch (error) {
        console.error('Error:', error)
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
        </div>
        <button type="submit">Register</button>
    </form>
</template>