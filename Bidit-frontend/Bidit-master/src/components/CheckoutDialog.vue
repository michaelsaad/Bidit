<script setup>
import BaseTitle from './Base/BaseTitle.vue'
import BaseButton from './Base/BaseButton.vue'
import { useAxios, usePaymob } from '../functions'
import BaseError from './Base/BaseError.vue'
import { useStore } from '../store'
import BaseInput from './Base/BaseInput.vue'

const props = defineProps({
  order: {
    required: true,
  },
})
const emits = defineEmits(['done'])
let { $state: state } = useStore()

let error = $ref('')
let paymentMethod = $ref('cod')
let arrivalAddress = $ref(state?.user?.address)

const proceedPayment = async () => {
  if (paymentMethod === 'cod') {
    let { response } = await useAxios(
      'patch',
      `/order/activate/${props.order._id}`,
      { paymentMethod, arrivalAddress },
    )

    if (!response.data.ok) error = response.data.message
    else emits('done')
  } else {
    let paymentLink = await usePaymob(props.order)
    window.open(paymentLink, '_blank').focus()
  }
}

const text = $ref({
  title: {
    ar: 'الدفع',
    en: 'Checkout',
  },
  proceed: {
    ar: 'استكمال',
    en: 'Proceed',
  },
  addressPlaceholder: {
    ar: 'العنوان',
    en: 'Address',
  },
})
</script>

<template>
  <div
    class="fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border border-neutral-200 bg-white p-5 md:min-w-prose"
  >
    <BaseTitle>{{ $t(text.title) }}</BaseTitle>
    <form @submit.prevent="proceedPayment()" class="mt-5 grid gap-5 text-black">
      <div class="grid grid-cols-2 gap-3">
        <label for="pm" class="col-span-2 font-medium">Payment Method</label>
        <span
          class="cursor-pointer rounded-md bg-slate-100 p-2.5 text-center font-semibold shadow-sm transition-all"
          :class="paymentMethod === 'cod' ? 'ring-2 ring-indigo-700' : ''"
          @click="paymentMethod = 'cod'"
        >
          Cash On Delivery
        </span>
        <span
          class="cursor-pointer rounded-md bg-slate-100 p-2.5 text-center font-semibold shadow-sm transition-all"
          :class="paymentMethod === 'cc' ? 'ring-2 ring-indigo-700' : ''"
          @click="paymentMethod = 'cc'"
        >
          Credit Card
        </span>
      </div>

      <BaseInput
        type="text"
        class="!w-full"
        :placeholder="$t(text.addressPlaceholder)"
        v-model="arrivalAddress"
        @updateInput="(val) => (arrivalAddress = val)"
        required
      />

      <transition name="fade">
        <BaseError v-if="error">{{ error }}</BaseError>
      </transition>
      <BaseButton>{{ $t(text.proceed) }}</BaseButton>
    </form>
  </div>
</template>
