<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/ar'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useStore } from '../store'
import { computed } from '@vue/reactivity'

dayjs.extend(localizedFormat)
let { $state: state } = useStore()
let props = defineProps(['notification'])

const localDate = computed(() => {
  return dayjs(props.notification.createdAt)
    .locale(state.lang)
    .format('ddd, D MMMM, YYYY | h:mm A')
})
</script>

<template>
  <div ref="ntBody" class="rounded-md bg-white p-4 text-black shadow-sm">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-2xl font-bold capitalize">
        {{ notification.title[state.lang] }}
      </h2>
    </div>
    <span class="font-medium text-neutral-500">
      {{ localDate }}
    </span>
    <p class="mt-2 overflow-hidden">
      {{ notification.message[state.lang] }}
    </p>
    <RouterLink
      :to="`/${state.lang}${notification.redirect}`"
      v-if="notification.redirect"
      class="text-bi-300 transition-colors hover:text-bi-400/50"
      >{{ state.lang === 'ar' ? 'اضغط هنا' : 'Click Here' }}</RouterLink
    >
  </div>
</template>
