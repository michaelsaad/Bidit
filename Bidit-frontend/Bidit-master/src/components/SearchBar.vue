<script setup>
import { useStore } from '../store'
import { onMounted, onUnmounted } from 'vue'
import { useAxios, useDebounce } from '../functions'
import router from '../router'

const { $state: state } = $(useStore())
const emits = defineEmits(['exitSearch'])
let currRes = $ref(0)
let inputSearch = $ref()
let searchText = $ref('')
let isLoading = $ref(false)
let results = $ref([])

const search = (e) => {
  searchText = e.target.value
  isLoading = true

  let debounce = useDebounce(async () => {
    currRes = 0

    if (searchText.trim() === '') {
      results = []
      isLoading = false
      return
    }

    let { response } = await useAxios('get', `/bid/search/${searchText}`)
    if (response.data.data) results = response.data.data
    else results = []
    isLoading = false
  })

  debounce()
}

const changeCurr = (i) => {
  currRes = i
}

const handleKeys = (e) => {
  e.preventDefault()

  if (e.keyCode === 13) {
    router.replace(`/${state.lang}/bid/${results[currRes]?._id}`)
    emits('exitSearch')
  }
  if (e.keyCode === 27) emits('exitSearch')

  if (e.keyCode === 38) {
    if (currRes === 0) {
      currRes = results.length - 1
    } else currRes -= 1
  }

  if (e.keyCode === 40) {
    if (currRes === results.length - 1) {
      currRes = 0
    } else currRes += 1
  }
}

onMounted(() => {
  addEventListener('keyup', handleKeys)
  inputSearch.focus()
})
onUnmounted(() => {
  removeEventListener('keyup', handleKeys)
})

const text = $ref({
  placeholder: {
    ar: 'بحث المزادات',
    en: 'Search Bids',
  },
  toNav: {
    ar: 'للتنقل',
    en: 'to navigate',
  },
  toClose: {
    ar: 'للغلق',
    en: 'to close',
  },
  toSelect: {
    ar: 'للاختيار',
    en: 'to select',
  },
  typeToSearch: {
    ar: 'ابدأ بالكتابة للبحث',
    en: 'Start typing something to search',
  },
  noSearchRes: {
    ar: 'للأسف لا توجد نتيجة ل ',
    en: 'Oops, No Results for ',
  },
})
</script>

<template>
  <div
    class="fixed left-1/2 z-20 mt-20 block max-h-[85vh] w-full origin-top-left -translate-x-1/2 overflow-hidden rounded-md bg-white shadow-lg sm:mx-0 sm:w-[600px]"
    role="combobox"
    aria-expanded="true"
    aria-haspopup="listbox"
  >
    <div class="p-5 pb-1">
      <div class="relative">
        <input
          ref="inputSearch"
          :value="searchText"
          @input="search($event)"
          type="text"
          class="bg-bi-800 w-full rounded-sm border border-bi-200 px-3 py-2.5 font-medium text-black outline-none ring-2 ring-indigo-400 focus:ring-indigo-700"
          :class="state.lang === 'ar' ? 'pr-11' : 'pl-11'"
          :placeholder="$t(text.placeholder)"
        />

        <svg
          class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-black"
          :class="state.lang === 'ar' ? 'right-3' : 'left-3'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.8"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
    </div>

    <ul
      class="flex max-h-[60vh] scroll-p-4 flex-col gap-2 overflow-auto px-5 py-4 text-black"
      v-if="results.length > 0"
    >
      <transition-group name="fade">
        <li
          v-for="(result, index) in results"
          :key="index"
          :id="`res_${index}`"
          :class="currRes === index ? ' !bg-bi-300' : ''"
          class="list-none overflow-hidden rounded-md bg-bi-400 font-medium text-white transition-colors"
          @mouseenter="changeCurr(index)"
        >
          <RouterLink
            :to="`/${state.lang}/bid/${result?._id}`"
            class="flex gap-3"
            @click="emits('exitSearch')"
          >
            <img
              :src="`https://ik.imagekit.io/bidit/${result?.item?.images[0]}`"
              class="h-14 w-14 object-cover"
              alt=""
            />
            <span class="my-auto">
              {{ result.item.name }}
            </span>
          </RouterLink>
        </li>
      </transition-group>
    </ul>
    <div class="p-5 py-10 text-center" v-else>
      <div v-if="searchText.trim() === ''">
        {{ $t(text.typeToSearch) }}
      </div>
      <div v-if="!isLoading && searchText.trim() !== ''">
        {{ $t(text.noSearchRes) }} "<b>{{ searchText }}</b
        >"
      </div>
      <div v-if="isLoading && searchText.trim() !== ''">
        {{ $t({ ar: 'بحث ...', en: 'Searching ...' }) }}
      </div>
    </div>

    <ul
      class="hidden gap-4 border-t border-bi-100 bg-bi-100 px-5 py-2 text-black sm:flex"
      v-if="results.length > 0"
    >
      <li class="flex items-center gap-1.5">
        <span class="DocSearch-Commands-Key"
          ><svg width="15" height="15">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
            >
              <path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path>
            </g></svg></span
        ><span class="DocSearch-Label">{{ $t(text.toSelect) }}</span>
      </li>
      <li class="flex items-center gap-1.5">
        <div class="flex items-center">
          <span class="DocSearch-Commands-Key"
            ><svg width="15" height="15">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
              >
                <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path>
              </g></svg></span
          ><span class="DocSearch-Commands-Key"
            ><svg width="15" height="15">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
              >
                <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path>
              </g>
            </svg>
          </span>
        </div>
        <span class="DocSearch-Label">{{ $t(text.toNav) }}</span>
      </li>
      <li class="flex items-center gap-1.5">
        <span class="DocSearch-Commands-Key"
          ><svg width="15" height="15">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
            >
              <path
                d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"
              ></path>
            </g></svg></span
        ><span class="DocSearch-Label">{{ $t(text.toClose) }}</span>
      </li>
    </ul>
  </div>
</template>
