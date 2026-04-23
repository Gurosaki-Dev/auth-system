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
      console.log('Success:', data)
      message.value = data.status 
      localStorage.setItem('token', data.token) // Armazena o token no localStorage

      if (data.success) {
      user.value = ''
      password.value = ''
      }
  } catch (error) {
    console.error('Error:', error)
    message.value = error.message
  }
}

async function testProtected() {
  const token = localStorage.getItem('token')

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/protected`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}

async function testBackend() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/test`)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<template>
  <h1>Sistema de Login</h1>
  <p :style="{ color: message.includes('successful') ? 'green' : 'red' }">
  {{ message }}
</p>
  <input v-model="user" type="text" placeholder="Usuário" />
  <input v-model="password" type="password" placeholder="Senha" />
  <button @click="login">Entrar</button>
  <button @click="testBackend">Testar Backend</button>
</template>
