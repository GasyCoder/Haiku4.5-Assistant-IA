/* ================================
   tailwind.config.js
   Configuration Tailwind CSS avec dark mode
   ================================ */

/** @type {import('tailwindcss').Config} */
export default {
  // 📂 Fichiers à scanner pour les classes Tailwind
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  
  // 🌙 IMPORTANT: Active le mode dark avec la classe "dark" sur <html>
  // Cela signifie: Tailwind cherche la classe "dark" sur <html>
  darkMode: 'class',
  
  // 🎨 Configuration du thème
  theme: {
    extend: {
      // 🔤 Font personnalisée: Inter (depuis Google Fonts)
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      
      // 🎨 Couleur personnalisée: primary (bleu)
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // Couleur principale
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        }
        // ✅ N'ajoute PAS slate ici, Tailwind l'a déjà par défaut!
        // ✅ Cela évite les conflits avec @apply et les classes Tailwind
      },
      
      // ✨ Transitions smooth (optionnel)
      transitionDuration: {
        '200': '200ms',
      }
    },
  },
  
  // 🔌 Plugins (vide pour maintenant)
  plugins: [],
}