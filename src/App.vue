<script setup>
import { ref } from 'vue'

const User = ref('')
const Password = ref('')
const Message = ref('')

function login() {
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user: User.value, password: Password.value })
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Network response was not ok')
        })
      }
      return response.json()
    })
    .then(data => {
      console.log('Success:', data)
      Message.value = data.status 
      localStorage.setItem('token', data.token) // Armazena o token no localStorage

      if (data.success) {
      User.value = ''
      Password.value = ''
      }
    })
    .catch((error) => {
      console.error('Error:', error)
      Message.value = error.message
    })
}

function testProtected() {
  const token = localStorage.getItem('token')

  fetch('http://localhost:3000/protected', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

async function testBackend() {
  try {
    const response = await fetch('http://localhost:3000/test')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<template>
  <h1>Sistema de Login</h1>
  <p :style="{ color: Message.includes('successful') ? 'green' : 'red' }">
  {{ Message }}
</p>
  <input v-model="User" type="text" placeholder="Usuário" />
  <input v-model="Password" type="password" placeholder="Senha" />
  <button @click="login">Entrar</button>
  <button @click="testBackend">Testar Backend</button>
</template>
