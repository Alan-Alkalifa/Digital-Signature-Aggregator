<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../../types/auth'

const router = useRouter()
const isLoading = ref(false)
const email = ref('')
const password = ref('')
const errorMsg = ref('')

const goToDashboard = (e: Event) => {
  e.preventDefault()
  isLoading.value = true
  errorMsg.value = ''

  setTimeout(() => {
    if (login(email.value, password.value)) {
      router.push('/MainDashboard')
    } else {
      errorMsg.value = 'Incorrect email or password'
    }
    isLoading.value = false
  }, 1000)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md rounded-2xl shadow-lg">
      <!-- Logo and title -->
      <div class="mb-6 flex justify-between">
        <img src="/Icon/Logo.svg" alt="Logo" class="ml-10 mb-2" />
        <img src="/Icon/TransparentLogo.svg" class="" alt="Transparent Logo" />
      </div>

      <!-- Welcome text -->
      <div class="mb-6 mx-10">
        <h3 class="text-2xl font-semibold text-[#101840] mb-1">Hi, Welcome</h3>
        <p class="text-sm text-[#8F95B2]">It’s good to see you again</p>
      </div>

      <!-- Form -->
      <form class="space-y-4 mx-10">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email<span>*</span></label>
          <input type="email" v-model="email" placeholder="Input your email" class="" />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password<span>*</span></label>
          <div class="relative">
            <input type="password" v-model="password" placeholder="Input your password" class="" />
            <span class="absolute inset-y-0 right-3 flex items-center cursor-pointer">
              <!-- Eye icon (use Heroicons or similar) -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
          <p v-if="errorMsg" class="text-red-500 my-4 text-sm">{{ errorMsg }}</p>
        </div>

        <!-- Forgot password -->
        <div class="text-left text-sm">
          <RouterLink to="" href="#" class="text-[#696F8C]"
            >Forgot your password?
            <span class="font-medium hover:underline text-[#0172CB]">Click here</span></RouterLink
          >
        </div>

        <!-- Login button -->
        <button
          @click="goToDashboard"
          type="submit"
          :disabled="isLoading"
          class="w-full bg-[#0172CB] opacity-50 text-white py-2 rounded-lg font-semibold flex justify-center items-center gap-2 group"
          :class="
            isLoading ? 'opacity-50 py-2 w-full gap-2 cursor-not-allowed' : 'hover:opacity-100'
          "
        >
          <img
            src="/Icon/Loading.svg"
            alt="Loading"
            class="duration-300 group-hover:rotate-180"
            v-if="isLoading"
          />
          <span>{{ isLoading ? '' : 'Login' }}</span>
        </button>
      </form>

      <!-- Register link -->
      <p class="text-center text-sm text-[#696F8C] my-6">
        Don’t have an account?
        <RouterLink to="" class="text-[#0172CB] font-medium hover:underline">Register</RouterLink>
      </p>
    </div>
  </div>
</template>
