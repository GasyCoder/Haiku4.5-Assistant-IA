<!-- ================================
     src/pages/ChatPage.vue
     Page principale du chat
     Affichée après la connexion
     ================================ -->

<template>
  <!-- 🎨 Conteneur flex: Sidebar + Chat -->
  <div class="flex h-screen bg-white dark:bg-slate-950">
    
    <!-- ================================
         📍 SIDEBAR (Gauche)
         ================================ -->
    <div class="w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col">
      
      <!-- ================================
           📌 HEADER SIDEBAR: Logo
           ================================ -->
      <div class="p-4 border-b border-slate-200 dark:border-slate-800">
        <router-link to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">CH</span>
          </div>
          <span class="font-semibold text-slate-900 dark:text-white">Claude Haiku</span>
        </router-link>
      </div>

      <!-- ================================
           ➕ BOUTON: Nouveau Chat
           ================================ -->
      <div class="p-4 border-b border-slate-200 dark:border-slate-800">
        <button
          @click="resetChat"
          class="w-full px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
        >
          <!-- Icône Plus -->
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nouveau chat
        </button>
      </div>

      <!-- ================================
           📜 HISTORIQUE DES CHATS
           ================================ -->
      <div class="flex-1 overflow-y-auto p-4 space-y-2">
        <!-- Titre "Historique" -->
        <p class="text-xs font-medium text-slate-500 uppercase px-2">Historique</p>
        <!-- Message si vide -->
        <div class="text-sm text-slate-600 dark:text-slate-400 p-2">
          Aucun historique pour le moment
        </div>
      </div>

      <!-- ================================
           👤 SECTION UTILISATEUR (Bas sidebar)
           ================================ -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        
        <!-- 🌙 Bouton Mode Dark/Light -->
        <button
          @click="toggleDarkMode"
          class="w-full px-4 py-2 text-left text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
        >
          <!-- Icône lune (mode dark) -->
          <svg v-if="!isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <!-- Icône soleil (mode light) -->
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.121-10.121l1.414-1.414a1 1 0 00-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414zM5.464 5.464l1.414-1.414a1 1 0 00-1.414-1.414L4.05 4.05a1 1 0 001.414 1.414zM5.464 14.536l-1.414 1.414a1 1 0 001.414 1.414l1.414-1.414a1 1 0 00-1.414-1.414z" clip-rule="evenodd" />
          </svg>
          {{ isDark ? 'Mode clair' : 'Mode sombre' }}
        </button>

        <!-- 🚪 Bouton Déconnexion -->
        <button
          @click="logout"
          class="w-full px-4 py-2 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
        >
          <!-- Icône sortie -->
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Déconnexion
        </button>
      </div>
    </div>

    <!-- ================================
         💬 ZONE CHAT PRINCIPALE (Droite)
         ================================ -->
    <div class="flex-1 flex flex-col">
      
      <!-- ================================
           📱 ZONE DES MESSAGES
           ================================ -->
      <div
        ref="messagesContainer"
        class="flex-1 overflow-y-auto px-6 py-6 space-y-4"
      >
        
        <!-- ✨ MESSAGE DE BIENVENUE (Si aucun message) -->
        <div v-if="messages.length === 0" class="flex items-center justify-center h-full">
          <div class="text-center">
            <!-- Icône -->
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <!-- Salutation personnalisée -->
            <h2 class="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
              Bonjour {{ user?.name }}
            </h2>
            <!-- Sous-texte -->
            <p class="text-slate-600 dark:text-slate-400">
              Comment puis-je vous aider aujourd'hui?
            </p>
          </div>
        </div>

        <!-- ================================
             💬 AFFICHAGE DES MESSAGES
             ================================ -->
        <transition-group name="fade">
          <!-- Boucle sur tous les messages -->
          <div
            v-for="(msg, index) in messages"
            :key="`msg-${index}`"
            :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']"
          >
            <!-- Bulle du message -->
            <div
              :class="[
                'max-w-md px-4 py-3 rounded-lg',
                // Si c'est un message utilisateur: bleu primaire à droite
                msg.role === 'user'
                  ? 'bg-primary-600 text-white rounded-br-none'
                  // Sinon: gris/blanc à gauche
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none'
              ]"
            >
              <p class="text-sm leading-relaxed break-words">{{ msg.content }}</p>
            </div>
          </div>

          <!-- ⏳ INDICATEUR DE CHARGEMENT (Spinner) -->
          <div v-if="loading" key="loading" class="flex justify-start">
            <div class="bg-slate-100 dark:bg-slate-800 rounded-lg rounded-bl-none px-4 py-3">
              <!-- 3 points qui sautent -->
              <div class="flex gap-2">
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- ================================
           ⚠️ ZONE D'ERREUR
           ================================ -->
      <transition name="fade">
        <div v-if="error" class="mx-6 mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div class="flex items-start gap-3">
            <!-- Icône d'erreur -->
            <svg class="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <!-- Texte d'erreur -->
            <div>
              <p class="text-sm font-medium text-red-800 dark:text-red-400">{{ error }}</p>
            </div>
          </div>
        </div>
      </transition>

      <!-- ================================
           ⌨️ ZONE D'ENTRÉE (Input)
           ================================ -->
      <div class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6">
        <div class="flex gap-3">
          <!-- 📝 Textarea pour écrire le message -->
          <div class="flex-1">
            <textarea
              v-model="userMessage"
              @keydown.enter.ctrl="sendMessage"
              placeholder="Écrivez votre message..."
              class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none transition-colors"
              :disabled="loading"
              rows="1"
              @input="adjustTextareaHeight"
            ></textarea>
          </div>
          
          <!-- ✅ Bouton Envoyer -->
          <button
            @click="sendMessage"
            :disabled="!userMessage.trim() || loading"
            class="px-4 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 flex-shrink-0"
          >
            <!-- Icône flèche (envoi normal) -->
            <svg v-if="!loading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <!-- Icône spinner (en attente) -->
            <svg v-else class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- ================================
     SCRIPT SETUP (TypeScript)
     ================================ -->
