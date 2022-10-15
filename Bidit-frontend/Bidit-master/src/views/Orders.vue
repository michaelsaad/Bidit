<script setup>
import { onMounted } from 'vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseEmpty from '../components/Base/BaseEmpty.vue'
import BaseLoader from '../components/Base/BaseLoader.vue'
import { $t, useAxios, useMeta } from '../functions'
import OrderCard from '../components/OrderCard.vue'
import Paginate from '../components/Paginate.vue'
import { useStore } from '../store'
let { $state: state } = useStore()

let orders = $ref([])
let limit = $ref(8)
let curr = $ref(0)
let max = $ref(0)
let isLoading = $ref(false)

onMounted(async () => {
  getOrders()
})

const getOrders = async () => {
  isLoading = true

  let { response } = await useAxios(
    'get',
    `/order/user?limit=${limit}&skip${curr}`,
  )

  if (response.data.ok) {
    response.data.data.orders.forEach((order) => {
      orders.push(order)
    })
    max = response.data.data.count
    curr = orders.length
  }

  isLoading = false
}

const text = $ref({
  title: {
    ar: 'الطلبات',
    en: 'Orders',
  },
})

useMeta({ title: $t(text.title), base: true })
</script>

<template>
  <div class="px-5">
    <BaseTitle>{{ $t(text.title) }}</BaseTitle>
  </div>
  <div v-if="!isLoading || orders.length > 0">
    <BaseEmpty
      v-if="orders.length === 0"
      :msg="{
        ar: 'لا يوجد لديك طلبات الان!',
        en: 'No orders available now!',
      }"
    />

    <div class="mt-6 grid gap-3 px-5 md:grid-cols-2" v-else>
      <template v-for="order in orders" :key="order._id">
        <router-link :to="`/${state.lang}/account/order/${order._id}`">
          <OrderCard :order="order" />
        </router-link>
      </template>
    </div>

    <Paginate
      v-if="orders.length != 0"
      :curr="curr"
      :max="max"
      :isLoading="isLoading"
      @more="getOrders"
    />
  </div>

  <BaseLoader v-else />
</template>
