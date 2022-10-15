<script setup>
import BaseTable from '../../components/Base/BaseTable.vue'
import { onMounted } from 'vue'
import { useAxios, useMeta } from '../../functions'
import { reportStatuses } from '../../lang/reportstatus.json'
import BaseDialog from '../../components/Base/BaseDialog.vue'
import BaseTitle from '../../components/Base/BaseTitle.vue'
import BaseSelect from '../../components/Base/BaseSelect.vue'
import BaseError from '../../components/Base/BaseError.vue'
import BaseButton from '../../components/Base/BaseButton.vue'
import { computed } from '@vue/reactivity'
import { useStore } from '../../store'
import Paginate from '../../components/Paginate.vue'
import BaseSearchBox from '../../components/Base/BaseSearchBox.vue'

let { $state: state } = useStore()
let data = $ref([])
let limit = $ref(10)
let curr = $ref(0)
let max = $ref(0)
let isLoading = $ref(false)
let reportDialog = $ref(false)
let editDialog = $ref(false)
let selectedReport = $ref(null)
let reportAction = $ref('')
let error = $ref(null)
let constraint = $ref('createdAt')
let direction = $ref('desc')
let searchValue = $ref('')

const getReports = async (reset = false) => {
  if (reset) {
    data = []
    curr = 0
    max = 0
  }

  let url = `/admin/reports?sortBy=${constraint}&dir=${direction}&limit=${limit}&skip=${curr}&s=${searchValue}`
  isLoading = true

  let { response } = await useAxios('get', url)

  if (response.data.ok) {
    response.data.data.reports.forEach((report) => {
      data.push(report)
    })
    max = response.data.data.count
    curr = data.length
  }

  isLoading = false
}

onMounted(async () => getReports())

let formatedData = computed(() => {
  return data.map((x) => {
    return {
      ...x,
      reporter: x?.reporter?.email || x?.recipient,
      recipient: x?.recipient?.email || x?.recipient,
    }
  })
})

const sortBy = (value, dir) => {
  constraint = value
  direction = dir

  getReports(true)
}
const open = (val) => {
  reportDialog = true
  selectedReport = val
}

const edit = (val) => {
  editDialog = true
  selectedReport = val
}

const saveEdit = async () => {
  let { response } = await useAxios(
    'patch',
    `/admin/report/feedback/${selectedReport._id}`,
    {
      status: selectedReport.status,
      action: reportAction,
      recipient: selectedReport.recipient,
      message: selectedReport.type,
      bidID: selectedReport.for,
    },
  )
  if (!response.data.ok) error = response.data.message
  else {
    resetDialog()
    getReports(true)
  }
}

const resetDialog = () => {
  reportDialog = false
  editDialog = false
  selectedReport = null
}

const search = async (val) => {
  searchValue = val

  getReports(true)
}

let reportActions = $ref([
  {
    en: 'ban user for a week and remove bid',
  },
  {
    en: 'ban user forever and remove bid',
  },
])

useMeta({ title: 'Reports', base: true })
</script>

<template>
  <div
    class="mb-5 flex w-full flex-col items-start justify-between gap-3 sm:flex-row"
  >
    <h1 class="font-merriweather text-3xl font-extrabold">Reports</h1>

    <BaseSearchBox
      @search="(val) => search(val)"
      @clear="
        () => {
          searchValue = ''
          getReports(true)
        }
      "
    />
  </div>

  <div class="overflow-x-auto">
    <BaseTable
      :columns="['Report', 'Type', 'Status']"
      :values="['_id', 'type', 'status']"
      :layout="['auto', 'auto', 'auto']"
      :data="formatedData"
      :constraint="constraint"
      :direction="direction"
      :actions="{ open: true, edit: true }"
      @sortBy="sortBy"
      @open="open"
      @edit="edit"
    />
  </div>

  <Paginate
    v-if="data.length != 0"
    :curr="curr"
    :max="max"
    :isLoading="isLoading"
    @more="getReports"
  />

  <transition name="fade">
    <BaseDialog v-if="reportDialog || editDialog" @click="resetDialog()">
    </BaseDialog>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-3 font-medium text-black md:min-w-prose"
      v-if="reportDialog"
    >
      <div class="relative grid gap-x-5 gap-y-0.5 p-3 md:grid-cols-[auto,1fr]">
        <div class="font-semibold">Report Id</div>
        <span>{{ selectedReport._id }}</span>
        <div class="font-semibold">Reporter</div>
        <span>{{ selectedReport.reporter }}</span>
        <div class="font-semibold">Recipient</div>
        <span>{{ selectedReport.recipient }}</span>
        <div class="font-semibold">Type</div>
        <span>{{ selectedReport.type }}</span>
        <div class="font-semibold">Description</div>
        <span>{{ selectedReport.description }}</span>
        <div class="font-semibold">Status</div>
        <span>{{ selectedReport.status }}</span>
      </div>
      <div class="flex justify-end px-3">
        <router-link
          class="flex items-center gap-2 text-indigo-700 hover:text-indigo-400"
          :to="`/${state.lang}/bid/${selectedReport.for}`"
          target="_blank"
        >
          <span>View Reported Bid</span>

          <svg
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
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
        </router-link>
      </div>
    </div>
  </transition>

  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="editDialog"
    >
      <BaseTitle> Edit Report </BaseTitle>
      <form @submit.prevent="saveEdit" class="mt-5 grid gap-5">
        <BaseSelect
          v-model="selectedReport.status"
          class="!w-full capitalize"
          @updateInput="(val) => (selectedReport.status = val)"
          placeholder="Status"
        >
          <option
            v-for="status in reportStatuses"
            :key="status.en"
            :value="status.en"
          >
            {{ status.en }}
          </option>
        </BaseSelect>
        <BaseSelect
          v-if="selectedReport.status === 'took the appropriate action'"
          v-model="reportAction"
          class="!w-full capitalize"
          @updateInput="(val) => (reportAction = val)"
          placeholder="Action"
        >
          <option
            v-for="action in reportActions"
            :key="action.en"
            :value="action.en"
          >
            {{ action.en }}
          </option>
        </BaseSelect>
        <BaseError v-if="error">{{ error }}</BaseError>
        <BaseButton>Save</BaseButton>
      </form>
    </div>
  </transition>
</template>
