<script setup>
import { useStore } from '../store'
import { getType, getStatus } from '../functions'
import dayjs from 'dayjs'
import 'dayjs/locale/ar'
import BaseType from './Base/BaseType.vue'
import BaseImg from './Base/BaseImg.vue'
const { $state: state } = useStore()

const text = $ref({
  openTitle: {
    ar: 'عرض',
    en: 'Show',
  },
  editTitle: {
    ar: 'تعديل',
    en: 'Edit',
  },
  deleteTitle: {
    ar: 'حذف',
    en: 'Delete',
  },
  price: {
    ar: 'السعر',
    en: 'Price',
  },
  status: {
    ar: 'الحالة',
    en: 'Status',
  },
  to: {
    ar: 'الى',
    en: 'To',
  },
  from: {
    ar: 'من',
    en: 'From',
  },
})

defineProps({
  bid: {
    type: Object,
    required: true,
  },
  actions: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['deleteBid'])
</script>

<template>
  <div class="relative overflow-hidden rounded-md bg-white shadow-md">
    <Router-Link
      :to="`/${state.lang}/bid/${bid._id}`"
      class="flex h-full flex-col sm:flex-row"
    >
      <BaseImg
        :src="
          bid?.item?.images?.length > 0
            ? `https://ik.imagekit.io/bidit/${bid?.item?.images[0]}`
            : ''
        "
        class="h-[250px] object-cover sm:h-auto sm:w-1/3"
      />

      <div class="p-3">
        <BaseType
          :to="`/${state.lang}/bids/${bid.item.type}`"
          v-if="bid?.item?.type"
        >
          {{ getType(bid.item.type) }}
        </BaseType>
        <h2
          class="overflow-hidden break-all text-xl font-semibold capitalize text-black"
          style="
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          "
        >
          {{ bid?.item?.name || 'N/F' }}
        </h2>

        <div
          class="mt-3 grid grid-cols-[auto,1fr] gap-x-3 capitalize text-black"
        >
          <span class="font-medium text-neutral-600">{{ $t(text.price) }}</span>
          <span class="font-medium">{{
            state.lang === 'ar'
              ? bid?.minPrice + ' جنيه'
              : bid?.minPrice + ' LE'
          }}</span
          ><span class="font-medium text-neutral-600">{{
            $t(text.status)
          }}</span>
          <span class="font-medium">{{ getStatus(bid.status) }}</span>
          <span class="font-medium text-neutral-600">{{ $t(text.from) }}</span>
          <span class="font-medium">{{
            dayjs(bid.startDate)
              .locale(state.lang)
              .format('ddd, D MMMM, YYYY | h:mm A')
          }}</span>
          <span class="font-medium text-neutral-600">{{ $t(text.to) }}</span>
          <span class="font-medium">{{
            dayjs(bid.endDate)
              .locale(state.lang)
              .format('ddd, D MMMM, YYYY | h:mm A')
          }}</span>
        </div>
      </div>
    </Router-Link>
    <div
      v-if="
        actions &&
        bid?.status !== 'canceled' &&
        bid?.status !== 'expired' &&
        state.user._id === bid?.user?._id
      "
      class="absolute top-3 z-[5]"
      :class="state.lang === 'ar' ? 'left-3' : 'right-3'"
    >
      <button
        class="flex items-center justify-center rounded-full bg-red-700 p-2 text-white hover:!bg-red-600"
        :title="bid?.status === 'soon' ? 'Delete' : 'Cancel'"
        @click="emits('deleteBid', bid)"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="
              bid?.status === 'soon'
                ? 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                : 'M6 18L18 6M6 6l12 12'
            "
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>
