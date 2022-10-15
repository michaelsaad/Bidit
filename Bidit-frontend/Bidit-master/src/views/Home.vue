<script setup>
import { onMounted } from 'vue'
import { useStore } from '../store'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import BaseTitle from '../components/Base/BaseTitle.vue'
import Bids from '../components/Bids.vue'
import { $t, useAxios, useMeta } from '../functions'
import RecentlyViewedBids from '../components/RecentlyViewedBids.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import RecommendedBids from '../components/RecommendedBids.vue'

const { $state: state } = $(useStore())

let bids = $ref([])
let isLoading = $ref(true)
let preferedWidth = $ref(1200)

onMounted(async () => {
  isLoading = true
  let { response } = await useAxios('get', '/bid/all?limit=4')

  if (response.data.ok) {
    bids = response.data.data.bids
  }

  isLoading = false

  setPreferedWidth()
})

const brp = $ref({
  900: {
    itemsToShow: 1.8,
  },
  0: {
    itemsToShow: 1.04,
  },
})

const setPreferedWidth = () => {
  if (window.innerWidth < 400) return (preferedWidth = 400)
  if (window.innerWidth < 600) return (preferedWidth = 600)
  if (window.innerWidth < 800) return (preferedWidth = 800)
  if (window.innerWidth < 1000) return (preferedWidth = 1000)
  if (window.innerWidth < 1000) return (preferedWidth = 1000)
  else preferedWidth = 1200
}

const text = $ref({
  latest: {
    ar: `اخر المزادات`,
    en: `Latest Bids`,
  },
  viewAllBids: {
    ar: `عرض جميع المزادات`,
    en: `View All Bids`,
  },
})

useMeta({
  title: $t({
    en: 'Bidit - Online Auction Platform 🔥',
    ar: 'Bidit - منصة المزادات الالكترونية 🔥',
  }),
  base: true,
})
</script>

<template>
  <header
    class="relative -mt-2 overflow-hidden bg-white pt-2 shadow-sm md:rounded-md"
  >
    <Carousel
      :breakpoints="brp"
      class="w-[inherit] gap-3 py-3"
      :autoplay="4000"
      :wrap-around="true"
      dir="ltr"
    >
      <Slide class="p-0.5 md:p-2" key="1">
        <img
          class="pointer-events-none"
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/shipping.webp?tr=w-${preferedWidth}`"
        />
      </Slide>
      <Slide class="p-0.5 md:p-2" key="2">
        <img
          class="pointer-events-none"
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/easyToUse.webp?tr=w-${preferedWidth}`"
        />
      </Slide>
      <Slide class="p-0.5 md:p-2" key="3">
        <img
          class="pointer-events-none"
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/participate.webp?tr=w-${preferedWidth}`"
        />
      </Slide>
      <Slide class="p-0.5 md:p-2" key="4">
        <img
          class="pointer-events-none"
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/shipping.webp?tr=w-${preferedWidth}`"
        />
      </Slide>
      <Slide class="p-0.5 md:p-2" key="5">
        <img
          class="pointer-events-none"
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/easyToUse.webp?tr=w-${preferedWidth}`"
        />
      </Slide>
      <Slide class="p-0.5 md:p-2" key="6">
        <img
          class="pointer-events-none"
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/participate.webp?tr=w-${preferedWidth}`"
        />
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </header>

  <section class="my-4 p-4 md:my-6" v-if="bids">
    <BaseTitle>{{ $t(text.latest) }}</BaseTitle>
    <Bids :bids="bids" :isLoading="isLoading" />
  </section>

  <section
    class="my-4 grid grid-cols-2 gap-2 bg-white p-3 shadow-sm md:my-6 md:grid-cols-4 md:gap-5 md:rounded-md md:p-6"
  >
    <RouterLink
      :to="`/${state.lang}/bids/technology`"
      class="transition-all hover:brightness-90"
    >
      <img
        :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/technology.webp?tr=w-${preferedWidth}`"
        class="cursor-pointer"
      />
    </RouterLink>
    <RouterLink
      :to="`/${state.lang}/bids/art`"
      class="transition-all hover:brightness-90"
    >
      <img
        :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/art.webp?tr=w-${preferedWidth}`"
        class="cursor-pointer"
      />
    </RouterLink>
    <RouterLink
      :to="`/${state.lang}/bids/antiques`"
      class="transition-all hover:brightness-90"
    >
      <img
        :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/antiques.webp?tr=w-${preferedWidth}`"
        class="cursor-pointer"
      />
    </RouterLink>
    <RouterLink
      :to="`/${state.lang}/bids/categories`"
      class="transition-all hover:brightness-90"
    >
      <img
        :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/cats.webp?tr=w-${preferedWidth}`"
        class="cursor-pointer"
      />
    </RouterLink>
  </section>

  <RecentlyViewedBids v-if="state.user" />

  <RecommendedBids v-if="state.user" />

  <div class="text-center">
    <RouterLink :to="`/${state.lang}/bids`">
      <BaseButton> {{ $t(text.viewAllBids) }} </BaseButton>
    </RouterLink>
  </div>
</template>
