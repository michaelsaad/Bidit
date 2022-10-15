<script setup>
defineProps({
  isLoading: {
    type: Boolean,
  },
  curr: {
    type: Number,
  },
  max: {
    type: Number,
  },
})

const text = $ref({
  btn: {
    ar: 'أظهر المزيد',
    en: 'Show More',
  },
  showing: {
    ar: 'عرض',
    en: 'Showing',
  },
  from: {
    ar: 'من',
    en: 'from',
  },
})
</script>

<template>
  <div class="mt-8 flex flex-col items-center justify-center gap-3">
    <span class="select-none text-xs font-semibold text-gray-500"
      >{{ $t(text.showing) }} {{ curr }} {{ $t(text.from) }} {{ max }}</span
    >
    <div
      class="relative h-1 w-[250px] overflow-hidden rounded-full bg-white shadow-2xl"
    >
      <span
        class="absolute left-0 h-full bg-zinc-500"
        :style="{
          width: `${(curr / max) * 100}%`,
        }"
      ></span>
    </div>
    <button
      v-if="curr < max"
      class="w-auto rounded-md border-2 border-black bg-slate-50 px-3 py-2 text-sm font-semibold hover:enabled:bg-slate-200 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-300"
      :disabled="isLoading"
      @click="$emit('more')"
    >
      {{ $t(text.btn) }}
    </button>
  </div>
</template>
