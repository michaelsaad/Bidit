<script>
import { onMounted } from 'vue'

export default {
  inheritAttrs: false,
}
</script>

<script setup>
let props = defineProps(['src'])

let err = $ref(false)

onMounted(() => {
  if (!props.src) err = true
})
</script>

<template>
  <img
    v-if="src"
    :src="src"
    :="$attrs"
    @load="chk"
    @error="err = true"
    :class="err && 'hidden'"
  />
  <div
    class="flex min-h-[160px] items-center justify-center bg-rose-900"
    v-if="err"
  >
    <span class="pointer-events-none select-none p-8 font-medium text-white"
      >Image Not Found.</span
    >
  </div>
</template>
