// src/stores/auth.ts
import { ref, computed } from 'vue'

const AUTH_KEY = 'isAuthenticated'

const stored = localStorage.getItem(AUTH_KEY)
export const isAuthenticated = ref(stored === 'true')

// Dummy login logic
export function login(email: string, password: string): boolean {
  if (email === 'admin@example.com' && password === 'password123') {
    isAuthenticated.value = true
    localStorage.setItem(AUTH_KEY, 'true') // persist login
    return true
  }
  return false
}

export function logout() {
  isAuthenticated.value = false
  localStorage.removeItem(AUTH_KEY)
}
