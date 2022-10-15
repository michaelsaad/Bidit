import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { $t } from './functions'
import App from './App.vue'
import router from './router'
import '../tailwind.css'
import '../transition.css'
import { registerSW } from 'virtual:pwa-register'
import UserLayout from './components/UserLayout.vue'
import AdminLayout from './components/AdminLayout.vue'

registerSW({})

const app = createApp(App)

app.component('UserLayout', UserLayout)
app.component('AdminLayout', AdminLayout)
app.use(createPinia())
app.use(router)

app.mixin({
  methods: {
    $t,
  },
})

app.mount('#app')
