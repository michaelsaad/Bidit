<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useStore } from '../store'
import BaseButton from './Base/BaseButton.vue'

const { $state: state } = $(useStore())
const { needRefresh, updateServiceWorker } = useRegisterSW()

const close = async () => {
  needRefresh.value = false
}

const text = $ref({
  updateAv: {
    ar: 'تحديث متوفر',
    en: 'An update is avalible',
  },
  update: {
    ar: 'اضغط زر اعادة التحميل للتحديث.',
    en: 'Click on reload button to update.',
  },
  reload: {
    ar: 'اعادة التحميل',
    en: 'Reload',
  },
  close: {
    ar: 'اغلاق',
    en: 'Close',
  },
})
</script>

<template>
  <transition name="zoom">
    <div
      v-if="needRefresh"
      class="fixed bottom-0 left-1/2 z-50 w-full max-w-[400px] -translate-x-1/2 overflow-hidden rounded-t-xl border border-slate-200 bg-white shadow-2xl md:bottom-3 md:-translate-x-0 md:rounded-b-xl"
      :class="
        state.lang === 'ar'
          ? 'md:left-auto md:right-3'
          : 'md:right-auto md:left-3'
      "
      role="alert"
    >
      <div
        class="flex items-center justify-between border border-transparent border-b-slate-200 bg-gray-50 font-semibold text-black"
      >
        <span class="py-2 px-3 font-medium">{{ $t(text.updateAv) }}</span>
        <button
          class="p-3 hover:bg-black/10"
          aria-label="Close"
          @click="close()"
        >
          <svg class="Bz112c Bz112c-r9oPif" viewBox="0 0 24 24" fill="#5f6368">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            ></path>
            <path fill="none" d="M0 0h24v24H0z"></path>
          </svg>
        </button>
      </div>
      <div class="p-3">
        <p class="mb-3">
          {{ $t(text.update) }}
        </p>
        <BaseButton
          class="!w-full"
          @click="updateServiceWorker()"
          v-if="needRefresh"
        >
          {{ $t(text.reload) }}</BaseButton
        >
      </div>
    </div>
  </transition>
</template>
