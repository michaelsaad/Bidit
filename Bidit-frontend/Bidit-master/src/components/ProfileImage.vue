<script setup>
import BaseTitle from './Base/BaseTitle.vue'
import BaseButton from './Base/BaseButton.vue'
import { useAxios } from '../functions'
import BaseError from './Base/BaseError.vue'
import { useStore } from '../store'

const props = defineProps(['image'])
const emits = defineEmits(['done'])
const { $state: state } = useStore()
let inputFile = $ref()
let newImage = $ref('')
let isLoading = $ref(false)
let error = $ref(false)

const fileChanged = async () => {
  if (inputFile.files[0] && !props.image) {
    newImage = await toBase64(inputFile.files[0])
  }
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const changeProfileImage = async () => {
  isLoading = true
  let { response } = await useAxios('post', '/auth/add-profile', {
    image: newImage,
  })

  if (!response.data.ok) error = response.data.message

  isLoading = false

  let { response: user } = await useAxios('get', '/auth/user')

  if (user.data.ok) {
    state.user = user.data.data
  }
  emits('done')
}

const deleteProfileImage = async () => {
  isLoading = true
  let { response } = await useAxios('delete', '/auth/delete-profile', {
    image: props.image,
  })

  if (response.data.ok) {
    isLoading = false
    let { response: user } = await useAxios('get', '/auth/user')

    if (user.data.ok) {
      state.user = user.data.data
    }
    emits('done')
  }
}

let text = $ref({
  title: {
    ar: 'الصورة الشخصية',
    en: 'Profile Picture',
  },
  placeholder: {
    ar: 'اختر الصورة',
    en: 'Select Image',
  },
})
</script>

<template>
  <div
    class="fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border border-neutral-200 bg-white p-5 md:min-w-prose"
  >
    <BaseTitle>{{ $t(text.title) }}</BaseTitle>
    <div
      class="relative mt-6 rounded-md border-2 border-dashed border-neutral-200 p-5 text-center"
      :class="image ? '' : 'cursor-pointer'"
      @click="!image && inputFile.click()"
    >
      <img
        v-if="image"
        :src="`https://ik.imagekit.io/bidit/${image.name}?tr=w-380,h-380`"
        alt="Profile Picture"
        class="mx-auto w-[380px] object-cover"
      />
      <img
        v-if="newImage"
        :src="newImage"
        alt="Profile Picture"
        class="mx-auto w-[380px] object-cover"
      />
      <input
        type="file"
        ref="inputFile"
        class="hidden"
        @change="fileChanged"
        accept="image/*"
      />
      <div v-if="!image && !newImage" class="py-5 font-semibold">
        {{ $t(text.placeholder) }}
      </div>
      <button
        v-if="newImage"
        class="mt-2 inline-block rounded-md bg-red-200 px-2.5 py-1 font-medium hover:bg-red-300"
        @click="newImage = null"
      >
        Clear
      </button>
    </div>
    <BaseError v-if="error">{{ error }}</BaseError>
    <BaseButton
      v-if="newImage"
      @click="changeProfileImage"
      class="mt-3 !w-full disabled:bg-indigo-300"
      :disabled="isLoading && 'disabled'"
      >Upload</BaseButton
    >
    <BaseButton
      v-if="image"
      @click="deleteProfileImage"
      class="mt-3 !w-full !bg-red-700 p-2 hover:!bg-red-600 disabled:bg-red-300"
      :disabled="isLoading && 'disabled'"
      >Delete</BaseButton
    >
  </div>
</template>
