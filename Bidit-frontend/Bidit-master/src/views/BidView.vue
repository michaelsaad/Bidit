<script setup>
import { useStore } from '../store'
import { getType, getStatus, getPricePerLang, $t, useAxios } from '../functions'
import { reportTypes } from '../lang/reportTypes.json'
import { onMounted, onUnmounted, watch, watchEffect } from 'vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseType from '../components/Base/BaseType.vue'
import { io } from 'socket.io-client'
import dayjs from 'dayjs'
import { useRoute, useRouter } from 'vue-router'
import BaseError from '../components/Base/BaseError.vue'
import ImageViewer from '../components/ImageViewer.vue'
import { computed } from '@vue/reactivity'
import BaseDialog from '../components/Base/BaseDialog.vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseTextArea from '../components/Base/BaseTextArea.vue'
import BaseSelect from '../components/Base/BaseSelect.vue'
import PeopleAlsoViewed from '../components/PeopleAlsoViewed.vue'
import BaseLoader from '../components/Base/BaseLoader.vue'

let reportsDialog = $ref(false),
  reportType = $ref(reportTypes[0].en),
  reportDesc = $ref('')

const { $state: state } = useStore()
const route = useRoute()
const router = useRouter()
const socket = io(state.BASE_URL)

let isLoading = $ref(false)
let isLoadingNewReport = $ref(false)
let error = $ref()
let bid = $ref(null)
let currBid = $ref({ price: 0, user: null })
let newPrice = $ref(0)
let timer = $ref('')
let status = $ref('')
let clockPrefix = $ref('')
let bidID = route.params.bidID

const initConnection = async () => {
  isLoading = true

  if (!route.params.bidID) router.replace(`/${state.lang}/404`)
  bidID = route.params.bidID
  if (socket.connected) {
    bid = null
    currBid = { price: 0, user: null }
    newPrice = 0
    timer = ''
    status = ''
    clockPrefix = ''
    socket.emit(
      'pageLoaded',
      route.params.bidID,
      state?.user?._id ? state?.user?._id : null,
    )
  }
}

onMounted(async () => {
  initConnection()

  socket.on('connect', () => {
    socket.emit(
      'pageLoaded',
      route.params.bidID,
      state?.user?._id ? state?.user?._id : null,
    )

    socket.on('bidFound', (data) => {
      bid = data
      isLoading = false
      calcDiff()
      setInterval(calcDiff, 1000)
    })

    socket.on('bidNotFound', () => router.replace(`/${state.lang}/404`))
    socket.on('bidError', (err) => {
      error = err
    })
  })
})

watch(route, () => {
  if (route.params.bidID) {
    initConnection()
  }
})

watchEffect(() => {
  if (bid) {
    if (bid?.bidsHistory.length === 0) {
      newPrice = bid.minPrice + getOffest.value
      currBid = { user: null, price: bid.minPrice }
    } else
      bid?.bidsHistory.forEach((aBid) => {
        if (currBid.price < aBid.price) {
          currBid = aBid
          newPrice = currBid.price + getOffest.value
        }
      })
  }
})

onUnmounted(async () => {
  socket.close()
})

const joinBid = () => {
  if (!state.isLoggedIn || !state.user)
    return router.push({
      name: `login`,
      query: { ref: 'login_to_join' },
    })

  let data = { newPrice, userID: state.user._id, bidID: route.params.bidID }
  socket.emit('joinBid', data)
}

const getOffest = computed(() => {
  let base = currBid.price
  if (base === 0) base = bid.minPrice

  if (base <= 10) return 1
  if (base <= 20) return 2
  if (base <= 50) return 5
  if (base <= 100) return 10
  if (base <= 250) return 25
  if (base <= 500) return 50
  if (base <= 750) return 75
  if (base <= 1000) return 100
  if (base <= 1250) return 125
  if (base <= 1500) return 150
  if (base <= 5000) return getNumWOZeros(Math.floor((base * 10) / 100))
  if (base <= 10000) return getNumWOZeros(Math.floor((base * 5) / 100))
  if (base <= 1000000) return getNumWOZeros(Math.floor((base * 2) / 100))
  else return getNumWOZeros(Math.floor((base * 0.5) / 100))
})

