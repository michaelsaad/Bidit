<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import { onMounted } from 'vue'
import { computed } from '@vue/reactivity'
import { statuses } from '../../lang/orderstatus.json'
import BaseDialog from '../../components/Base/BaseDialog.vue'
import BaseSelect from '../../components/Base/BaseSelect.vue'
import BaseError from '../../components/Base/BaseError.vue'
import BaseButton from '../../components/Base/BaseButton.vue'
import BaseTitle from '../../components/Base/BaseTitle.vue'
import { useAxios, useMeta } from '../../functions'
import BaseImg from '../../components/Base/BaseImg.vue'
import BaseType from '../../components/Base/BaseType.vue'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Paginate from '../../components/Paginate.vue'
import BaseSearchBox from '../../components/Base/BaseSearchBox.vue'
dayjs.extend(localizedFormat)

let data = $ref([])
let limit = $ref(10)
let curr = $ref(0)
let max = $ref(0)
let isLoading = $ref(false)
let orderDialog = $ref(false)
let editDialog = $ref(false)
let switchDialog = $ref(false)
let removeDialog = $ref(false)
let selectedOrder = $ref({})
let error = $ref(null)

let constraint = $ref('createdAt')
let direction = $ref(-1)
let searchValue = $ref('')

const getOrders = async (reset = false) => {
  if (reset) {
    data = []
    curr = 0
    max = 0
  }

  let url = `/admin/orders?sortBy=${constraint}&dir=${direction}&limit=${limit}&skip=${curr}&s=${searchValue}`

  isLoading = true

  let { response } = await useAxios('get', url)

  if (response.data.ok) {
    response.data.data.orders.forEach((order) => {
      data.push(order)
    })
    max = response.data.data.count
    curr = data.length
  }

  isLoading = false
}

let formatedData = computed(() => {
  return data.map((x) => {
    return {
      ...x,
      auctioneer: x.auctioneer.email,
      bidder: x.bidder.email,
      totalPrice: x.price + x.shipping,
      switch: x.status !== 'canceled' ? true : false,
    }
  })
})

onMounted(async () => getOrders())

const sortBy = (value, dir) => {
  constraint = value
  direction = dir

  getOrders(true)
}

const open = (val) => {
  orderDialog = true
  selectedOrder = val
}

const edit = (value) => {
  editDialog = true
  selectedOrder = value
}

const saveEdit = async () => {
  let { response } = await useAxios(
    'patch',
    `/admin/edit/${selectedOrder._id}`,
    { status: selectedOrder.status },
  )
  if (!response.data.ok) error = response.data.message
  else {
    resetDialog()
    getOrders(true)
  }
}

const remove = (val) => {
  removeDialog = true
  selectedOrder = val
}

const approveRemove = async () => {
  let { response } = await useAxios(
    'delete',
    `/admin/order/${selectedOrder._id}`,
  )

  if (response.data.ok) {
    removeDialog = false
    selectedOrder = null
    getOrders(true)
  }
}

const switchIt = (val) => {
  switchDialog = true
  selectedOrder = val
}

const approveSwitch = async () => {
  let { response } = await useAxios(
    'patch',
    `/admin/retract/${selectedOrder._id}`,
  )

  if (response.data.ok) {
    switchDialog = false

    getOrders(true)
  }
}

const resetDialog = () => {
  orderDialog = false
  editDialog = false
  switchDialog = false
  removeDialog = false
  selectedOrder = null
}

const search = async (val) => {
  searchValue = val

  getOrders(true)
}

useMeta({ title: 'Orders', base: true })
</script>

