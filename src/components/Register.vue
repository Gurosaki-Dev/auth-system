<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref('')
const password = ref('')
const message = ref('')
const router = useRouter()

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
            throw new Error(errorData.message)
        }
        const data = await response.json()
        message.value = data.message

        router.push('/')
    } catch (error) {
        message.value = 'Registration failed'
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