const getNumWOZeros = (num) => {
  let arr = num.toString().split('')
  let str = ''

  arr.forEach((char, i) => {
    if (i == 0) str += char
    else str += '0'
  })

  return parseInt(str)
}

const calcDiff = () => {
  let startDate = dayjs(bid?.startDate)
  let endDate = dayjs(bid?.endDate)
  let now = dayjs()
  let diff = ''
  let days
  let hours
  let mins
  let secs

  // FROM START

  days = startDate.diff(now, 'd', true)
  hours = (days % 1) * 24
  mins = (hours % 1) * 60
  secs = (mins % 1) * 60

  if (Math.floor(days) > 0)
    diff += Math.floor(days) + (state.lang === 'ar' ? 'ي ' : 'd ')
  if (Math.floor(hours) >= 0)
    diff += Math.floor(hours) + (state.lang === 'ar' ? 'س ' : 'h ')
  if (Math.floor(mins) >= 0)
    diff += Math.floor(mins) + (state.lang === 'ar' ? 'د ' : 'm ')
  if (Math.floor(secs) >= 0) {
    diff += Math.floor(secs) + (state.lang === 'ar' ? 'ث' : 's ')

    timer = diff
    status = 'soon'
    clockPrefix = $t(text.toLive)
    return
  }

  // TO END

  days = endDate.diff(now, 'd', true)
  hours = (days % 1) * 24
  mins = (hours % 1) * 60
  secs = (mins % 1) * 60

  diff = ''

  if (Math.floor(days) > 0)
    diff += Math.floor(days) + (state.lang === 'ar' ? 'ي ' : 'd ')
  if (Math.floor(hours) >= 0)
    diff += Math.floor(hours) + (state.lang === 'ar' ? 'س ' : 'h ')
  if (Math.floor(mins) >= 0)
    diff += Math.floor(mins) + (state.lang === 'ar' ? 'د ' : 'm ')
  if (Math.floor(secs) >= 0) {
    diff += Math.floor(secs) + (state.lang === 'ar' ? 'ث' : 's ')

    timer = diff
    status = 'active'
    clockPrefix = $t(text.left)
  } else {
    timer = ''
    status = 'expired'
    clockPrefix = ''
  }
}

const text = $ref({
  bidBy: {
    ar: 'بواسطة',
    en: 'Bid by',
  },
  description: {
    ar: 'الوصف',
    en: 'Description',
  },
  price: {
    ar: 'السعر المبدئي',
    en: 'Start Price',
  },
  joinBid: {
    ar: 'انضم للمزاد',
    en: 'Join Bid',
  },
  bidsMade: {
    ar: 'عدد المزايدات',
    en: 'Bids Made',
  },
  currBid: {
    ar: 'السعر الحالي',
    en: 'Current Bid',
  },
  report: {
    ar: 'الابلاغ عن المزاد!',
    en: 'Report This Bid!',
  },
  left: {
    ar: 'متبقي',
    en: 'Left',
  },
  toLive: {
    ar: 'على النشاط',
    en: 'To Live',
  },
  youAreTheHeighstBidder: {
    ar: 'حالياً انت اعلى مزايد.',
    en: 'Currently You Are the Heighst bidder.',
  },
  youWonTheBid: {
    ar: 'مبروك. لقد ربحت المزاد.',
    en: ' Congratulations. You Won This Bid.',
  },
  newReport: {
    ar: 'ابلاغ جديد',
    en: 'New Report',
  },
  typePlaceholder: {
    ar: 'النوع',
    en: 'Type',
  },
  descriptionPlaceholder: {
    ar: 'الوصف',
    en: 'Description',
  },
  addReport: {
    ar: 'أضافه ابلاغ',
    en: 'Add Report',
  },
})

