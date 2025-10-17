/* ================================
   src/router.ts
   Configuration Vue Router
   Gère la navigation entre les pages
   ================================ */

import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from './composables/useAuth'
import LandingPage from './pages/LandingPage.vue'
import AuthPage from './pages/AuthPage.vue'
import ChatPage from './pages/ChatPage.vue'

// 📄 Définition des routes
const routes = [
  // 🏠 Page d'accueil (Landing page)
  {
    path: '/',
    component: LandingPage,
    meta: { requiresAuth: false }  // N'a pas besoin d'être connecté
  },
  
  // 🔑 Page de connexion
  {
    path: '/login',
    component: AuthPage,
    meta: { requiresAuth: false }  // N'a pas besoin d'être connecté
  },
  
  // 📝 Page d'inscription
  {
    path: '/signup',
    component: AuthPage,
    meta: { requiresAuth: false }  // N'a pas besoin d'être connecté
  },
  
  // 💬 Page du chat (protégée)
  {
    path: '/chat',
    component: ChatPage,
    meta: { requiresAuth: true }   // ⛔ OBLIGATOIRE d'être connecté
  }
]

// 🔀 Crée le routeur Vue
const router = createRouter({
  history: createWebHistory(),  // Utilise l'historique du navigateur
  routes
})

// 🛡️ Middleware de protection des routes
// S'exécute avant de naviguer vers une nouvelle route
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()

  // ✅ Si la route nécessite l'authentification
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // ❌ Redirige vers /login
    next('/login')
  }
  // ✅ Si l'utilisateur est connecté et essaie d'aller à /login ou /signup
  else if ((to.path === '/login' || to.path === '/signup') && isAuthenticated.value) {
    // ➡️ Redirige vers /chat
    next('/chat')
  }
  // ✅ Sinon, autorise l'accès à la route
  else {
    next()
  }
})

export default router