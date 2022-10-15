<script setup>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseTable from '../../components/Base/BaseTable.vue'
import { useAxios, useMeta } from '../../functions'
import { useStore } from '../../store'
import BaseTitle from '../../components/Base/BaseTitle.vue'
import BaseButton from '../../components/Base/BaseButton.vue'
import BaseDialog from '../../components/Base/BaseDialog.vue'
import Paginate from '../../components/Paginate.vue'
import BaseSearchBox from '../../components/Base/BaseSearchBox.vue'

let data = $ref([])
let limit = $ref(10)
let curr = $ref(0)
let max = $ref(0)
let isLoading = $ref(false)
let router = useRouter()
let { $state: state } = useStore()
let constraint = $ref('item')
let direction = $ref('asc')
let searchValue = $ref('')
let selectedBid = $ref(null)
let removeDialog = $ref(false)

const getBids = async (reset = false) => {
  if (reset) {
    data = []
    curr = 0
    max = 0
  }

  let url = `/admin/bids?sortBy=${constraint}&dir=${direction}&limit=${limit}&skip=${curr}&s=${searchValue}`

  isLoading = true

  let { response } = await useAxios('get', url)

  if (response.data.ok) {
    response.data.data.bids.forEach((bid) => {
      data.push(bid)
    })
    max = response.data.data.count
    curr = data.length
  }

  isLoading = false
}

let formatedData = computed(() => {
  return data.map((x) => {
    return { ...x, user: x?.user?.email, item: x?.item?.name }
  })
})

onMounted(async () => getBids())

const sortBy = (value, dir) => {
  constraint = value
  direction = dir

  getBids(true)
}

const open = (val) => {
  let route = router.resolve({ path: `/${state.lang}/bid/${val._id}` })
  window.open(route.href, '_blank')
}

const remove = (val) => {
  selectedBid = val
  removeDialog = true
}

const approveRemove = async () => {
  let { response } = await useAxios('delete', `/admin/bid/${selectedBid._id}`)

  if (response.data.ok) {
    removeDialog = false
    selectedBid = null
    getBids(true)
  }
}

const search = async (val) => {
  searchValue = val

  getBids(true)
}

useMeta({ title: 'Bids', base: true })
</script>

<template>
  <div
    class="mb-5 flex w-full flex-col items-start justify-between gap-3 sm:flex-row"
  >
    <h1 class="font-merriweather text-3xl font-extrabold">Bids</h1>

    <BaseSearchBox
      @search="(val) => search(val)"
      @clear="
        () => {
          searchValue = ''
          getBids(true)
        }
      "
    />
  </div>

  <div class="overflow-x-auto">
    <BaseTable
      :columns="['Bid', 'Auctioneer', 'Status', 'Start Price']"
      :values="['item', 'user', 'status', 'minPrice']"
      :layout="['auto', 'auto', 'auto', 'auto']"
      :data="formatedData"
      :constraint="constraint"
      :direction="direction"
      :actions="{ open: true, edit: false, remove: true }"
      @sortBy="sortBy"
      @open="open"
      @remove="remove"
    />
  </div>

  <Paginate
    v-if="data.length != 0"
    :curr="curr"
    :max="max"
    :isLoading="isLoading"
    @more="getBids"
  />

  <transition name="fade">
    <BaseDialog v-if="removeDialog" @click="removeDialog = false"> </BaseDialog>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="removeDialog"
    >
      <BaseTitle>Remove Bid</BaseTitle>
      <p class="my-3">Are you sure you want to proceed?</p>
      <div class="flex justify-end gap-2">
        <BaseButton
          class="!bg-red-600 hover:!bg-red-700"
          @click="approveRemove()"
          >Yes</BaseButton
        >
        <BaseButton @click="removeDialog = false">No</BaseButton>
      </div>
    </div>
  </transition>
</template>
