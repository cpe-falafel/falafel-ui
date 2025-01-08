import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'

// Ce plugin va simplement enregistrer le composant VueFlow globalement,
// mais tu peux également configurer des options globales si nécessaire.

const vueFlowPlugin = {
  install(app) {
    // Enregistrer le composant globalement
    app.component('VueFlow', VueFlow)
  }
}

export default vueFlowPlugin
