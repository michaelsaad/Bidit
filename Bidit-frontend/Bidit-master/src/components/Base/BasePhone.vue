<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import { useStore } from '../../store'
defineProps(['placeholder', 'modelValue'])
const emits = defineEmits(['updateInput'])
const { $state: state } = $(useStore())
</script>

<template>
  <div class="relative w-full">
    <input
      :="$attrs"
      class="peer !w-full rounded-md border-2 border-neutral-200 bg-transparent px-3 pb-2 pt-3.5 font-medium text-black placeholder:text-transparent focus:outline-none"
      :id="placeholder"
      :placeholder="placeholder"
      :value="modelValue"
      @change="(e) => emits('updateInput', e.target.value)"
      @keyup="(e) => emits('updateInput', e.target.value)"
    />
    <label
      class="pointer-events-none absolute top-0.5 -translate-y-1/2 bg-white px-1.5 text-xs font-semibold text-black transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-gray-400 peer-focus:top-0.5 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-black"
      :class="state.lang === 'ar' ? 'right-1.5' : 'left-1.5'"
      :for="placeholder"
      >{{ placeholder }}</label
    >
  </div>
</template>
