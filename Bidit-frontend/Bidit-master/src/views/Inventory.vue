<script setup>
import { $t, useAxios, useMeta } from '../functions'
import { categories } from '../lang/categories.json'
import { onMounted } from 'vue'
import { useStore } from '../store'
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseDialog from '../components/Base/BaseDialog.vue'
import InventoryItem from '../components/InventoryItem.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseTextArea from '../components/Base/BaseTextArea.vue'
import NewBid from '../components/NewBid.vue'
import BaseError from '../components/Base/BaseError.vue'
import BaseType from '../components/Base/BaseType.vue'
import BaseSelect from '../components/Base/BaseSelect.vue'
import ImageViewer from '../components/ImageViewer.vue'
import BaseInfo from '../components/Base/BaseInfo.vue'
import BaseEmpty from '../components/Base/BaseEmpty.vue'
import BaseInputFile from '../components/Base/BaseInputFile.vue'
import Paginate from '../components/Paginate.vue'
import BaseLoader from '../components/Base/BaseLoader.vue'

const { $state: state } = $(useStore())
let itemsDialog = $ref(false),
  itemViewDialog = $ref(false),
  deleteDialog = $ref(false),
  bidDialog = $ref(false),
  isEditing = $ref(false),
  newImages = $ref(false),
  error = $ref(null),
  itemName = $ref(''),
  itemType = $ref(),
  itemDesc = $ref(''),
  itemImages = $ref([]),
  limit = $ref(8),
  curr = $ref(0),
  max = $ref(0)

let items = $ref([])
let isLoading = $ref(false)
let selectedItem = $ref(null)

const getAllItems = async (reset = false) => {
  isLoading = true

  if (reset) {
    items = []
    curr = 0
    max = 0
  }

  let { response } = await useAxios(
    'get',
    `/item/all?limit=${limit}&skip=${curr}`,
    null,
  )

  if (response.data.ok) {
    response.data.data.items.forEach((item) => {
      items.push(item)
    })
    max = response.data.data.count
    curr = items.length
  }
  isLoading = false
}

const getMore = async () => {
  isLoading = true

  let { response } = await useAxios(
    'get',
    `/item/all?limit=${limit}&skip=${curr}`,
    null,
  )

  if (response.data.ok) {
    response.data.data.items.forEach((item) => {
      items.push(item)
    })
    curr = items.length
  }
  isLoading = false
}

onMounted(async () => {
  itemType = categories.items[0].en

  getAllItems()
})

const resetDialog = () => {
  itemsDialog = false
  itemViewDialog = false
  isEditing = false
  deleteDialog = false
  bidDialog = false
  error = null
  selectedItem = null
  newImages = false
  itemName = ''
  itemType = categories.items[0].en
  itemDesc = ''
}

const addItem = async () => {
  isLoading = true

  let { response } = await useAxios('post', '/item/add', {
    name: itemName,
    type: itemType,
    description: itemDesc,
    images: itemImages,
  })

  if (!response.data.ok) error = response.data.message
  else {
    error = null
    getAllItems(true)

    resetDialog()
  }
}

const showEditItem = (item) => {
  itemsDialog = true
  isEditing = true
  itemName = item.name
  itemType = item.type
  itemDesc = item.description
  itemImages = item.images
  selectedItem = item
}

const editItem = async () => {
  isLoading = true

  let newItem = {
    name: itemName,
    type: itemType,
    description: itemDesc,
    images: itemImages,
    newImages,
  }

  let { response } = await useAxios(
    'patch',
    `/item/edit/${selectedItem._id}`,
    newItem,
  )

  if (!response.data.ok) error = response.data.message
  else {
    error = null
    getAllItems(true)

    resetDialog()
  }
}

const showDeleteDialog = async (item) => {
  deleteDialog = true
  selectedItem = item
}

const showItemViewDialog = async (item) => {
  itemViewDialog = true
  selectedItem = item
}

const showNewBidDialog = async (item) => {
  bidDialog = true
  selectedItem = item
}

const deleteItem = async () => {
  let { response } = await useAxios(
    'delete',
    `/item/delete/${selectedItem._id}`,
  )

  if (!response.data.ok) error = response.data.message
  else {
    error = null
    getAllItems(true)

    resetDialog()
  }
}

