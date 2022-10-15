<script setup>
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { onMounted, onUnmounted } from 'vue'
import { useAxios, useMeta } from '../../functions'

dayjs.extend(localizedFormat)
let dt = $ref(dayjs().format('LL | LTS'))
let counts = $ref({})

onMounted(async () => {
  let { response } = await useAxios('get', '/admin/counts')

  if (response.data.ok) counts = response.data.data
})

let dtInterval = setInterval(() => {
  dt = dayjs().format('LL | LTS')
}, 1000)

onUnmounted(() => clearInterval(dtInterval))

useMeta({ title: 'Admin Dashboard', base: true })
</script>

<template>
  <h1 class="font-merriweather text-3xl font-extrabold">Dashboard</h1>
  <span class="mb-5 block font-merriweather text-gray-500">{{ dt }}</span>
  <h2 class="mb-5 font-merriweather text-xl font-semibold">Analytics</h2>

  <div class="grid grid-cols-2 gap-5 md:grid-cols-4">
    <router-link
      to="admin/users"
      class="flex flex-col gap-1 rounded-lg bg-[#fef6e1] bg-opacity-60 p-5 shadow-md"
    >
      <h3 class="text-lg font-semibold">Users</h3>
      <span class="text-3xl font-black">{{ counts.userCount }}</span>
    </router-link>
    <router-link
      to="admin/bids"
      class="flex flex-col gap-1 rounded-lg bg-[#e6ecff] bg-opacity-60 p-5 shadow-md"
    >
      <h3 class="text-lg font-semibold">Bids</h3>
      <span class="text-3xl font-black">{{ counts.bidCount }}</span>
    </router-link>
    <router-link
      to="admin/orders"
      class="flex flex-col gap-1 rounded-lg bg-[#fae9e3] bg-opacity-60 p-5 shadow-md"
    >
      <h3 class="text-lg font-semibold">Orders</h3>
      <span class="text-3xl font-black">{{ counts.orderCount }}</span>
    </router-link>
    <router-link
      to="admin/reports"
      class="flex flex-col gap-1 rounded-lg bg-[#8149351a] bg-opacity-60 p-5 shadow-md"
    >
      <h3 class="text-lg font-semibold">Reports</h3>
      <span class="text-3xl font-black">{{ counts.reportCount }}</span>
    </router-link>
  </div>
</template>
