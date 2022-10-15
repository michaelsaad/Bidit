<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  values: {
    type: Array,
    required: true,
  },
  layout: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  constraint: {
    type: String,
    required: true,
  },
  direction: {
    type: [String, Number],
    required: true,
  },
  actions: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits([
  'sortBy',
  'open',
  'edit',
  'remove',
  'ban',
  'cancel',
  'switch',
])
</script>

<template>
  <table class="w-full overflow-hidden rounded-md rounded-b-none bg-white">
    <tr class="bg-gray-300">
      <th
        v-for="(column, i) in columns"
        :key="column"
        class="p-3 text-left"
        :width="layout[i]"
      >
        <button
          @click="
            constraint === values[i] && direction === 'asc'
              ? emits('sortBy', values[i], 'desc')
              : emits('sortBy', values[i], 'asc')
          "
          class="flex items-center gap-0.5 font-semibold"
          :class="
            constraint === values[i] &&
            'font-bold text-indigo-500 hover:text-indigo-700'
          "
        >
          <span>{{ column }}</span>
          <svg
            v-if="constraint === values[i]"
            :class="direction === 'desc' && 'rotate-180'"
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 17l-4 4m0 0l-4-4m4 4V3"
            ></path>
          </svg>
        </button>
      </th>
      <th class="p-3 text-right">Actions</th>
    </tr>

    <tr
      v-for="item in data"
      :key="item"
      class="border-b last-of-type:border-b-0"
    >
      <td
        v-for="value in values"
        :key="value"
        class="clamp-2 px-3 py-2"
        :class="value === 'status' && 'capitalize'"
      >
        {{ item[value] || 'N/F' }}
      </td>
      <td class="flex items-center justify-end p-2">
        <button @click="emits('open', item)" v-if="actions.open">
          <svg
            class="h-6 w-6 rounded-md p-1 text-green-600 hover:bg-black/5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
        </button>
        <button @click="emits('edit', item)" v-if="actions.edit">
          <svg
            class="h-6 w-6 rounded-md p-1 text-gray-600 hover:bg-black/5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>
        </button>
        <button @click="emits('remove', item)" v-if="actions.remove">
          <svg
            class="h-6 w-6 rounded-md p-1 text-red-600 hover:bg-black/5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
        <button @click="emits('ban', item)" v-if="actions.ban">
          <svg
            class="h-6 w-6 rounded-md p-1 text-red-600 hover:bg-black/5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <button @click="emits('cancel', item)" v-if="actions.cancel">
          <svg
            class="h-6 w-6 rounded-md p-1 text-red-600 hover:bg-black/5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <button
          @click="emits('switch', item)"
          v-if="actions.switch && item.switch"
        >
          <svg
            class="h-6 w-6 rounded-md p-1 text-red-600 hover:bg-black/5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  </table>
</template>
