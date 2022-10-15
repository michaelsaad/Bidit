<script setup>
import { useStore } from '../../store'
const { $state: state } = $(useStore())
</script>

<template>
  <button
    :="$attrs"
    class="group relative flex items-center gap-3 rounded-md border border-bi-300 bg-bi-300 px-5 py-3 text-lg font-bold backdrop-blur-sm transition-colors hover:border-bi-400 hover:bg-bi-400 md:px-8 md:py-4 md:text-xl"
  >
    <slot />
    <span
      v-if="state.lang === 'en'"
      class="font-extrabold transition-all group-hover:translate-x-2"
      >&rarr;</span
    >
    <span
      v-if="state.lang === 'ar'"
      class="font-extrabold transition-all group-hover:-translate-x-2"
      >&larr;</span
    >
  </button>
</template>
