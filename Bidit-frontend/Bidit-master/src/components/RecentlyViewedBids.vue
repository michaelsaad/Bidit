<script setup>
import { onMounted } from 'vue'
import { useAxios } from '../functions'
import Bids from '../components/Bids.vue'
import BaseTitle from './Base/BaseTitle.vue'

let bids = $ref([])
let isLoading = $ref(false)

onMounted(async () => {
  isLoading = true
  let { response } = await useAxios('get', '/bid/recently')

  if (response.data.ok) {
    bids = response.data.data
  }

  isLoading = false
})

const text = $ref({
  youRecentlyViewed: {
    ar: `شاهدت مؤخراً`,
    en: `You Recently Viewed`,
  },
})
</script>

<template>
  <section class="my-4 p-4 md:my-6" v-if="bids.length > 0">
    <BaseTitle>{{ $t(text.youRecentlyViewed) }}</BaseTitle>
    <Bids :bids="bids" :isLoading="isLoading" />
  </section>
</template>
