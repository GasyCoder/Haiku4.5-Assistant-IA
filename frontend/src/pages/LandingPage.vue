<!-- ================================
     src/pages/LandingPage.vue
     Page d'accueil (Landing Page)
     Affichée quand l'utilisateur n'est pas connecté
     ================================ -->

<template>
  <!-- 🎨 Conteneur principal -->
  <div class="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
    
    <!-- ================================
         🧭 NAVIGATION BAR
         ================================ -->
    <nav class="fixed w-full top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <!-- 📌 Logo et Titre -->
        <div class="flex items-center gap-2">
          <!-- Logo coloré -->
          <div class="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">CH</span>
          </div>
          <!-- Titre -->
          <span class="text-xl font-semibold">Claude Haiku</span>
        </div>
        
        <!-- 🎛️ Boutons de navigation -->
        <div class="flex items-center gap-4">
          <!-- Bouton Mode Dark/Light -->
          <button
            @click="toggleDarkMode"
            class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Basculer le mode sombre"
          >
            <!-- Icône soleil (mode light) -->
            <svg v-if="!isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <!-- Icône lune (mode dark) -->
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.121-10.121l1.414-1.414a1 1 0 00-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414zM5.464 5.464l1.414-1.414a1 1 0 00-1.414-1.414L4.05 4.05a1 1 0 001.414 1.414zM5.464 14.536l-1.414 1.414a1 1 0 001.414 1.414l1.414-1.414a1 1 0 00-1.414-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <!-- Bouton Connexion -->
          <router-link
            to="/login"
            class="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Connexion
          </router-link>
          
          <!-- Bouton S'inscrire (Primaire) -->
          <router-link
            to="/signup"
            class="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            S'inscrire
          </router-link>
        </div>
      </div>
    </nav>

    <!-- ================================
         🎯 SECTION HERO (Haut de page)
         ================================ -->
    <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Titre principal -->
        <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          L'assistant IA de <span class="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">nouvelle génération</span>
        </h1>
        
        <!-- Sous-titre / Description -->
        <p class="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Discutez avec Claude Haiku, un assistant IA puissant et rapide. Obtenez des réponses intelligentes à toutes vos questions.
        </p>
        
        <!-- Boutons d'action -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <!-- Bouton principal: Commencer -->
          <router-link
            to="/signup"
            class="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Commencer gratuitement
          </router-link>
          
          <!-- Bouton secondaire: En savoir plus -->
          <a
            href="#features"
            class="px-8 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            En savoir plus
          </a>
        </div>
      </div>
    </section>

    <!-- ================================
         ✨ SECTION FONCTIONNALITÉS
         ================================ -->
    <section id="features" class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div class="max-w-6xl mx-auto">
        <!-- Titre de la section -->
        <h2 class="text-4xl font-bold text-center mb-16">Fonctionnalités puissantes</h2>
        
        <!-- Grille de 3 colonnes avec les fonctionnalités -->
        <div class="grid md:grid-cols-3 gap-8">
          
          <!-- ⚡ Fonctionnalité 1: Ultra rapide -->
          <div class="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <!-- Icône -->
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <!-- Titre -->
            <h3 class="text-lg font-semibold mb-2">Ultra rapide</h3>
            <!-- Description -->
            <p class="text-slate-600 dark:text-slate-400">Réponses instantanées avec Claude Haiku, le modèle le plus rapide.</p>
          </div>

          <!-- 🔒 Fonctionnalité 2: Sécurisé -->
          <div class="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <!-- Icône -->
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <!-- Titre -->
            <h3 class="text-lg font-semibold mb-2">Sécurisé</h3>
            <!-- Description -->
            <p class="text-slate-600 dark:text-slate-400">Vos données sont protégées avec les normes de sécurité les plus élevées.</p>
          </div>

          <!-- ⚙️ Fonctionnalité 3: Personnalisable -->
          <div class="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <!-- Icône -->
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <!-- Titre -->
            <h3 class="text-lg font-semibold mb-2">Personnalisable</h3>
            <!-- Description -->
            <p class="text-slate-600 dark:text-slate-400">Adaptez l'assistant à vos besoins spécifiques.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================
         🎯 SECTION APPEL À L'ACTION (CTA)
         ================================ -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Titre -->
        <h2 class="text-4xl font-bold mb-6">Prêt à commencer?</h2>
        <!-- Description -->
        <p class="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Rejoignez des milliers d'utilisateurs qui utilisent Claude Haiku.
        </p>
        <!-- Bouton d'action -->
        <router-link
          to="/signup"
          class="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Créer un compte gratuitement
        </router-link>
      </div>
    </section>

    <!-- ================================
         👣 FOOTER
         ================================ -->
    <footer class="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto text-center text-slate-600 dark:text-slate-400">
        <p>&copy; 2025 Claude Haiku. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<!-- ================================
     SCRIPT SETUP (TypeScript)
     ================================ -->
<script setup lang="ts">
// ✅ Importe le composable pour le mode dark
import { useDarkMode } from '../composables/useDarkMode'

// 🔧 Récupère les fonctions et variables du composable
const { isDark, toggleDarkMode } = useDarkMode()

// 📝 Explication:
// - isDark: variable réactive (true/false) pour savoir si mode dark est actif
// - toggleDarkMode: fonction pour basculer entre dark et light
</script>