<script setup>
import { getOrderStatus } from '../functions'
import dayjs from 'dayjs'
import 'dayjs/locale/ar'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import BaseImg from '../components/Base/BaseImg.vue'
import BaseType from '../components/Base/BaseType.vue'
import { useStore } from '../store'
import BaseWarn from './Base/BaseWarn.vue'

dayjs.extend(localizedFormat)
defineProps(['order'])
let { $state: state } = useStore()

const text = $ref({
  title: {
    ar: 'طلب',
    en: 'Order',
  },
  orderId: {
    ar: 'رقم الطلب',
    en: 'Order id',
  },
  status: {
    ar: 'الحالة',
    en: 'Status',
  },
  pickupTime: {
    ar: 'موعد الالتقاط',
    en: 'Pickup Time',
  },
  pickupAddress: {
    ar: 'مكان الالتقاط',
    en: 'Pickup Address',
  },
  arrivalTime: {
    ar: 'موعد الوصول',
    en: 'Arrival Time',
  },
  arrivalAddress: {
    ar: 'مكان الوصول',
    en: 'Arrival Address',
  },
  totalPrice: {
    ar: 'السعر الكلي',
    en: 'Total Price',
  },
  paymentMethod: {
    ar: 'طريقة الدفع',
    en: 'Payment Method',
  },
  price: {
    ar: 'السعر',
    en: 'Price',
  },

  shipping: {
    ar: 'الشحن',
    en: 'Shipping',
  },
  orderToBeCompleted: {
    ar: 'هذا الطلب يحتاج ان يستكمل',
    en: 'This order needs to be completed',
  },
})
</script>

<template>
  <div class="overflow-hidden rounded-md bg-white capitalize shadow-md">
    <div class="col-span-2 flex gap-3 border-b bg-slate-50">
      <BaseImg
        :src="`https://ik.imagekit.io/bidit/${order?.bid?.item?.images[0]}?tr=w-80,h-80`"
        class="h-auto w-[80px] object-cover"
      />
      <div class="py-3">
        <BaseType :to="`/${state.lang}/bids/${order?.bid?.item?.type}`">{{
          order?.bid?.item?.type || 'N/F'
        }}</BaseType>
        <h3 class="font-semibold">{{ order.bid?.item?.name }}</h3>
      </div>
    </div>
    <div class="relative grid gap-x-5 gap-y-0.5 p-3 md:grid-cols-[auto,1fr]">
      <div class="font-semibold" v-if="order.auctioneer === state?.user?._id">
        {{ $t(text.pickupAddress) }}
      </div>
      <span v-if="order.auctioneer === state?.user?._id">{{
        order.pickupAddress || 'N/F'
      }}</span>
      <div class="font-semibold" v-if="order.bidder === state?.user?._id">
        {{ $t(text.arrivalAddress) }}
      </div>
      <span v-if="order.bidder === state?.user?._id">{{
        order.arrivalAddress || 'N/F'
      }}</span>
      <div class="font-semibold" v-if="order.auctioneer === state?.user?._id">
        {{ $t(text.pickupTime) }}
      </div>
      <span v-if="order.auctioneer === state?.user?._id">{{
        dayjs(order.pickupTime)
          .locale(state.lang)
          .format('ddd, D MMMM, YYYY') || 'N/F'
      }}</span>
      <div class="font-semibold" v-if="order.bidder === state?.user?._id">
        {{ $t(text.arrivalTime) }}
      </div>
      <span v-if="order.bidder === state?.user?._id">{{
        dayjs(order.arrivalTime)
          .locale(state.lang)
          .format('ddd, D MMMM, YYYY') || 'N/F'
      }}</span>
      <div class="font-semibold">
        {{ $t(text.status) }}
      </div>
      <span>{{ getOrderStatus(order.status) }}</span>
      <div class="font-semibold" v-if="order.bidder === state?.user?._id">
        {{ $t(text.paymentMethod) }}
      </div>
      <span v-if="order.bidder === state?.user?._id">{{
        order.paymentMethod || 'N/F'
      }}</span>
      <div class="font-semibold">
        {{ $t(text.price) }}
      </div>
      <span>{{ order.price || 'N/F' }}</span>
      <div class="font-semibold" v-if="order.bidder === state?.user?._id">
        {{ $t(text.shipping) }}
      </div>
      <span v-if="order.bidder === state?.user?._id">{{
        order.shipping || 'N/F'
      }}</span>
      <div class="font-semibold" v-if="order.bidder === state?.user?._id">
        {{ $t(text.totalPrice) }}
      </div>
      <span v-if="order.bidder === state?.user?._id">{{
        order.price + order.shipping || 'N/F'
      }}</span>

      <BaseWarn
        class="col-span-2 mt-1"
        v-if="order.status === 'pending' && order.bidder === state?.user?._id"
      >
        {{ $t(text.orderToBeCompleted) }}
      </BaseWarn>
    </div>
  </div>
</template>
