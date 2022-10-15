<script setup>
import { useStore } from '../store'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseDialog from '../components/Base/BaseDialog.vue'
import ProfileImage from '../components/ProfileImage.vue'
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseError from '../components/Base/BaseError.vue'
import BasePhone from '../components/Base/BasePhone.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import { onMounted } from 'vue'
import { $t, useAxios, useMeta } from '../functions'
const { $state: state } = $(useStore())

let isLoading = $ref(false)
let name = $ref('')
let address = $ref('')
let phone = $ref('')
let error = $ref(null)

onMounted(() => {
  name = state.user.name
  address = state.user.address
  phone = state.user.phone
})

let editDialog = $ref(false)
let imageDialog = $ref(false)

const resetDialog = () => {
  editDialog = false
  imageDialog = false
}

const updateProfile = async () => {
  isLoading = true

  let { response } = await useAxios('patch', '/auth/edit-account', {
    name,
    address,
    phone,
  })

  if (!response.data.ok) error = response.data.message
  else {
    error = null

    state.user = response.data.data
    resetDialog()
  }
  isLoading = false
}

const text = $ref({
  title: {
    ar: 'الحساب',
    en: 'Account',
  },
  namePlaceholder: {
    ar: 'الاسم كامل',
    en: 'Full Name',
  },
  addressPlaceholder: {
    ar: 'العنوان',
    en: 'Address',
  },
  phonePlaceholder: {
    ar: 'رقم التليفون',
    en: 'Phone Number',
  },
  save: {
    ar: 'حفط',
    en: 'Save',
  },
  male: {
    ar: 'ذكر',
    en: 'Male',
  },
  female: {
    ar: 'انثى',
    en: 'Female',
  },
  editAccount: {
    ar: 'تعديل الحساب',
    en: 'Edit Account',
  },
  toAdmin: {
    ar: 'الى منصة الادمن',
    en: 'To Admin Dashboard',
  },
})

useMeta({ title: $t(text.title), base: true })
</script>

<template>
  <div class="relative mt-20 rounded-md bg-white px-4 pt-20 shadow-sm">
    <div
      class="absolute -top-20 left-4 cursor-pointer overflow-hidden rounded-full border-8 border-bi-100 transition-opacity hover:opacity-75"
      :class="state.lang === 'ar' ? 'right-4 left-auto' : 'left-4 right-auto'"
      @click="imageDialog = true"
    >
      <img
        v-if="state?.user?.profilePicture"
        :src="`https://ik.imagekit.io/bidit/${state?.user?.profilePicture?.name}?tr=w-128,h-128,`"
        class="w-32"
        alt="avatar"
      />
      <img v-else src="/images/avatar.png" class="w-32" alt="avatar" />
    </div>
    <div class="flex justify-between p-5 pt-0">
      <div>
        <h1 class="text-3xl font-semibold text-black">
          {{ state.user?.name }}
        </h1>
        <div class="mt-3 grid grid-cols-[20px,1fr] gap-x-2 gap-y-1">
          <svg
            class="h-5 w-5 text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          <h2 class="font-medium text-neutral-600">
            {{ state.user?.email }}
          </h2>
          <svg
            class="h-5 w-5 text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            ></path>
          </svg>
          <span class="font-medium text-neutral-600">{{
            state.user?.phone
          }}</span>
          <svg
            class="h-5 w-5 text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span class="font-medium text-neutral-600">{{
            state.user?.address
          }}</span>
          <svg
            class="h-5 w-5 text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span class="font-medium capitalize text-neutral-600">
            {{
              state.user?.gender === 'male' ? $t(text.male) : $t(text.female)
            }}</span
          >
        </div>
        <BaseButton class="mt-3" @click="editDialog = true">
          {{ $t(text.editAccount) }}
        </BaseButton>
        <div v-if="state.user?.isAdmin">
          <BaseButton class="mt-2 bg-teal-700 hover:bg-teal-500">
            <RouterLink :to="`/${state.lang}/admin`">
              {{ $t(text.toAdmin) }}
            </RouterLink>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>

  <transition name="fade">
    <BaseDialog v-if="imageDialog || editDialog" @click="resetDialog()">
    </BaseDialog>
  </transition>

  <transition name="zoom">
    <ProfileImage
      v-if="imageDialog"
      :image="state?.user?.profilePicture"
      @done="imageDialog = false"
    />
  </transition>

  <transition name="zoom">
    <div
      v-if="editDialog"
      class="fixed top-1/2 left-1/2 z-30 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto rounded-md border border-neutral-200 bg-white p-5 md:min-w-prose"
    >
      <BaseTitle>Edit Profile</BaseTitle>
      <form @submit.prevent="updateProfile">
        <div class="mt-6 mb-4 grid items-start gap-4 sm:grid-cols-2">
          <BaseInput
            type="text"
            class="!w-full"
            :placeholder="$t(text.namePlaceholder)"
            v-model="name"
            @updateInput="(val) => (name = val)"
            required
          />
          <BaseInput
            type="text"
            class="!w-full"
            :placeholder="$t(text.addressPlaceholder)"
            v-model="address"
            @updateInput="(val) => (address = val)"
            required
          />
          <div class="flex items-center gap-3 sm:col-span-2">
            <BasePhone
              type="tel"
              class="!w-full"
              :placeholder="$t(text.phonePlaceholder)"
              v-model="phone"
              pattern="^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$"
              @updateInput="(val) => (phone = val)"
              required
            />
          </div>
          <span>Format: 01xx xxx xxxx</span>
        </div>
        <transition name="fade">
          <BaseError class="mb-3" v-if="error">{{ error }}</BaseError>
        </transition>
        <div class="flex flex-col items-start gap-4">
          <BaseButton class="!w-full" :disabled="isLoading && 'disabled'">{{
            $t(text.save)
          }}</BaseButton>
        </div>
      </form>
    </div>
  </transition>
</template>
