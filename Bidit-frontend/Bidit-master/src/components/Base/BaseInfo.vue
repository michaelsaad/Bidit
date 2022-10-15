<script setup>
import { useStore } from '../../store'

let { $state: state } = useStore()
let isHovering = $ref(false)
</script>

<template>
  <div
    class="absolute top-1/2 z-[4] -translate-y-1/2"
    :class="state.lang === 'ar' ? '-left-8' : '-right-8'"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <svg
      class="h-6 w-6 cursor-pointer rounded-full p-0.5 hover:bg-slate-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <transition name="fade">
      <p
        v-if="isHovering"
        class="absolute mt-3 w-[26ch] rounded-md bg-white px-2 py-1 !text-base font-normal shadow-lg after:absolute after:-top-2 after:w-0 after:border-8 after:border-t-0 after:border-x-transparent after:border-b-white"
        :class="
          state.lang === 'ar'
            ? 'left-1/2 -translate-x-1/2 after:left-1/2 after:-translate-x-1/2 sm:left-auto sm:!-right-1 sm:translate-x-0 sm:after:left-auto sm:after:right-2 sm:after:translate-x-0'
            : 'left-1/2 -translate-x-1/2 after:left-1/2 after:-translate-x-1/2 sm:!-left-1  sm:translate-x-0 sm:after:left-2 sm:after:translate-x-0'
        "
      >
        <slot />
      </p>
    </transition>
  </div>
</template>
