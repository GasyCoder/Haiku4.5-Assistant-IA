<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSignup = () => {
  router.push('/signup')
}

const learnMore = () => {
  // Scroll vers les features
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
    
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div class="text-center">
        
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-900 rounded-full text-sm font-medium mb-8 shadow-sm">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          Propulsé par Claude AI
        </div>

        <!-- Titre principal -->
        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          L'assistant IA de
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-blue-500 to-primary-600 dark:from-primary-400 dark:via-blue-400 dark:to-primary-500">
            nouvelle génération
          </span>
        </h1>

        <!-- Description -->
        <p class="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Discutez avec Claude Haiku, un assistant IA puissant et rapide. Obtenez
          des réponses intelligentes à toutes vos questions.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            @click="goToSignup"
            class="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Commencer gratuitement
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>

          <button
            @click="learnMore"
            class="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200"
          >
            En savoir plus
          </button>
        </div>

        <!-- Sous-texte -->
        <p class="mt-6 text-sm text-slate-500 dark:text-slate-500">
          Aucune carte bancaire requise • Essai gratuit
        </p>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-4">
        Fonctionnalités puissantes
      </h2>
      <p class="text-center text-slate-600 dark:text-slate-400 mb-16 text-lg">
        Tout ce dont vous avez besoin pour une expérience IA optimale
      </p>

      <!-- Grid de features -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Feature 1: Ultra rapide -->
        <div class="group p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-primary-500/10 transition-all duration-300">
          <div class="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-950 dark:to-primary-900 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            Ultra rapide
          </h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Réponses instantanées avec Claude Haiku, le modèle le plus rapide.
          </p>
        </div>

        <!-- Feature 2: Sécurisé -->
        <div class="group p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-primary-500/10 transition-all duration-300">
          <div class="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-950 dark:to-primary-900 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            Sécurisé
          </h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Vos données sont protégées avec les normes de sécurité les plus élevées.
          </p>
        </div>

        <!-- Feature 3: Personnalisable -->
        <div class="group p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-primary-500/10 transition-all duration-300">
          <div class="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-950 dark:to-primary-900 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            Personnalisable
          </h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Adaptez l'assistant à vos besoins spécifiques.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div class="relative bg-gradient-to-br from-primary-500 via-primary-600 to-blue-600 dark:from-primary-700 dark:via-primary-800 dark:to-blue-800 rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl">
        <!-- Effet de brillance -->
        <div class="absolute inset-0 bg-gradient-to-t from-transparent to-white/10"></div>
        
        <div class="relative z-10">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à commencer ?
          </h2>
          <p class="text-primary-100 dark:text-primary-200 mb-8 text-lg max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui font confiance à Claude Haiku
          </p>
          <button
            @click="goToSignup"
            class="px-8 py-4 bg-white hover:bg-slate-50 text-primary-600 dark:text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Créer un compte gratuit
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-slate-600 dark:text-slate-400">
          © 2025 Claude Haiku. Propulsé par Anthropic.
        </p>
      </div>
    </footer>
  </div>
</template>