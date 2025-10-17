<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useDarkMode } from './composables/useDarkMode'

// 🔧 Récupère les fonctions du composable
const { isDark, toggleDarkMode, initDarkMode } = useDarkMode()

// 🚀 Initialise le mode dark au montage du composant
onMounted(() => {
  console.log('🚀 App.vue monté - Initialisation du dark mode')
  initDarkMode()
})
</script>

<template>
  <!-- 
    🎨 Conteneur principal avec classes dark:
    IMPORTANT: Chaque élément DOIT avoir une variante dark:
  -->
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
    
    <!-- 🔝 Navbar fixe en haut -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          
          <!-- Logo / Titre -->
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-slate-900 dark:text-white">
              Claude Haiku
            </h1>
          </div>

          <!-- Actions à droite -->
          <div class="flex items-center gap-4">
            
            <!-- 🌙 Bouton toggle dark mode -->
            <button
              @click="toggleDarkMode"
              class="p-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-200 border border-slate-300 dark:border-slate-700"
              :aria-label="isDark ? 'Activer le mode clair' : 'Activer le mode sombre'"
              :title="isDark ? 'Mode clair' : 'Mode sombre'"
            >
              <!-- Icône soleil (mode sombre actif, on affiche le soleil) -->
              <svg
                v-if="isDark"
                class="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                />
              </svg>

              <!-- Icône lune (mode clair actif, on affiche la lune) -->
              <svg
                v-else
                class="w-5 h-5 text-slate-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                />
              </svg>
            </button>

            <!-- Bouton connexion -->
            <button class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200">
              Connexion
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 📄 Contenu principal avec espace pour la navbar fixe -->
    <main class="pt-16">
      <RouterView />
    </main>
  </div>
</template>