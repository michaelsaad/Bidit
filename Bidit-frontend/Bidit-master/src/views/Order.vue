<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import { onMounted } from 'vue'
import { $t, useAxios, useMeta } from '../functions'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
import BaseLoader from '../components/Base/BaseLoader.vue'
import OrderCard from '../components/OrderCard.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseDialog from '../components/Base/BaseDialog.vue'
import CheckoutDialog from '../components/CheckoutDialog.vue'

let order = $ref(null)
let isLoading = $ref(false)
let router = useRouter()
let checkoutDialog = $ref(false)
let cancelDialog = $ref(false)
let { $state: state } = useStore()

const getOrder = async (orderID) => {
  isLoading = true
  let { response } = await useAxios('get', `/order/${orderID}`)
  if (response.data.ok) order = response.data.data
  else router.replace(`/${state.lang}/404`)
  isLoading = false
}

onMounted(async () => {
  let orderID = router.currentRoute.value.params.id
  if (orderID.length !== 24) router.replace(`/${state.lang}/404`)
  getOrder(orderID)
})

const updateUser = async () => {
  let { response } = await useAxios('get', '/auth/user')

  if (response.data.ok) {
    state.user = response.data.data
  }
}

const cancelOrder = async () => {
  if (order.auctioneer === state.user._id) {
    let { response } = await useAxios('patch', `/order/cancel/${order._id}`)

    if (response.data.ok) {
      cancelDialog = false
      updateUser()
      getOrder(order._id)
    }
  }

  if (order.bidder === state.user._id) {
    let { response } = await useAxios('patch', `/order/retract/${order._id}`)

    if (response.data.ok) {
      cancelDialog = false
      updateUser()
      getOrder(order._id)
    }
  }
}

const text = $ref({
  title: {
    ar: 'طلب',
    en: 'Order',
  },
  completeOrder: {
    ar: 'اكمل الطلب',
    en: 'Complete Order',
  },
  cancelOrder: {
    ar: 'الغاء الطلب',
    en: 'Cancel Order',
  },
  retractOrder: {
    ar: 'لا اريده بعد الان',
    en: "I don't want it anymore",
  },
  sure: {
    ar: 'هل تريد الاستمرار؟',
    en: 'Are you sure you want to proceed?',
  },
})

useMeta({ title: $t(text.title), base: true })
</script>

<template>
  <div class="px-5">
    <BaseTitle
      >{{ $t(text.title) }}
      <span class="text-base font-medium">
        {{ order?._id ? '#' + order?._id : null }}</span
      >
    </BaseTitle>

    <div class="mt-6">
      <BaseLoader v-if="isLoading" />

      <OrderCard :order="order" v-if="order && !isLoading" />

      <div
        class="col-span-2 mt-3 flex flex-wrap gap-3 sm:justify-end"
        v-if="order?.status === 'pending'"
      >
        <BaseButton
          v-if="state?.user?._id === order?.bidder"
          class="w-auto shadow-md"
          @click="checkoutDialog = true"
          >{{ $t(text.completeOrder) }}</BaseButton
        >
        <BaseButton
          v-if="state?.user?._id === order?.auctioneer"
          class="w-auto !bg-red-600 shadow-md hover:!bg-red-700"
          @click="cancelDialog = true"
          >{{ $t(text.cancelOrder) }}</BaseButton
        ><BaseButton
          v-if="state?.user?._id === order?.bidder"
          class="w-auto !bg-red-600 shadow-md hover:!bg-red-700"
          @click="cancelDialog = true"
          >{{ $t(text.retractOrder) }}</BaseButton
        >
      </div>
    </div>
  </div>

  <transition name="fade">
    <BaseDialog
      v-if="checkoutDialog || cancelDialog"
      @click="
        () => {
          checkoutDialog = false
          cancelDialog = false
        }
      "
    >
    </BaseDialog>
  </transition>

  <transition name="zoom">
    <CheckoutDialog
      v-if="checkoutDialog"
      :order="order"
      @done="
        () => {
          checkoutDialog = false
          getOrder(order._id)
        }
      "
    />
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="cancelDialog"
    >
      <BaseTitle>Cancel Order</BaseTitle>
      <p class="my-3">
        {{ $t(text.sure) }}
      </p>
      <div class="flex justify-end gap-2">
        <BaseButton class="!bg-red-600 hover:!bg-red-700" @click="cancelOrder()"
          >Yes</BaseButton
        >
        <BaseButton @click="adminDialog = false">No</BaseButton>
      </div>
    </div>
  </transition>
</template>