const newReport = async () => {
  isLoadingNewReport = true

  let body = {
    type: reportType,
    for: bidID,
    description: reportDesc,
    recipient: bid?.user?._id,
  }

  let { response } = await useAxios('post', '/report/add', body)

  if (!response.data.ok) error = response.data.message
  else router.push(`/${state.lang}/account/reports`)
  isLoadingNewReport = false
}
</script>

<template>
  <div
    class="grid overflow-hidden rounded-md bg-white shadow-sm sm:grid-cols-2"
    v-if="!isLoading"
  >
    <div>
      <ImageViewer
        v-if="bid?.item?.images"
        :imgs="bid?.item?.images"
        class="mx-auto block md:p-6"
      />
    </div>

    <div class="bg-bi-800">
      <div class="p-4 md:p-6">
        <BaseType
          :to="`/${state.lang}/bids/${bid?.item.type}`"
          class="mb-2 inline-block rounded-2xl bg-indigo-600 px-3 font-medium capitalize"
        >
          {{ getType(bid?.item.type) }}
        </BaseType>

        <h2
          class="overflow-hidden break-all text-xl font-semibold capitalize text-black md:text-[22px]"
        >
          {{ bid?.item.name }}
        </h2>

        <div class="my-1 flex flex-wrap items-center gap-2">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-neutral-400">{{
              $t(text.bidBy)
            }}</span>

            <span class="font-semibold">{{ bid?.user?.name || 'N/F' }}</span>
          </div>
        </div>

        <p class="mt-3 text-sm font-medium text-neutral-400">
          {{ $t(text.description) }}
        </p>
        <p class="mb-2 font-medium text-neutral-500">
          {{ bid?.item?.description || 'N/F' }}
        </p>

        <div
          class="grid gap-x-5 gap-y-2 break-words pt-3"
          :class="status !== 'soon' ? 'md:grid-cols-3' : ''"
        >
          <div
            class="overflow-hidden rounded-md border-2 p-3"
            v-if="status !== 'soon'"
          >
            <h4 class="text-sm text-gray-600">{{ $t(text.bidsMade) }}</h4>
            <div class="flex items-end gap-1">
              <h5 class="break-all text-3xl font-bold">
                {{ bid?.bidsHistory.length }}
              </h5>
              <span class="mb-0.5 text-sm">{{
                state.lang === 'ar' ? 'مزايدات' : 'Bids'
              }}</span>
            </div>
          </div>
          <div class="overflow-hidden rounded-md border-2 p-3">
            <h4 class="text-sm text-gray-600">{{ $t(text.price) }}</h4>
            <div class="flex items-end gap-1">
              <h5 class="break-all text-3xl font-bold">
                {{ getPricePerLang(bid?.minPrice) }}
              </h5>
              <span class="mb-0.5 text-sm">{{
                state.lang === 'ar' ? 'جنيه' : 'LE'
              }}</span>
            </div>
          </div>
          <div
            class="overflow-hidden rounded-md border-2 p-3"
            v-if="status !== 'soon'"
          >
            <h4 class="text-sm text-gray-600">{{ $t(text.currBid) }}</h4>
            <div class="flex items-end gap-1">
              <h5 class="break-all text-3xl font-bold">
                {{
                  getPricePerLang(
                    bid?.bidsHistory.length > 0 ? currBid.price : 0,
                  )
                }}
              </h5>
              <span class="mb-0.5 text-sm">{{
                state.lang === 'ar' ? 'جنيه' : 'LE'
              }}</span>
            </div>
          </div>
        </div>

        <BaseError v-if="error" class="mt-4">{{ error }}</BaseError>

        <div
          class="my-3 flex w-full items-center justify-between rounded-md bg-gray-800 px-3 py-2 text-white"
        >
          <h4 class="text-lg font-semibold capitalize">
            {{ getStatus(status) }}
            <span
              class="relative mx-0.5 inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-red-700"
              v-if="status === 'active'"
            />
          </h4>
          <div>
            {{ timer }}
            &nbsp;
            <span class="text-lg font-semibold">{{ clockPrefix }}</span>
          </div>
        </div>

        <div
          class="my-3 flex w-full items-center justify-between rounded-md bg-gray-800 px-3 py-2 text-white"
          v-if="status === 'expired' && state?.user?._id === currBid.user"
        >
          {{ $t(text.youWonTheBid) }}
        </div>

        <div
          class="my-3 flex w-full items-center justify-between rounded-md bg-gray-800 px-3 py-2 text-white"
          v-if="status === 'active' && state?.user?._id === currBid.user"
        >
          {{ $t(text.youAreTheHeighstBidder) }}
        </div>

        <form
          v-if="
            status === 'active' &&
            bid?.user?._id !== state?.user?._id && // Creator is logged user
            currBid.user !== state?.user?._id // Heighst Bidder is logged user
          "
          class="flex items-center justify-between"
          @submit.prevent="joinBid"
        >
          <div class="flex w-min items-center rounded-md bg-gray-200">
            <BaseButton
              class="h-[40px] px-2.5"
              @click.prevent="
                newPrice < currBid.price
                  ? (newPrice = currBid.price + getOffest)
                  : (newPrice += getOffest)
              "
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </BaseButton>
            <input
              v-model="newPrice"
              type="number"
              placeholder="Your Price"
              class="h-[40px] w-24 bg-transparent text-center font-semibold text-black focus:outline-none md:col-span-3"
              style="-moz-appearance: textfield; -webkit-appearance: none"
              :min="currBid.price + getOffest"
            />
            <BaseButton
              class="h-[40px] px-2.5"
              @click.prevent="
                newPrice > currBid.price + getOffest
                  ? (newPrice -= getOffest)
                  : (newPrice = currBid.price + getOffest)
              "
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                ></path>
              </svg>
            </BaseButton>
          </div>

          <BaseButton>
            {{ $t(text.joinBid) }}
          </BaseButton>
        </form>

        <button
          v-if="state?.user?._id !== bid?.user?._id"
          class="mt-8 flex justify-end font-semibold text-bi-300 underline hover:text-bi-400"
          @click="reportsDialog = true"
        >
          {{ $t(text.report) }}
        </button>
      </div>
    </div>
  </div>
  <BaseLoader v-else class="mt-14" />

  <PeopleAlsoViewed :isLoadingBidView="isLoading" />

  <transition name="fade">
    <BaseDialog v-if="reportsDialog" @click="reportsDialog = false">
    </BaseDialog>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="reportsDialog"
    >
      <BaseTitle> {{ $t(text.newReport) }}</BaseTitle>
      <form @submit.prevent="newReport" class="mt-5 grid gap-5">
        <BaseSelect
          v-model="reportType"
          class="!w-full"
          @updateInput="(val) => (reportType = val)"
          :placeholder="$t(text.typePlaceholder)"
        >
          <option
            v-for="(type, index) in reportTypes"
            :key="index"
            :value="type.en"
            class="capitalize"
          >
            {{ $t(type) }}
          </option>
        </BaseSelect>
        <BaseTextArea
          rows="8"
          type="text"
          class="col-span-2 !w-full"
          :placeholder="$t(text.descriptionPlaceholder)"
          v-model="reportDesc"
          @updateInput="(val) => (reportDesc = val)"
        />
        <BaseError v-if="error">{{ error }}</BaseError>
        <BaseButton :disabled="isLoadingNewReport && 'disabled'"
          >{{ $t(text.addReport) }}
        </BaseButton>
      </form>
    </div>
  </transition>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
