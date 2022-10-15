<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import { $t, useMeta } from '../functions'
import { useStore } from '../store'

const { $state: state } = useStore()

const text = $ref({
  allCategories: {
    ar: 'كل الاقسام',
    en: 'All Categories',
  },
})

useMeta({ title: $t(text.allCategories), base: true })
</script>

<template>
  <div class="px-4">
    <BaseTitle>{{ $t(text.allCategories) }}</BaseTitle>
    <div
      class="my-4 grid grid-cols-2 gap-2 bg-white p-3 shadow-sm md:my-6 md:grid-cols-4 md:gap-5 md:rounded-md md:p-6"
    >
      <RouterLink
        :to="`/${state.lang}/bids/furniture`"
        class="transition-all hover:brightness-90"
      >
        <img
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/furniture.webp`"
          class="cursor-pointer"
        />
      </RouterLink>
      <RouterLink
        :to="`/${state.lang}/bids/technology`"
        class="transition-all hover:brightness-90"
      >
        <img
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/technology.webp`"
          class="cursor-pointer"
        />
      </RouterLink>
      <RouterLink
        :to="`/${state.lang}/bids/art`"
        class="transition-all hover:brightness-90"
      >
        <img
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/art.webp`"
          class="cursor-pointer"
        />
      </RouterLink>
      <RouterLink
        :to="`/${state.lang}/bids/cars`"
        class="transition-all hover:brightness-90"
      >
        <img
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/cars.webp`"
          class="cursor-pointer"
        />
      </RouterLink>
      <RouterLink
        :to="`/${state.lang}/bids/clothes`"
        class="transition-all hover:brightness-90"
      >
        <img
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/clothes.webp`"
          class="cursor-pointer"
        />
      </RouterLink>
      <RouterLink
        :to="`/${state.lang}/bids/antiques`"
        class="transition-all hover:brightness-90"
      >
        <img
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/antiques.webp`"
          class="cursor-pointer"
        /> </RouterLink
      ><RouterLink
        :to="`/${state.lang}/bids/animals`"
        class="transition-all hover:brightness-90"
      >
        <img
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/animals.webp`"
          class="cursor-pointer"
        />
      </RouterLink>
      <RouterLink
        :to="`/${state.lang}/bids/others`"
        class="transition-all hover:brightness-90"
      >
        <img
          :src="`https://ik.imagekit.io/bidit/assets/${state.lang}/others.webp`"
          class="cursor-pointer"
        />
      </RouterLink>
    </div>
  </div>
</template>
