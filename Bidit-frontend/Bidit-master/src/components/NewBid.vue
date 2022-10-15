<script setup>
import BaseTitle from './Base/BaseTitle.vue'
import BaseInput from './Base/BaseInput.vue'
import BaseButton from './Base/BaseButton.vue'
import { useAxios } from '../functions'
import BaseError from './Base/BaseError.vue'
import BaseImg from './Base/BaseImg.vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

const props = defineProps(['item'])
const emits = defineEmits(['resetDialog'])
let router = useRouter()
let { $state: state } = useStore()

let error = $ref('')
let startDate = $ref('')
let endDate = $ref('')
let minPrice = $ref(1)

const text = $ref({
  title: {
    ar: 'مزاد جديد',
    en: 'New Bid',
  },
  startDatePlaceholder: {
    ar: 'تاريخ البدء',
    en: 'Start Date',
  },
  endDatePlaceholder: {
    ar: 'تاريخ الانتهاء',
    en: 'End Date',
  },
  minPricePlaceholder: {
    ar: 'السعر المبدئي',
    en: 'Start Price',
  },
  startBid: {
    ar: 'بدء المزاد',
    en: 'Start Bid',
  },
})

const newBid = async () => {
  let { response } = await useAxios('post', '/bid/add', {
    startDate: new Date(startDate).toGMTString(),
    endDate: new Date(endDate).toGMTString(),
    minPrice,
    status: 'soon',
    item: props.item._id,
  })

  if (!response.data.ok) error = response.data.message
  else {
    router.push(`/${state.lang}/bid/${response.data.data._id}`)
    emits('resetDialog')
  }
}
</script>

<template>
  <div
    class="fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border border-neutral-200 bg-white p-5 md:min-w-prose"
  >
    <BaseTitle>{{ $t(text.title) }}</BaseTitle>
    <form @submit.prevent="newBid()" class="mt-5 grid gap-5 text-black">
      <div
        class="grid grid-cols-[4.5rem,1fr] overflow-hidden rounded-md border-2 border-neutral-200"
      >
        <BaseImg
          :src="
            item.images.length > 0
              ? `https://ik.imagekit.io/bidit/${item.images[0]}`
              : ''
          "
          class="h-full"
        />
        <div class="p-3">
          <h2
            class="overflow-hidden break-all font-semibold capitalize md:text-xl"
          >
            {{ item.name }}
          </h2>
        </div>
      </div>

      <BaseInput
        type="datetime-local"
        class="!w-full"
        :placeholder="$t(text.startDatePlaceholder)"
        v-model="startDate"
        @updateInput="(val) => (startDate = val)"
      />
      <BaseInput
        type="datetime-local"
        class="!w-full"
        :placeholder="$t(text.endDatePlaceholder)"
        v-model="endDate"
        @updateInput="(val) => (endDate = val)"
      />
      <BaseInput
        type="number"
        class="!w-full"
        min="1"
        :placeholder="$t(text.minPricePlaceholder)"
        v-model="minPrice"
        @updateInput="(val) => (minPrice = val)"
      />
      <transition name="fade">
        <BaseError v-if="error">{{ error }}</BaseError>
      </transition>
      <BaseButton>{{ $t(text.startBid) }}</BaseButton>
    </form>
  </div>
</template>
