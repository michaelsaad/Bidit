<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import { useAxios, useMeta } from '../../functions'
import { onMounted } from 'vue'
import BaseDialog from '../../components/Base/BaseDialog.vue'
import BaseTitle from '../../components/Base/BaseTitle.vue'
import BaseButton from '../../components/Base/BaseButton.vue'
import { computed } from '@vue/reactivity'
import Paginate from '../../components/Paginate.vue'
import BaseSearchBox from '../../components/Base/BaseSearchBox.vue'
import BaseError from '../../components/Base/BaseError.vue'

let data = $ref([])
let limit = $ref(10)
let curr = $ref(0)
let max = $ref(0)
let isLoading = $ref(false)
let error = $ref(false)
let isBanLoading = $ref(false)
let userDialog = $ref(false)
let unbanDialog = $ref(false)
let selectedUser = $ref(null)
let selectedBan = $ref(null)
let constraint = $ref('name')
let direction = $ref('asc')
let searchValue = $ref('')

const getBannedUsers = async (reset = false) => {
  if (reset) {
    data = []
    curr = 0
    max = 0
  }

  let url = `/admin/bannedusers?sortBy=${constraint}&dir=${direction}&limit=${limit}&skip=${curr}&s=${searchValue}`

  isLoading = true

  let { response } = await useAxios('get', url)

  if (response.data.ok) {
    response.data.data.bannedUsers.forEach((user) => {
      data.push(user)
    })
    max = response.data.data.count
    curr = data.length
  }

  isLoading = false
}

onMounted(async () => getBannedUsers())

let formatedData = computed(() => {
  return data.map((x) => {
    return {
      ...x,
      days: x.days === 0 ? '∞' : x.days,
    }
  })
})

const sortBy = (value, dir) => {
  constraint = value
  direction = dir

  getBannedUsers(true)
}

const open = async (val) => {
  userDialog = true

  let { response } = await useAxios('get', `/admin/user/info/${val.user}`)
  let user = response.data.data
  user.isAdmin = String(user?.isAdmin)

  selectedUser = user
}

const cancel = (val) => {
  unbanDialog = true
  selectedBan = val
}

const approveUnban = async () => {
  isBanLoading = true

  let { response } = await useAxios(
    'delete',
    `/admin/unbanuser/${selectedBan._id}`,
  )

  if (!response.data.ok) error = response.data.message
  else {
    unbanDialog = false
    selectedBan = null
    error = null
    getBannedUsers(true)
  }

  isBanLoading = false
}

const search = async (val) => {
  searchValue = val

  getBannedUsers(true)
}

useMeta({ title: 'Banned Users', base: true })
</script>

<template>
  <div
    class="mb-5 flex w-full flex-col items-start justify-between gap-3 sm:flex-row"
  >
    <h1 class="font-merriweather text-3xl font-extrabold">Banned Users</h1>

    <BaseSearchBox
      @search="(val) => search(val)"
      @clear="
        () => {
          searchValue = ''
          getBannedUsers(true)
        }
      "
    />
  </div>

  <div class="overflow-x-auto">
    <BaseTable
      :columns="['Ban', 'Email', 'Reason', 'Days']"
      :values="['_id', 'user', 'message', 'days']"
      :layout="['auto', 'auto', 'auto']"
      :data="formatedData"
      :constraint="constraint"
      :direction="direction"
      :actions="{ open: true, cancel: true }"
      @sortBy="sortBy"
      @open="open"
      @cancel="cancel"
    />
  </div>
  <Paginate
    v-if="data.length != 0"
    :curr="curr"
    :max="max"
    :isLoading="isLoading"
    @more="getBannedUsers"
  />

  <transition name="fade">
    <BaseDialog
      v-if="unbanDialog || userDialog"
      @click="
        () => {
          userDialog = false
          unbanDialog = false
        }
      "
    >
    </BaseDialog>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="unbanDialog"
    >
      <BaseTitle>Unban User</BaseTitle>
      <p class="my-3">Are you sure you want to proceed?</p>
      <BaseError v-if="error"> {{ error }}</BaseError>
      <div class="mt-3 flex justify-end gap-2">
        <BaseButton
          class="!bg-red-600 hover:!bg-red-700 disabled:!bg-red-200"
          @click="approveUnban()"
          :disabled="isBanLoading"
          >Yes</BaseButton
        >
        <BaseButton :disabled="isBanLoading" @click="unbanDialog = false"
          >No</BaseButton
        >
      </div>
    </div>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="userDialog"
    >
      <BaseTitle
        >User
        <span class="break-words text-lg font-normal"
          >#{{ selectedUser?._id }}</span
        ></BaseTitle
      >
      <div class="mt-4 grid grid-cols-[auto,1fr] gap-x-3 gap-y-1">
        <div class="font-semibold">Name</div>
        <span class="text-gray-500">{{ selectedUser?.name || 'N/F' }}</span>
        <div class="font-semibold">Email</div>
        <span class="text-gray-500">{{ selectedUser?.email || 'N/F' }}</span>
        <div class="font-semibold">isAdmin</div>
        <span class="text-gray-500">{{ selectedUser?.isAdmin || 'N/F' }}</span>
        <div class="font-semibold">Gender</div>
        <span class="text-gray-500">{{ selectedUser?.gender || 'N/F' }}</span>
        <div class="font-semibold">Phone</div>
        <span class="text-gray-500">{{ selectedUser?.phone || 'N/F' }}</span>
        <div class="font-semibold">Address</div>
        <span class="text-gray-500">{{ selectedUser?.address || 'N/F' }}</span>
        <div class="font-semibold">JoinedAt</div>
        <span class="text-gray-500">{{
          selectedUser?.createdAt || 'N/F'
        }}</span>
        <!-- <div>isPremium: </div> <span>{{ selectedUser.premium }}</span> -->
      </div>
    </div>
  </transition>
</template>
