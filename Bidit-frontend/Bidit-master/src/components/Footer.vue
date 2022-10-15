<script setup>
import { useStore } from '../store'
import { list } from '../lang/navigation.json'
import { categories } from '../lang/categories.json'

const { $state: state } = $(useStore())

const text = $ref({
  by: {
    ar: 'تصميم وبرمجة',
    en: 'Designed and Developed by',
    logo: 'Bid!T',
  },
})
</script>

<template>
  <footer class="mt-6 bg-bi-200 p-5 pt-6">
    <div class="mx-auto flex max-w-atreus flex-col gap-5 bg-bi-200">
      <div class="grid-cols-3 capitalize sm:grid">
        <div class="col-span-2">
          <h2 class="col-span-2 mb-2 text-lg font-extrabold text-bi-300">
            {{ $t(categories.name) }}
          </h2>
          <ul class="flex h-[calc(28px*5)] flex-col flex-wrap">
            <li>
              <RouterLink
                :to="`/${state.lang}/bids`"
                class="font-medium text-black transition-colors hover:text-teal-600"
                >{{ $t({ ar: 'الكل', en: 'all' }) }}
              </RouterLink>
            </li>
            <li v-for="(item, index) in categories.items" :key="index">
              <RouterLink
                :to="`/${state.lang}/bids/${item.to}`"
                class="font-medium text-black transition-colors hover:text-teal-600"
                >{{ $t(item) }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-2 text-lg font-extrabold text-bi-300">
            {{ $t(list.name) }}
          </h2>
          <ul class="flex h-[calc(28px*5)] flex-col flex-wrap gap-x-40">
            <li v-for="(item, index) in list.items" :key="index">
              <RouterLink
                :to="`/${state.lang}/${item.to}`"
                class="font-medium text-black transition-colors hover:text-teal-600"
                >{{ $t(item) }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="relative">
        <h4
          class="mt-6 mb-2 inline-block bg-clip-text font-semibold text-black"
        >
          {{ $t(text.by) }}
          <span class="font-merriweather font-extrabold">{{
            text.by.logo
          }}</span>
        </h4>
      </div>
    </div>
  </footer>
</template>
