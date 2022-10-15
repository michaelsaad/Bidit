<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseInfo from '../components/Base/BaseInfo.vue'
import { onMounted } from 'vue'
import { $t, useAxios, useMeta } from '../functions'
import Bids from '../components/Bids.vue'
import Paginate from '../components/Paginate.vue'

let bids = $ref([])
let limit = $ref(8)
let curr = $ref(0)
let max = $ref(0)
let isLoading = $ref(false)

onMounted(async () => {
  getBids()
})

const getBids = async () => {
  isLoading = true

  let { response } = await useAxios(
    'get',
    `/bid/purchases?limit=${limit}&skip=${curr}`,
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
  title: {
    ar: 'المشتريات',
    en: 'Purchases',
  },
  info: {
    ar: 'المزادات الموجودة هنا انت شاركت فيها سواء كسبتها أو لم تكسبها.',
    en: 'Bids here are ones you joined whether you won or not.',
  },
})

useMeta({ title: $t(text.title), base: true })
</script>

<template>
  <div class="px-4">
    <BaseTitle
      >{{ $t(text.title) }} <BaseInfo>{{ $t(text.info) }} </BaseInfo></BaseTitle
    >
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
