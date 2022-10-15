<script setup>
import { useStore } from '../store'
import { useRouter } from 'vue-router'
import { list } from '../lang/navigation.json'
import { categories } from '../lang/categories.json'
import { onMounted, onUnmounted } from 'vue'

const { $state: state } = $(useStore())
const emits = defineEmits(['hideNav'])
const router = useRouter()

const handleResize = () => {
  if (window.innerWidth > 768) emits('hideNav')
}

onMounted(() => {
  addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  removeEventListener('resize', handleResize)

  document.body.style.overflow = 'auto'
})

const text = $ref({
  lang: {
    name: {
      ar: 'اللغة',
      en: 'Languages',
    },
    languages: [
      {
        lang: 'ع',
        flag: '/images/flags/eg.svg',
      },
      {
        lang: 'en',
        flag: '/images/flags/us.svg',
      },
    ],
  },
})

const hideNav = () => {
  emits('hideNav')
}

const changeLang = (lang) => {
  let newLang = lang === 'ع' ? 'ar' : 'en'

  newLang === 'ar' ? (document.body.dir = 'rtl') : (document.body.dir = 'ltr')

  localStorage.setItem('lang', newLang)
  state.lang = newLang
  router.replace({ params: { lang: newLang } })
  hideNav()
}
</script>

<template>
  <div
    class="fixed top-0 left-0 z-10 h-full w-full overflow-auto bg-bi-200 transition-all"
  >
    <div class="mt-20 flex w-full flex-col items-start gap-5 text-black">
      <ul class="grid w-full grid-cols-2">
        <li class="col-span-2 mb-3 px-3 text-xl font-extrabold text-bi-300">
          {{ $t(categories.name) }}
        </li>
        <li @click="hideNav">
          <RouterLink
            class="block py-2 px-3 text-center text-lg font-semibold capitalize hover:bg-bi-100"
            :to="`/${state.lang}/bids`"
          >
            {{ $t({ ar: 'الكل', en: 'all' }) }}
          </RouterLink>
        </li>
        <li
          v-for="(item, index) in categories.items"
          class="h-full"
          @click="hideNav"
          :key="index"
        >
          <RouterLink
            :to="`/${state.lang}/bids/${item.to}`"
            class="block py-2 px-3 text-center text-lg font-semibold capitalize hover:bg-bi-100"
            >{{ $t(item) }}
          </RouterLink>
        </li>
      </ul>
      <ul class="w-full">
        <li class="mb-3 px-3 text-xl font-extrabold text-bi-300">
          {{ $t(list.name) }}
        </li>
        <li
          v-for="(item, index) in list.items"
          class="h-full"
          @click="hideNav"
          :key="index"
        >
          <RouterLink
            :to="`/${state.lang}/${item.to}`"
            class="block py-2 px-3 text-center text-lg font-semibold capitalize hover:bg-bi-100"
            >{{ $t(item) }}
          </RouterLink>
        </li>
      </ul>
      <ul class="mb-3 grid w-full grid-cols-2">
        <li class="col-span-2 mb-3 px-3 text-xl font-extrabold text-bi-300">
          {{ $t(text.lang.name) }}
        </li>
        <li v-for="(item, index) in text.lang.languages" :key="index">
          <button
            class="flex w-full items-center justify-center gap-3 py-2 px-3 text-lg font-semibold hover:bg-bi-100"
            @click="changeLang(item.lang)"
          >
            <img :src="item.flag" :alt="item.lang" class="w-6" />
            <span
              class="font-semibold uppercase"
              :class="{ '-mt-2': item.lang === 'ar' }"
            >
              {{ item.lang }}</span
            >
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
