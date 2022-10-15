<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { $t, useAxios, useMeta } from '../functions'
import { categories } from '../lang/categories.json'
import { useStore } from '../store'
import Bids from '../components/Bids.vue'
import Paginate from '../components/Paginate.vue'

const route = useRoute()
const router = useRouter()
const { $state: state } = useStore()

let title = $ref()
let bids = $ref([])
let limit = $ref(8)
let curr = $ref(0)
let max = $ref(0)
let isLoading = $ref(true)

const getBids = async () => {
  isLoading = true

  let { response } = await useAxios(
    'get',
    `/bid/category/${route.params.cat.toLowerCase()}?limit=${limit}&skip=${curr}`,
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

onMounted(() => {
  getBids()
})

watch(route, () => {
  if (route.params.cat) {
    bids = []
    curr = 0
    max = 0
    getBids()
  }
})

const cats = () => {
  if (route.name === 'bids categories') {
    const category = route.params.cat.toLowerCase()
    let isFound = false
    categories.items.forEach((cat) => {
      if (cat.en.toLowerCase() === category) {
        isFound = true
        title = cat
        useMeta({ title: $t(title), base: true })
      }
    })

    if (!isFound) router.push(`/${state.lang}/404`)
  }
}

onMounted(cats)

watch(route, cats)
</script>

<template>
  <div class="px-4">
    <BaseTitle class="capitalize" v-if="title">{{ $t(title) }}</BaseTitle>
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
