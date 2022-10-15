<script setup>
import BaseButton from '../components/Base/BaseButton.vue'
import { $t, useMeta } from '../functions'
import { useStore } from '../store'

const { $state: state } = useStore()
const text = $ref({
  title: {
    ar: '٤٠٤',
    en: '404',
  },
  NF: {
    ar: 'عذرا, لم نتمكن من ايجاد الصفحة التي طلبتها.',
    en: "Oops, We couldn't find The page you requested.",
  },
  cta: {
    ar: 'انتقل الي الصفحة الرئيسية',
    en: 'To Homepage',
  },
})

useMeta({ title: $t(text.title), base: true })
</script>

<template>
  <div class="mt-28 flex flex-col items-center gap-5 text-black">
    <h1 class="text-8xl font-extrabold">{{ $t(text.title) }}</h1>
    <p class="font-medium">{{ $t(text.NF) }}</p>
    <RouterLink :to="`/${state.lang}`">
      <BaseButton>{{ $t(text.cta) }}</BaseButton>
    </RouterLink>
  </div>
</template>
