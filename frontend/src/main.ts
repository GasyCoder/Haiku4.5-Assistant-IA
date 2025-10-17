/* ================================
   src/main.ts
   Point d'entrée de l'application Vue
   ================================ */

import { createApp } from 'vue'        // Importe Vue
import './index.css'                   // Importe les styles Tailwind
import App from './App.vue'            // Importe le composant principal
import router from './router'          // Importe Vue Router
import { useDarkMode } from './composables/useDarkMode'  // Importe le composable dark mode
import { useAuth } from './composables/useAuth'          // Importe le composable auth

// 🚀 Crée l'application Vue
const app = createApp(App)

// 🌙 Initialise le mode sombre au démarrage
// Cela charge la préférence du localStorage ou le système
const { initDarkMode } = useDarkMode()
initDarkMode()

// 👤 Initialise l'authentification au démarrage
// Cela charge l'utilisateur du localStorage s'il existe
const { initAuth } = useAuth()
initAuth()

// 🔀 Utilise Vue Router pour la navigation
app.use(router)

// 📦 Monte l'app sur l'élément #app dans index.html
app.mount('#app')