<template>
  <div
    class="mb-5 flex w-full flex-col items-start justify-between gap-3 sm:flex-row"
  >
    <h1 class="font-merriweather text-3xl font-extrabold">Orders</h1>

    <BaseSearchBox
      @search="(val) => search(val)"
      @clear="
        () => {
          searchValue = ''
          getOrders(true)
        }
      "
    />
  </div>

  <div class="overflow-x-auto">
    <BaseTable
      :columns="['Order', 'Auctioneer', 'Bidder', 'Status', 'Total Price']"
      :values="['_id', 'auctioneer', 'bidder', 'status', 'totalPrice']"
      :layout="['auto', 'auto', 'auto', 'auto', 'auto', 'auto']"
      :data="formatedData"
      :constraint="constraint"
      :direction="direction"
      :actions="{ open: true, edit: true, remove: true, switch: true }"
      @sortBy="sortBy"
      @open="open"
      @edit="edit"
      @remove="remove"
      @switch="switchIt"
    />
  </div>

  <Paginate
    v-if="data.length != 0"
    :curr="curr"
    :max="max"
    :isLoading="isLoading"
    @more="getOrders"
  />

  <transition name="fade">
    <BaseDialog
      v-if="editDialog || orderDialog || removeDialog || switchDialog"
      @click="resetDialog()"
    >
    </BaseDialog>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="editDialog"
    >
      <BaseTitle> Edit Order </BaseTitle>
      <form @submit.prevent="saveEdit" class="mt-5 grid gap-5">
        <BaseSelect
          v-model="selectedOrder.status"
          class="!w-full capitalize"
          @updateInput="(val) => (selectedOrder.status = val)"
          placeholder="Status"
        >
          <option
            v-for="status in statuses"
            :key="status.en"
            :value="status.en"
          >
            {{ status.en }}
          </option>
        </BaseSelect>
        <BaseError v-if="error">{{ error }}</BaseError>
        <BaseButton>Save</BaseButton>
      </form>
    </div>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white font-medium text-black md:min-w-prose"
      v-if="orderDialog"
    >
      <div class="col-span-2 flex gap-3 border-b bg-slate-50">
        <BaseImg
          :src="`https://ik.imagekit.io/bidit/${selectedOrder?.bid?.item?.images[0]}?tr=w-80,h-80`"
          class="h-auto w-[80px] object-cover"
        />
        <div class="py-3">
          <BaseType :to="`/en/bids/${selectedOrder?.bid?.item?.type}`">{{
            selectedOrder?.bid?.item?.type || 'N/F'
          }}</BaseType>
          <h3 class="font-semibold">{{ selectedOrder.bid.item.name }}</h3>
        </div>
      </div>
      <div class="relative grid gap-x-5 gap-y-0.5 p-3 md:grid-cols-[auto,1fr]">
        <div class="font-semibold">Pickup Address</div>
        <span>{{ selectedOrder.pickupAddress || 'N/F' }}</span>
        <div class="font-semibold">Arrival Address</div>
        <span>{{ selectedOrder.arrivalAddress || 'N/F' }}</span>
        <div class="font-semibold">Pickup Time</div>
        <span>{{
          dayjs(selectedOrder.pickupTime).format('ddd, D MMMM, YYYY') || 'N/F'
        }}</span>
        <div class="font-semibold">Arrival Time</div>
        <span>{{
          dayjs(selectedOrder.arrivalTime).format('ddd, D MMMM, YYYY') || 'N/F'
        }}</span>
        <div class="font-semibold">Status</div>
        <span>{{ selectedOrder.status }}</span>
        <div class="font-semibold">Payment Method</div>
        <span>{{ selectedOrder.paymentMethod || 'N/F' }}</span>
        <div class="font-semibold">Price</div>
        <span>{{ selectedOrder.price || 'N/F' }}</span>
        <div class="font-semibold">Shipping</div>
        <span>{{ selectedOrder.shipping || 'N/F' }}</span>
        <div class="font-semibold">Total Price</div>
        <span>{{ selectedOrder.price + selectedOrder.shipping || 'N/F' }}</span>
      </div>
    </div>
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

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="switchDialog"
    >
      <BaseTitle>Retract Bid</BaseTitle>
      <p class="my-3">Are you sure you want to proceed?</p>
      <div class="flex justify-end gap-2">
        <BaseButton
          class="!bg-red-600 hover:!bg-red-700"
          @click="approveSwitch()"
          >Yes</BaseButton
        >
        <BaseButton @click="switchDialog = false">No</BaseButton>
      </div>
    </div>
  </transition>
</template>
