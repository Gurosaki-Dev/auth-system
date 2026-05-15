<script setup>
import { ref } from 'vue'

const user = ref('')
const password = ref('')
const message = ref('')

async function login() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: user.value, password: password.value })
    })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }
    const data = await response.json()
      message.value = data.status 
      localStorage.setItem('token', data.token) // Armazena o token no localStorage

      if (data.success) {
      user.value = ''
      password.value = ''
      }
  } catch (error) {
    message.value = error.message
  }
}
</script>

<template>
  <h1>Login System</h1>
  <p :style="{ color: message.includes('successful') ? 'green' : 'red' }">
  {{ message }}
  </p>
  <input v-model="user" type="text" placeholder="User" />
  <input v-model="password" type="password" placeholder="Password" />
  <button @click="login">Enter</button>
  <RouterLink to="/register">Criar conta</RouterLink>
</template>