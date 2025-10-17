/* ================================
   src/composables/useDarkMode.ts
   Gère le mode dark/light
   ================================ */

import { ref, watch } from 'vue'

// 🌙 Variable réactive pour savoir si le mode dark est actif
export const isDark = ref(false)

// 🔧 Composable pour gérer le mode dark
export const useDarkMode = () => {
  
  // 🚀 Initialise le mode dark au démarrage
  const initDarkMode = () => {
    // 💾 Récupère la préférence du localStorage
    const saved = localStorage.getItem('darkMode')
    
    if (saved !== null) {
      // ✅ Si une préférence existe, l'utilise
      isDark.value = JSON.parse(saved)
    } else {
      // ✅ Sinon, utilise la préférence système
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    // 🎨 Applique le mode dark à la page
    applyDarkMode()
  }

  // 🔄 Bascule le mode dark/light
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    
    // 💾 Sauvegarde la préférence dans localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDark.value))
    
    // 🎨 Applique le changement
    applyDarkMode()
  }

  // 🎨 Applique le mode dark à la page
  const applyDarkMode = () => {
    // 🎯 Attendre le prochain frame pour assurer que le DOM est mis à jour
    requestAnimationFrame(() => {
      const htmlElement = document.documentElement
      
      if (isDark.value) {
        // ✅ Ajoute la classe "dark" à <html>
        // Tailwind utilise cette classe pour appliquer les styles dark
        htmlElement.classList.add('dark')
      } else {
        // ✅ Supprime la classe "dark" de <html>
        htmlElement.classList.remove('dark')
      }
      
      console.log('🌙 Mode sombre appliqué:', isDark.value)
    })
  }

  // 👀 Observer: Chaque fois que isDark change, applique le changement
  watch(isDark, applyDarkMode)

  // 📤 Exporte les fonctions et variables
  return {
    isDark,              // Variable réactive
    toggleDarkMode,      // Fonction pour basculer
    initDarkMode,        // Fonction pour initialiser
  }
}