const text = $ref({
  title: {
    ar: 'المخزون',
    en: 'Inventory',
  },
  addItem: {
    ar: 'أضافه عنصر',
    en: 'Add item',
  },
  editItem: {
    ar: 'تعديل عنصر',
    en: 'Edit item',
  },
  newItem: {
    ar: 'عنصر جديد',
    en: 'New item',
  },
  namePlaceholder: {
    ar: 'الاسم',
    en: 'Name',
  },
  typePlaceholder: {
    ar: 'النوع',
    en: 'Type',
  },
  descriptionPlaceholder: {
    ar: 'الوصف',
    en: 'Description',
  },
  add: {
    ar: 'أًضافه',
    en: 'Add',
  },
  save: {
    ar: 'حفظ',
    en: 'Save',
  },
  deleteItem: {
    ar: 'حذف العنصر',
    en: 'Delete Item',
  },
  doneProcess: {
    ar: 'هذا العنصر سوف يتم حذفه فقط اذا كان المزاد المرتبط به لم يبدأ بعد. هل تريد الاستمرار؟',
    en: 'This item will only be deleted if bids linked to it have not started yet. Are you sure you want to proceed?',
  },
  yes: {
    ar: 'نعم',
    en: 'Yes',
  },
  no: {
    ar: 'لا',
    en: 'No',
  },
  info: {
    ar: 'العناصر الموجودة هنا يمكنك وحدك رؤيتها.',
    en: 'Only you can see the items here.',
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
      <BaseButton @click="itemsDialog = true">{{
        $t(text.addItem)
      }}</BaseButton>
    </div>
    <div v-if="!isLoading || items.length > 0">
      <BaseEmpty
        v-if="items.length === 0"
        :msg="{
          ar: 'لا يوجد لديك عناصر حتى الان!',
          en: `You Don't have any items yet!`,
        }"
      />
      <div
        v-else
        class="mt-6 grid items-start gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <InventoryItem
          v-for="(item, index) in items"
          :key="index"
          :item="item"
          @editItem="showEditItem"
          @newBid="showNewBidDialog(item)"
          @deleteItem="showDeleteDialog(item)"
          @showItemView="showItemViewDialog(item)"
        />
      </div>
    </div>

    <BaseLoader v-if="isLoading && items.length === 0" />

    <Paginate
      v-if="items.length != 0"
      :curr="curr"
      :max="max"
      :isLoading="isLoading"
      @more="getMore"
    />
  </div>

  <transition name="fade">
    <BaseDialog
      v-if="itemsDialog || bidDialog || deleteDialog || itemViewDialog"
      @click="resetDialog"
    >
    </BaseDialog>
  </transition>
  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="itemsDialog"
    >
      <BaseTitle>
        {{ isEditing ? $t(text.editItem) : $t(text.newItem) }}</BaseTitle
      >
      <form @submit.prevent="" class="mt-5 grid gap-5">
        <BaseInput
          type="text"
          class="!w-full"
          :placeholder="$t(text.namePlaceholder)"
          v-model="itemName"
          @updateInput="(val) => (itemName = val)"
        />
        <div class="relative">
          <BaseSelect
            v-model="itemType"
            class="!w-full capitalize"
            @updateInput="(val) => (itemType = val)"
            :placeholder="$t(text.typePlaceholder)"
          >
            <option
              v-for="(category, index) in categories.items"
              :key="index"
              :value="category.en"
              :selected="index === 0"
            >
              {{ $t(category) }}
            </option>
          </BaseSelect>
        </div>
        <BaseTextArea
          rows="8"
          type="text"
          class="col-span-2 !w-full"
          :placeholder="$t(text.descriptionPlaceholder)"
          v-model="itemDesc"
          @updateInput="(val) => (itemDesc = val)"
        />
        <div
          class="relative rounded-md border-2 border-dashed border-neutral-200 p-5 text-center"
          v-if="isEditing && !newImages"
        >
          <div :class="`flex flex-wrap items-start justify-around gap-3`">
            <div
              v-for="image in selectedItem?.images"
              :key="image"
              class="relative"
            >
              <img
                :src="`https://ik.imagekit.io/bidit/${image}?tr=w-128,h-128`"
                class="h-28 w-28 object-cover"
              />
            </div>
          </div>
          <button
            @click=";(newImages = true), (itemImages = [])"
            class="mt-2 inline-block rounded-md bg-red-200 px-2.5 py-1 font-medium hover:bg-red-300"
          >
            Upload New Images
          </button>
        </div>
        <BaseInputFile
          v-if="!isEditing || (isEditing && newImages)"
          placeholder="Click to Add Images MAX [5]"
          class="!w-full"
          @updateInput="(images) => (itemImages = images)"
        />
        <transition name="fade">
          <BaseError v-if="error">{{ error }}</BaseError>
        </transition>
        <BaseButton
          @click="editItem"
          class="disabled:bg-indigo-300"
          :disabled="isLoading"
          v-if="isEditing"
          >{{ $t(text.save) }}
        </BaseButton>
        <BaseButton
          @click="addItem"
          class="disabled:bg-indigo-300"
          :disabled="isLoading"
          v-else
          >{{ $t(text.newItem) }}
        </BaseButton>
      </form>
    </div>
  </transition>
  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="itemViewDialog"
    >
      <ImageViewer :imgs="selectedItem?.images" />
      <BaseType :to="`/${state.lang}/bids/${selectedItem.type}`">{{
        selectedItem.type
      }}</BaseType>
      <h2
        class="mb-2 overflow-hidden break-all text-lg font-semibold capitalize text-black"
      >
        {{ selectedItem.name }}
      </h2>
      <p class="my-1 overflow-hidden text-neutral-600">
        {{ selectedItem.description }}
      </p>
    </div>
  </transition>
  <transition name="zoom">
    <div
      class="border-bi-600 fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border bg-white p-5 font-medium text-black md:min-w-prose"
      v-if="deleteDialog"
    >
      <BaseTitle>{{ $t(text.deleteItem) }}</BaseTitle>
      <p class="my-3">{{ $t(text.doneProcess) }}</p>
      <BaseError v-if="error" class="mb-3">{{ error }}</BaseError>
      <div class="flex justify-end gap-2">
        <BaseButton class="!bg-red-600 hover:!bg-red-700" @click="deleteItem">{{
          $t(text.yes)
        }}</BaseButton>
        <BaseButton @click="resetDialog">{{ $t(text.no) }}</BaseButton>
      </div>
    </div>
  </transition>

  <transition name="zoom">
    <NewBid v-if="bidDialog" @resetDialog="resetDialog" :item="selectedItem" />
  </transition>
</template>
