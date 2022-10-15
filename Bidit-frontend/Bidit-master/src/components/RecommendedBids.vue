<script setup>
import { onMounted } from 'vue'
import { useAxios } from '../functions'
import Bids from '../components/Bids.vue'
import BaseTitle from './Base/BaseTitle.vue'
import { useStore } from '../store'

let { $state: state } = useStore()
let bids = $ref([])
let isLoading = $ref(false)

onMounted(async () => {
  if (!state.user) return
  isLoading = true
  let { response } = await useAxios('get', '/bid/recommended')

  if (response.data.ok) {
    bids = response.data.data
  }

  isLoading = false
})

const text = $ref({
  forYou: {
    ar: `أفضل الاختيارات لك`,
    en: `Top Bids For You`,
  },
})
</script>

<template>
  <section class="my-4 p-4 md:my-6" v-if="bids.length > 0">
    <BaseTitle>{{ $t(text.forYou) }}</BaseTitle>
    <Bids :bids="bids" :isLoading="isLoading" />
  </section>
</template>
