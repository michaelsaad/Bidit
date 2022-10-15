<script setup>
import BaseTitle from '../../components/Base/BaseTitle.vue'
import { $t, useMeta } from '../../functions'

useMeta({
  title: $t({ ar: 'دفعة غير ناجحة', en: 'Successful Failed' }),
  base: true,
})
</script>

<template>
  <div class="px-5">
    <BaseTitle>Payment Failed</BaseTitle>
  </div>
</template>
