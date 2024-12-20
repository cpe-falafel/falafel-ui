import { createRouter, createWebHistory } from 'vue-router'
import HubView from '@/view/HubView.vue'
import FluxEditorView from '@/view/FluxEditorView.vue'
import PreviewView from '@/view/PreviewView.vue'

const routes = [
  { path: '/', component: HubView },
  { path: '/flux-editor', component: FluxEditorView },
  { path: '/preview', component: PreviewView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
