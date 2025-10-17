<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useDarkMode } from '../composables/useDarkMode'

const router = useRouter()
const { user, logout } = useAuth()
const { isDark, toggleDarkMode } = useDarkMode()

// État du chat
const messages = ref<Array<{ role: 'user' | 'assistant'; content: string }>>([
  {
    role: 'assistant',
    content: 'Bonjour ! Je suis Claude Haiku, votre assistant IA. Comment puis-je vous aider aujourd\'hui ?'
  }
])
const newMessage = ref('')
const isTyping = ref(false)
const sidebarOpen = ref(true)

// Envoyer un message
const sendMessage = async () => {
  if (!newMessage.value.trim() || isTyping.value) return

  const userMsg = newMessage.value
  messages.value.push({ role: 'user', content: userMsg })
  newMessage.value = ''
  isTyping.value = true

  // Simule une réponse de l'assistant
  setTimeout(() => {
    messages.value.push({
      role: 'assistant',
      content: `Vous avez dit : "${userMsg}". C'est une excellente question ! En tant qu'assistant IA, je suis là pour vous aider.`
    })
    isTyping.value = false
  }, 1000)
}

// Déconnexion
const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="flex h-screen bg-slate-50 dark:bg-slate-950">
    
    <!-- 📱 Sidebar -->
    <aside
      :class="[
        'w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
      class="fixed md:relative h-full z-20"
    >
      <!-- Header sidebar -->
      <div class="p-4 border-b border-slate-200 dark:border-slate-800">
        <button class="w-full flex items-center gap-3 px-4 py-3 bg-primary-50 dark:bg-primary-950/50 hover:bg-primary-100 dark:hover:bg-primary-950 text-primary-700 dark:text-primary-400 rounded-xl transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <span class="font-medium">Nouvelle conversation</span>
        </button>
      </div>

      <!-- Liste des conversations -->
      <div class="flex-1 overflow-y-auto p-4 space-y-2">
        <div class="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl cursor-pointer transition-colors group">
          <p class="text-sm font-medium text-slate-900 dark:text-white truncate">
            Conversation actuelle
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-500 mt-1">
            Il y a quelques instants
          </p>
        </div>
        
        <div class="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors">
          <p class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
            Aide sur Python
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-500 mt-1">
            Hier
          </p>
        </div>

        <div class="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors">
          <p class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
            Idées de projet
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-500 mt-1">
            Il y a 2 jours
          </p>
        </div>
      </div>

      <!-- User info et actions -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <!-- Toggle dark mode -->
        <button
          @click="toggleDarkMode"
          class="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-300"
        >
          <svg v-if="isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
          </svg>
          <span class="text-sm">{{ isDark ? 'Mode clair' : 'Mode sombre' }}</span>
        </button>

        <!-- User -->
        <div class="flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {{ user?.name?.[0]?.toUpperCase() || 'U' }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-slate-900 dark:text-white truncate">
              {{ user?.name || 'Utilisateur' }}
            </p>
          </div>
        </div>

        <!-- Logout -->
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span class="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>

    <!-- 💬 Zone de chat principale -->
    <main class="flex-1 flex flex-col">
      
      <!-- Header -->
      <header class="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-4">
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <svg class="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <h1 class="text-lg font-semibold text-slate-900 dark:text-white">
          Claude Haiku
        </h1>
      </header>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-6">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="[
            'flex gap-4',
            msg.role === 'user' ? 'justify-end' : 'justify-start'
          ]"
        >
          <!-- Avatar assistant -->
          <div
            v-if="msg.role === 'assistant'"
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center flex-shrink-0"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>

          <!-- Bulle de message -->
          <div
            :class="[
              'max-w-2xl rounded-2xl px-5 py-3 shadow-sm',
              msg.role === 'user'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
            ]"
          >
            <p class="text-sm leading-relaxed">{{ msg.content }}</p>
          </div>

          <!-- Avatar user -->
          <div
            v-if="msg.role === 'user'"
            class="w-10 h-10 rounded-xl bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 font-semibold flex-shrink-0"
          >
            {{ user?.name?.[0]?.toUpperCase() || 'U' }}
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="flex gap-4">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3 flex items-center gap-2">
            <div class="flex gap-1">
              <div class="w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form @submit.prevent="sendMessage" class="max-w-4xl mx-auto">
          <div class="flex gap-3 items-end">
            <div class="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary-500 dark:focus-within:ring-primary-600 transition-all">
              <textarea
                v-model="newMessage"
                placeholder="Écrivez votre message..."
                rows="1"
                class="w-full px-4 py-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 resize-none outline-none"
                @keydown.enter.exact.prevent="sendMessage"
              ></textarea>
            </div>
            <button
              type="submit"
              :disabled="!newMessage.trim() || isTyping"
              class="p-3 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none transition-all"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>