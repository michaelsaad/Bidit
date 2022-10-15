<script setup>
import { useAxios, useMeta } from '../../functions'
import { onMounted } from 'vue'
import Paginate from '../../components/Paginate.vue'
import BaseSearchBox from '../../components/Base/BaseSearchBox.vue'

let data = $ref([])
let limit = $ref(10)
let curr = $ref(0)
let max = $ref(0)
let isLoading = $ref(false)
let searchValue = $ref('')

const getLogs = async (reset = false) => {
  if (reset) {
    data = []
    curr = 0
    max = 0
  }

  isLoading = true

  let { response } = await useAxios(
    'get',
    `/admin/logs?q=${searchValue}&limit=${limit}&skip=${curr}`,
  )

  if (response.data.ok) {
    response.data.data.logs.forEach((user) => {
      data.push(user)
    })
    max = response.data.data.count
    curr = data.length
  }

  isLoading = false
}

onMounted(async () => getLogs())

const search = async (val) => {
  searchValue = val

  getLogs(true)
}

useMeta({ title: 'Logs', base: true })
</script>

<template>
  <div
    class="mb-5 flex w-full flex-col items-start justify-between gap-3 sm:flex-row"
  >
    <h1 class="font-merriweather text-3xl font-extrabold">Logs</h1>

    <BaseSearchBox
      @search="(val) => search(val)"
      @clear="
        () => {
          searchValue = ''
          getLogs(true)
        }
      "
    />
  </div>

  <ul class="flex flex-col rounded-md bg-white p-3" v-if="data.length > 0">
    <li
      v-for="log in data"
      :key="log._id"
      class="relative break-words py-1 pl-8"
    >
      <span class="absolute left-0">[ - ]</span>
      {{ log.message }}
    </li>
  </ul>

  <Paginate
    v-if="data.length != 0"
    :curr="curr"
    :max="max"
    :isLoading="isLoading"
    @more="getLogs"
  />
</template>
