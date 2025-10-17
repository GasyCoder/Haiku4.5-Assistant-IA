<!-- ================================
     src/pages/AuthPage.vue
     Page d'authentification (Login + Signup)
     Utilisée pour les deux: /login et /signup
     ================================ -->

<template>
  <!-- 🎨 Conteneur principal: 2 colonnes (form + image) -->
  <div class="min-h-screen bg-white dark:bg-slate-950 flex">
    
    <!-- ================================
         📝 COLONNE GAUCHE: FORMULAIRE
         ================================ -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        
        <!-- 📌 Logo (lien vers accueil) -->
        <router-link to="/" class="flex items-center gap-2 mb-8">
          <div class="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">CH</span>
          </div>
          <span class="text-xl font-semibold text-slate-900 dark:text-white">Claude Haiku</span>
        </router-link>

        <!-- 📄 Titre (Change selon login/signup) -->
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {{ isLogin ? 'Bienvenue' : 'Créer un compte' }}
        </h1>
        <!-- 📄 Sous-titre (Change selon login/signup) -->
        <p class="text-slate-600 dark:text-slate-400 mb-8">
          {{ isLogin ? 'Connectez-vous pour continuer' : 'Commencez votre voyage avec Claude Haiku' }}
        </p>

        <!-- ================================
             📋 FORMULAIRE (Email + Password)
             ================================ -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          
          <!-- 📝 Input Nom (Uniquement en SIGNUP) -->
          <div v-if="!isLogin">
            <label class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Nom
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Jean Dupont"
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>

          <!-- 📧 Input Email (TOUJOURS visible) -->
          <div>
            <label class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Email
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="vous@exemple.com"
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>

          <!-- 🔐 Input Mot de passe (TOUJOURS visible) -->
          <div>
            <label class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Mot de passe
            </label>
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>

          <!-- ✅ Bouton Submit (Change de texte selon login/signup) -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
          >
            {{ loading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'S\'inscrire') }}
          </button>
        </form>

        <!-- ================================
             📍 SÉPARATEUR (Ou)
             ================================ -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-300 dark:border-slate-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400">Ou</span>
          </div>
        </div>

        <!-- ================================
             🔑 BOUTON GOOGLE
             ================================ -->
        <button
          @click="loginWithGoogle"
          :disabled="loading"
          type="button"
          class="w-full py-2 border border-slate-300 dark:border-slate-600 rounded-lg font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <!-- Icône Google -->
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>

        <!-- ================================
             🔄 BASCULE LOGIN <-> SIGNUP
             ================================ -->
        <p class="text-center mt-6 text-slate-600 dark:text-slate-400">
          {{ isLogin ? "Pas de compte?" : "Vous avez déjà un compte?" }}
          <button
            @click="isLogin = !isLogin"
            type="button"
            class="text-primary-600 dark:text-primary-400 font-medium hover:underline"
          >
            {{ isLogin ? 'S\'inscrire' : 'Se connecter' }}
          </button>
        </p>
      </div>
    </div>

    <!-- ================================
         🖼️ COLONNE DROITE: IMAGE/GRADIENT
         (Visible seulement sur écrans larges)
         ================================ -->
    <div class="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 to-primary-700 items-center justify-center">
      <div class="text-center text-white px-8">
        <!-- Icône -->
        <div class="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <!-- Titre -->
        <h2 class="text-3xl font-bold mb-4">Puissant et rapide</h2>
        <!-- Description -->
        <p class="text-white text-opacity-90">
          Claude Haiku vous offre des réponses intelligentes en quelques millisecondes.
        </p>
      </div>
    </div>
  </div>
</template>

<!-- ================================
     SCRIPT SETUP (TypeScript)
     ================================ -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

// 🔀 Vue Router
const router = useRouter()
const route = useRoute()

// 👤 Composable d'authentification
const { loginWithEmail, loginWithGoogle: authLoginGoogle, signup } = useAuth()

// 📍 Détermine si on est en mode LOGIN ou SIGNUP selon la route
// route.path === '/login' => isLogin = true
// route.path === '/signup' => isLogin = false
const isLogin = ref(route.path === '/login')

// ⏳ Loading state (pour les boutons)
const loading = ref(false)

// 📋 Objet formulaire réactif
const form = ref({
  name: '',       // Nom (vide au démarrage, utilisé uniquement en signup)
  email: '',      // Email
  password: ''    // Mot de passe
})

// ================================
// 🔐 FONCTION: Soumettre le formulaire
// ================================
const handleSubmit = async () => {
  loading.value = true
  try {
    if (isLogin.value) {
      // 🔑 MODE LOGIN: Appelle loginWithEmail
      await loginWithEmail(form.value.email, form.value.password)
    } else {
      // ✍️ MODE SIGNUP: Appelle signup
      await signup(form.value.email, form.value.password, form.value.name)
    }
    // ✅ Si succès, redirige vers /chat
    router.push('/chat')
  } catch (error) {
    // ❌ En cas d'erreur
    console.error('Auth error:', error)
  } finally {
    // 🔓 Désactive le loading
    loading.value = false
  }
}

// ================================
// 🔑 FONCTION: Connexion Google
// ================================
const loginWithGoogle = async () => {
  loading.value = true
  try {
    // Appelle la fonction du composable useAuth
    await authLoginGoogle()
    // ✅ Si succès, redirige vers /chat
    router.push('/chat')
  } catch (error) {
    // ❌ En cas d'erreur
    console.error('Google auth error:', error)
  } finally {
    // 🔓 Désactive le loading
    loading.value = false
  }
}
</script>