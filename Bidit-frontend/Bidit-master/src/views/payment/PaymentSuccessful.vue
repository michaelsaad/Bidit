<script setup>
import BaseTitle from '../../components/Base/BaseTitle.vue'
import { $t, useMeta } from '../../functions'

useMeta({
  title: $t({ ar: 'دفعة ناجحة', en: 'Successful Payment' }),
  base: true,
})
</script>

<template>
  <div class="px-5">
    <BaseTitle>Payment Successful</BaseTitle>
  </div>
</template>
