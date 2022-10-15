<script setup>
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import Bids from '../components/Bids.vue'
import Paginate from '../components/Paginate.vue'
import { $t, useAxios, useMeta } from '../functions'

let bids = $ref([])
let limit = $ref(8)
let curr = $ref(0)
let max = $ref(0)
let isLoading = $ref(true)

onMounted(async () => {
  getBids()
})

const getBids = async () => {
  isLoading = true

  let { response } = await useAxios(
    'get',
    `/bid/all?limit=${limit}&skip=${curr}`,
  )

  if (response.data.ok) {
    response.data.data.bids.forEach((bid) => {
      bids.push(bid)
    })

    max = response.data.data.count
    curr = bids.length
  }

  isLoading = false
}

const text = $ref({
  allBids: {
    ar: 'كل المزادات',
    en: 'All Bids',
  },
})

useMeta({ title: $t(text.allBids), base: true })
</script>

<template>
  <div class="px-4">
    <BaseTitle>{{ $t(text.allBids) }}</BaseTitle>
    <Bids :bids="bids" :isLoading="isLoading" />

    <Paginate
      v-if="bids.length != 0"
      :curr="curr"
      :max="max"
      :isLoading="isLoading"
      @more="getBids"
    />
  </div>
</template>
