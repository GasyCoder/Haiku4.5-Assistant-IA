/* ================================
   src/composables/useDarkMode.ts
   Gère le mode dark/light
   ================================ */

import { ref, watch } from 'vue'

// 🌙 Variable réactive pour savoir si le mode dark est actif
// ⚠️ IMPORTANT: Exportée pour être accessible partout dans l'app
export const isDark = ref(false)

// 🔧 Composable pour gérer le mode dark
export const useDarkMode = () => {
  
  // 🚀 Initialise le mode dark au démarrage
  const initDarkMode = () => {
    console.log('🔧 Initialisation du mode dark...')
    
    // 💾 Récupère la préférence du localStorage
    const saved = localStorage.getItem('darkMode')
    
    if (saved !== null) {
      // ✅ Si une préférence existe dans localStorage, l'utilise
      isDark.value = JSON.parse(saved)
      console.log('💾 Préférence chargée depuis localStorage:', isDark.value)
    } else {
      // ✅ Sinon, utilise la préférence système du navigateur
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      console.log('🖥️ Préférence système détectée:', isDark.value)
    }
    
    // 🎨 Applique le mode dark à la page immédiatement
    applyDarkMode()
  }

  // 🔄 Bascule le mode dark/light
  const toggleDarkMode = () => {
    // Inverse la valeur actuelle
    isDark.value = !isDark.value
    
    console.log('🔄 Toggle dark mode:', isDark.value)
    
    // 💾 Sauvegarde la nouvelle préférence dans localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDark.value))
    
    // 🎨 Applique le changement visuellement
    applyDarkMode()
  }

  // 🎨 Applique le mode dark à la page HTML
  const applyDarkMode = () => {
    // 🎯 Utilise requestAnimationFrame pour s'assurer que le DOM est prêt
    // Cela évite les bugs de timing avec Vue
    requestAnimationFrame(() => {
      const htmlElement = document.documentElement
      
      if (isDark.value) {
        // ✅ Mode sombre: Ajoute la classe "dark" à <html>
        // Tailwind utilise cette classe pour appliquer les variantes dark:
        htmlElement.classList.add('dark')
        console.log('🌙 Classe "dark" ajoutée à <html>')
      } else {
        // ✅ Mode clair: Supprime la classe "dark" de <html>
        htmlElement.classList.remove('dark')
        console.log('☀️ Classe "dark" retirée de <html>')
      }
    })
  }

  // 👀 Observer: Chaque fois que isDark change, applique le changement
  // Cela permet de synchroniser automatiquement l'UI avec isDark
  watch(isDark, () => {
    console.log('👀 isDark a changé:', isDark.value)
    applyDarkMode()
  })

  // 📤 Exporte les fonctions et variables du composable
  return {
    isDark,              // Variable réactive (ref)
    toggleDarkMode,      // Fonction pour basculer
    initDarkMode,        // Fonction pour initialiser au démarrage
  }
}