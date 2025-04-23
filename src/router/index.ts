import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/components/LoginView.vue'
import { isAuthenticated } from '@/types/auth'
import DashboardLayout from '@/views/Layout/DashboardLayout.vue'
import MyDocumentView from '@/views/components/MyDocumentView.vue'
import InboxView from '@/views/components/InboxView.vue'
import DraftView from '@/views/components/DraftView.vue'
import CompletedView from '@/views/components/CompletedView.vue'
import ArchiveView from '@/views/components/ArchiveView.vue'
import TrashView from '@/views/components/TrashView.vue'
import SentView from '@/views/components/SentView.vue'
import SettingsView from '@/views/components/SettingsView.vue'
import MainDashboardView from '@/views/components/MainDashboardView.vue'
import UploadDocumentView from '@/views/components/UploadDocumentView.vue'
import StepTwoFormUI from '@/components/ui/StepTwoFormUI.vue'
import StepOneFormUI from '@/components/ui/StepOneFormUI.vue'
import StepThreeFormUI from '@/components/ui/StepThreeFormUI.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard Layout',
      component: DashboardLayout,
      children: [
        {
          path: '/MainDashboard',
          name: 'Main Dashboard',
          component: MainDashboardView,
        },
        { path: '/MyDocument', name: 'My Document', component: MyDocumentView },
        { path: '/Inbox', name: 'Inbox', component: InboxView },
        { path: '/Sent', name: 'Sent', component: SentView },
        { path: '/Draft', name: 'Draft', component: DraftView },
        { path: '/Completed', name: 'Completed', component: CompletedView },
        { path: '/Archive', name: 'Archive', component: ArchiveView },
        { path: '/Trash', name: 'Trash', component: TrashView },
        { path: '/Settings', name: 'Settings', component: SettingsView },
        { path: '/MyDocument/Step1', name: 'Upload Document', component: UploadDocumentView,
          meta: { requiresAuth: true },
          children: [
            {
              path: '', // 👈 default route
              name: 'Upload Default',
              component: StepOneFormUI,
            },
            {
              path: '/MyDocument/StepOne', // 👈 default route
              name: 'Step One',
              component: StepOneFormUI,
            },
            
            {
              path: '/MyDocument/StepTwo',
              name: 'Step Two',
              component: StepTwoFormUI,
            },
            {
              path: '/MyDocument/StepThree',
              name: 'Step Three',
              component: StepThreeFormUI,
            },
          ],
         },
      ],
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/') // redirect to login
  } else {
    next()
  }
})

export default router
