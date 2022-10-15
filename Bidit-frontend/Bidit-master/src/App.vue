<script setup>
import PWAPrompt from './components/PWAPrompt.vue'
import AppLoader from './components/AppLoader.vue'

import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'

let isLoading = $ref(true)
let router = useRouter()
let layout = $ref(null)

watchEffect(() => {
  if (isLoading) document.body && (document.body.style.overflow = 'hidden')
  else document.body && (document.body.style.overflow = 'auto')

  layout = router.currentRoute.value.meta?.requiresAdmin
    ? 'AdminLayout'
    : 'UserLayout'
})

router.isReady().then(() => {
  isLoading = false
})
</script>

<template>
  <AppLoader v-if="isLoading" />
  <main>
    <component :is="layout">
      <RouterView></RouterView>
    </component>
  </main>

  <PWAPrompt />
</template>
