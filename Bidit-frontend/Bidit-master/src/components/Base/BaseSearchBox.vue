<script setup>
import { watch } from 'vue'

defineProps({
  placeholder: {
    type: String,
    default: 'Search ...',
  },
})

const emits = defineEmits(['search', 'clear'])

let searchValue = $ref('')

watch($$(searchValue), () => {
  if (searchValue === '') emits('clear')
})
</script>

<template>
  <form
    @submit.prevent="$emit('search', searchValue)"
    class="flex w-full sm:w-auto"
  >
    <input
      type="search"
      v-model="searchValue"
      class="w-full rounded-l-md py-2 px-3 focus:outline-none sm:w-[300px]"
      :placeholder="placeholder"
    />
    <button class="rounded-r-md bg-indigo-600 p-2 hover:bg-indigo-500">
      <svg
        class="h-6 w-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </button>
  </form>
</template>
