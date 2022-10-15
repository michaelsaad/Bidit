<script setup>
import BaseInfo from '../components/Base/BaseInfo.vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import { onMounted } from 'vue'
import {
  useAxios,
  getReportType,
  getReportStatus,
  useMeta,
  $t,
} from '../functions'
import BaseEmpty from '../components/Base/BaseEmpty.vue'
import BaseLoader from '../components/Base/BaseLoader.vue'
import Paginate from '../components/Paginate.vue'

let reports = $ref([])
let limit = $ref(8)
let curr = $ref(0)
let max = $ref(0)
let isLoading = $ref(false)

onMounted(async () => {
  getReports()
})

const getReports = async () => {
  isLoading = true
  let { response } = await useAxios(
    'get',
    `/report/user?limit=${limit}&skip=${curr}`,
  )

  if (response.data.ok) {
    response.data.data.reports.forEach((order) => {
      reports.push(order)
    })
    max = response.data.data.count
    curr = reports.length
  }
  isLoading = false
}

const text = $ref({
  title: {
    ar: 'البلاغات',
    en: 'Reports',
  },
  reportId: {
    ar: 'رقم الابلاغ',
    en: 'Report id',
  },
  type: {
    ar: 'النوع',
    en: 'Type',
  },
  description: {
    ar: 'الوصف',
    en: 'Description',
  },
  status: {
    ar: 'الحالة',
    en: 'Status',
  },
  info: {
    ar: 'هذة بلاغات انت قدمتها.',
    en: "These are reports that you've made.",
  },
})

useMeta({ title: $t(text.title), base: true })
</script>

<template>
  <div class="px-4">
    <div class="flex flex-wrap items-start justify-between gap-x-10 gap-y-3">
      <BaseTitle
        >{{ $t(text.title) }}
        <BaseInfo>{{ $t(text.info) }} </BaseInfo>
      </BaseTitle>
    </div>
  </div>

  <div v-if="!isLoading || reports.length > 0">
    <BaseEmpty
      v-if="reports.length === 0"
      :msg="{
        ar: 'لا يوجد لديك بلاغات الان!',
        en: 'No reports available now!',
      }"
    />
    <div class="mt-6 grid gap-3 px-5 md:grid-cols-2" v-else>
      <div
        v-for="report in reports"
        :key="report._id"
        class="relative grid gap-x-5 gap-y-0.5 overflow-hidden rounded-md bg-white p-3 capitalize shadow-md md:grid-cols-[auto,1fr]"
      >
        <div class="font-semibold">
          {{ $t(text.reportId) }}
        </div>
        <span>{{ report._id }}</span>
        <div class="font-semibold">
          {{ $t(text.type) }}
        </div>
        <span>{{ getReportType(report.type) }}</span>
        <div class="font-semibold">
          {{ $t(text.description) }}
        </div>
        <span>{{ report.description }}</span>
        <div class="font-semibold">
          {{ $t(text.status) }}
        </div>
        <span>{{ getReportStatus(report.status) }}</span>
      </div>
    </div>

    <Paginate
      v-if="reports.length != 0"
      :curr="curr"
      :max="max"
      :isLoading="isLoading"
      @more="getReports"
    />
  </div>

  <BaseLoader v-else />
</template>
