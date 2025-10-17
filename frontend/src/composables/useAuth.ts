/* ================================
   src/composables/useAuth.ts
   Gère l'authentification utilisateur
   ================================ */

import { ref, computed } from 'vue'

// 👤 Interface pour typer les données utilisateur
interface User {
  id: string              // ID unique de l'utilisateur
  email: string           // Email
  name: string            // Nom
  avatar?: string         // Avatar (optionnel)
  provider: 'email' | 'google'  // Provenance (email ou Google)
}

// 👤 Variable réactive pour stocker l'utilisateur connecté
const user = ref<User | null>(null)

// 🔧 Composable pour gérer l'authentification
export const useAuth = () => {
  
  // ✅ Variable calculée: true si utilisateur connecté, false sinon
  const isAuthenticated = computed(() => !!user.value)

  // 🚀 Initialise l'auth au démarrage
  const initAuth = () => {
    // 💾 Récupère l'utilisateur du localStorage
    const saved = localStorage.getItem('user')
    if (saved) {
      // ✅ Si l'utilisateur existe, le charge
      user.value = JSON.parse(saved)
    }
  }

  // 🔑 Connexion avec email et mot de passe
  const loginWithEmail = async (email: string, _password: string) => {
    // ⏳ Simule un appel API (500ms)
    // En production: await api.post('/login', { email, password })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 👤 Crée l'objet utilisateur
    user.value = {
      id: Math.random().toString(),
      email,
      name: email.split('@')[0] || 'User',  // ✅ Utilise la partie avant @ comme nom, ou 'User' par défaut
      provider: 'email'
    }
    
    // 💾 Sauvegarde dans localStorage
    localStorage.setItem('user', JSON.stringify(user.value))
    return user.value
  }

  // 🔑 Connexion avec Google
  const loginWithGoogle = async () => {
    // ⏳ Simule un appel API (500ms)
    // En production: utiliser Google OAuth avec @react-oauth/google
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 👤 Crée l'objet utilisateur depuis Google
    user.value = {
      id: Math.random().toString(),
      email: 'user@gmail.com',
      name: 'Google User',
      provider: 'google'
    }
    
    // 💾 Sauvegarde dans localStorage
    localStorage.setItem('user', JSON.stringify(user.value))
    return user.value
  }

  // ✍️ Inscription
  const signup = async (email: string, _password: string, name: string) => {
    // ⏳ Simule un appel API (500ms)
    // En production: await api.post('/signup', { email, password, name })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 👤 Crée l'objet utilisateur
    user.value = {
      id: Math.random().toString(),
      email,
      name,
      provider: 'email'
    }
    
    // 💾 Sauvegarde dans localStorage
    localStorage.setItem('user', JSON.stringify(user.value))
    return user.value
  }

  // 🚪 Déconnexion
  const logout = () => {
    // 🗑️ Vide l'utilisateur
    user.value = null
    
    // 🗑️ Supprime du localStorage
    localStorage.removeItem('user')
  }

  // 📤 Exporte les fonctions et variables
  return {
    user,                  // Utilisateur connecté (ref)
    isAuthenticated,       // Est-on connecté? (computed)
    initAuth,              // Initialiser au démarrage
    loginWithEmail,        // Connexion email
    loginWithGoogle,       // Connexion Google
    signup,                // Inscription
    logout,                // Déconnexion
  }
}