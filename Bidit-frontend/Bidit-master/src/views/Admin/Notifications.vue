<script setup>
import BaseTitle from '../../components/Base/BaseTitle.vue'
import BaseDialog from '../../components/Base/BaseDialog.vue'
import BaseTextArea from '../../components/Base/BaseTextArea.vue'
import BaseInput from '../../components/Base/BaseInput.vue'
import BaseButton from '../../components/Base/BaseButton.vue'
import { useAxios, useMeta } from '../../functions'
import BaseError from '../../components/Base/BaseError.vue'
import { onMounted } from 'vue'
import Notification from '../../components/Notification.vue'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Paginate from '../../components/Paginate.vue'

dayjs.extend(localizedFormat)

let data = $ref([])
let limit = $ref(10)
let curr = $ref(0)
let max = $ref(0)
let isLoading = $ref(false)

const getNotifications = async (reset = false) => {
  if (reset) {
    data = []
    curr = 0
    max = 0
  }

  isLoading = true

  let { response } = await useAxios(
    'get',
    `/admin/notifications?limit=${limit}&skip=${curr}`,
  )

  if (response.data.ok) {
    response.data.data.notifications.forEach((notification) => {
      data.push(notification)
    })
    max = response.data.data.count
    curr = data.length
  }

  isLoading = false
}

onMounted(async () => {
  getNotifications()
})

let broadcastDialog = $ref(false)
let error = $ref('')
let titleAr = $ref('')
let titleEn = $ref('')
let messageAr = $ref('')
let messageEn = $ref('')
let redirect = $ref('')

const resetDialog = () => {
  broadcastDialog = false
}

const broadcast = async () => {
  let nt = {
    title: {
      ar: titleAr,
      en: titleEn,
    },
    message: {
      ar: messageAr,
      en: messageEn,
    },
    redirect,
  }

  let { response } = await useAxios('post', '/admin/broadcast', nt)
  if (response.data.ok) {
    getNotifications(true)
    broadcastDialog = false
    error = ''
    titleAr = ''
    titleEn = ''
    messageAr = ''
    messageEn = ''
    redirect = ''
  } else {
    error = response.data.message
  }
}

useMeta({ title: 'Notifications', base: true })
</script>

<template>
  <div class="flex items-start justify-between">
    <h1 class="mb-5 font-merriweather text-3xl font-extrabold">
      Notifications
    </h1>
    <BaseButton @click="broadcastDialog = true">Broadcast</BaseButton>
  </div>

  <div class="flex flex-col gap-3">
    <Notification
      v-for="nt in data"
      :key="nt._id"
      class="rounded-md bg-white p-3"
      :notification="nt"
    />
  </div>

  <Paginate
    v-if="data.length != 0"
    :curr="curr"
    :max="max"
    :isLoading="isLoading"
    @more="getNotifications"
  />

  <transition name="fade">
    <BaseDialog v-if="broadcastDialog" @click="resetDialog()"> </BaseDialog>
  </transition>
  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="broadcastDialog"
    >
      <BaseTitle> Broadcast Notifications</BaseTitle>
      <form @submit.prevent="broadcast" class="mt-5 grid gap-5">
        <BaseInput
          type="text"
          class="!w-full"
          placeholder="Title En"
          v-model="titleEn"
          @updateInput="(val) => (titleEn = val)"
        />
        <BaseTextArea
          rows="8"
          type="text"
          class="col-span-2 !w-full"
          placeholder="Message EN"
          v-model="messageEn"
          @updateInput="(val) => (messageEn = val)"
        />
        <BaseInput
          type="text"
          class="!w-full"
          placeholder="Title Ar"
          v-model="titleAr"
          @updateInput="(val) => (titleAr = val)"
        /><BaseTextArea
          rows="8"
          type="text"
          class="col-span-2 !w-full"
          placeholder="Message Ar"
          v-model="messageAr"
          @updateInput="(val) => (messageAr = val)"
        />
        <BaseInput
          type="text"
          class="!w-full"
          placeholder="Redirect"
          v-model="redirect"
          @updateInput="(val) => (redirect = val)"
        />
        <BaseError v-if="error">{{ error }}</BaseError>
        <BaseButton>Send Message</BaseButton>
      </form>
    </div>
  </transition>
</template>