<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useDarkMode } from '../composables/useDarkMode'

// 🔀 Vue Router
const router = useRouter()

// 👤 Composable d'authentification
const { user, logout: authLogout } = useAuth()

// 🌙 Composable du mode dark
const { isDark, toggleDarkMode } = useDarkMode()

// ================================
// 📊 DONNÉES RÉACTIVES
// ================================

// 💬 Tableau des messages (user + assistant)
const messages = ref<Array<{ role: 'user' | 'assistant'; content: string }>>([])

// 📝 Texte de l'input utilisateur
const userMessage = ref('')

// ⏳ État loading (lors de l'appel API)
const loading = ref(false)

// ⚠️ Message d'erreur
const error = ref('')

// 📍 Référence DOM du conteneur des messages
const messagesContainer = ref<HTMLElement>()

// 🔌 URL du backend
const API_URL = 'http://localhost:8000'

// ================================
// 🔧 FONCTIONS UTILITAIRES
// ================================

/**
 * Ajuste la hauteur du textarea en fonction du contenu
 */
const adjustTextareaHeight = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  textarea.style.height = 'auto'
  // Limite la hauteur max à 120px
  textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
}

/**
 * Scroll automatiquement vers le bas pour voir le dernier message
 */
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// ================================
// 📤 FONCTION: Envoyer un message
// ================================
const sendMessage = async () => {
  // ✅ Vérifier que le message n'est pas vide
  if (!userMessage.value.trim()) return

  // 🗑️ Réinitialiser l'erreur
  error.value = ''

  // 📝 Ajouter le message utilisateur à l'affichage
  messages.value.push({ role: 'user', content: userMessage.value })

  // 🗑️ Vider l'input
  userMessage.value = ''

  // ⏳ Activer le loading
  loading.value = true

  // 📍 Scroller vers le bas
  await scrollToBottom()

  try {
    // 📡 Faire l'appel API au backend
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages.value,
        system_prompt: 'Tu es un assistant utile et amical. Réponds en français.'
      })
    })

    // ✅ Vérifier que la réponse est OK
    if (!response.ok) throw new Error(`Erreur: ${response.status}`)

    // 📥 Récupérer la réponse JSON
    const data = await response.json()

    // 💬 Ajouter le message de l'assistant
    messages.value.push({ role: 'assistant', content: data.response })

    // 📍 Scroller vers le bas
    await scrollToBottom()
  } catch (err) {
    // ❌ En cas d'erreur, l'afficher
    error.value = err instanceof Error ? err.message : 'Erreur inconnue'
  } finally {
    // 🔓 Désactiver le loading
    loading.value = false
  }
}

// ================================
// 🔄 FONCTION: Réinitialiser le chat
// ================================
const resetChat = async () => {
  try {
    // 📡 Appeler le backend pour réinitialiser
    await fetch(`${API_URL}/reset`, { method: 'POST' })

    // 🗑️ Vider les messages localement
    messages.value = []
  } catch (err) {
    // ❌ En cas d'erreur
    error.value = 'Erreur lors de la réinitialisation'
  }
}

// ================================
// 🚪 FONCTION: Déconnexion
// ================================
const logout = () => {
  // 🚪 Appelle la fonction du composable
  authLogout()

  // 📍 Redirige vers l'accueil
  router.push('/')
}
</script>