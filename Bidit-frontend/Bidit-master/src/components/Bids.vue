<script setup>
import BidCard from './BidCard.vue'
import BaseEmpty from './Base/BaseEmpty.vue'
import BaseLoader from './Base/BaseLoader.vue'

defineProps({
  bids: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
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
  <div v-if="!isLoading || bids.length > 0">
    <BaseEmpty
      v-if="bids.length === 0"
      :msg="{
        ar: 'للأسف, لا يوجد مزادات في الوقت الحالي.',
        en: 'Oops. No bids avalible now!',
      }"
    />
    <div class="mt-6 grid gap-3 md:grid-cols-2" v-else>
      <BidCard
        v-for="(bid, index) in bids"
        :key="index"
        :bid="bid"
        :actions="actions"
        @deleteBid="(val) => emits('deleteBid', val)"
      />
    </div>
  </div>
  <BaseLoader v-else />
</template>
