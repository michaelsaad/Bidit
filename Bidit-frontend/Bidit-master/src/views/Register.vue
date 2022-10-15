<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import { useStore } from '../store'
import BaseSelect from '../components/Base/BaseSelect.vue'
import { $t, useAxios, useMeta } from '../functions'
import BaseError from '../components/Base/BaseError.vue'
import BasePhone from '../components/Base/BasePhone.vue'
import { useCookies } from 'vue3-cookies'
const { $state: state } = $(useStore())
const { cookies } = useCookies()

useMeta({ title: 'Register', base: true })
let name = $ref('')
let email = $ref('')
let address = $ref('')
let password = $ref('')
let confirmPassword = $ref('')
let phone = $ref('')
let gender = $ref('male')
let error = $ref(null)

const registerUser = async () => {
  let body = {
    name,
    email,
    address,
    password,
    confirmPassword,
    phone: phone.replaceAll(' ', ''),
    gender,
  }

  let { response } = await useAxios('post', '/auth/register', body)

  if (response.data.ok) {
    let data = response.data.data
    state.user = data.user
    state.isLoggedIn = true
    cookies.set('authToken', data.token, '3d')
    cookies.set('isLoggedIn', true, '3d')
  } else {
    error = response.data.message
  }
}

const text = $ref({
  myAccount: {
    ar: 'حساب جديد',
    en: 'New Account',
  },
  success: {
    ar: 'تم التسجيل بنجاح',
    en: `You've successfully registered`,
  },
  nextStep: {
    ar: `قم بالذهاب الى البريد الالكتروني الخاص بك واضغط زر التأكيد`,
    en: `Headover to your email and click the verification link`,
  },
  namePlaceholder: {
    ar: 'الاسم كامل',
    en: 'Full Name',
  },
  emailPlaceholder: {
    ar: 'البريد الالكتروني',
    en: 'Email',
  },
  addressPlaceholder: {
    ar: 'العنوان',
    en: 'Address',
  },
  passwordPlaceholder: {
    ar: 'كلمه السر',
    en: 'Password',
  },
  confirmPasswordPlaceholder: {
    ar: 'تأكيد كلمه السر',
    en: 'Confirm Password',
  },
  birthdatePlaceholder: {
    ar: 'تاريخ الميلاد',
    en: 'Birthdate',
  },
  ccPlaceholder: {
    ar: 'كود البلد',
    en: 'Country Code',
  },
  phonePlaceholder: {
    ar: 'رقم التليفون',
    en: 'Phone Number',
  },
  genderPlaceholder: {
    ar: 'الجنس',
    en: 'Gender',
  },
  male: {
    ar: 'ذكر',
    en: 'Male',
  },
  female: {
    ar: 'أنثي',
    en: 'Female',
  },
  loginPlaceholder: {
    ar: 'انشاء حساب',
    en: 'Create Account',
  },
  account: {
    ar: 'لدي حساب؟',
    en: `Already Have an Account?`,
  },
})

useMeta({ title: $t(text.myAccount), base: true })
</script>

<template>
  <div
    class="max-w-[850px] rounded-md bg-white p-4 shadow-sm sm:mx-auto sm:w-full sm:p-6"
    v-if="!state.isLoggedIn"
  >
    <BaseTitle>{{ $t(text.myAccount) }}</BaseTitle>

    <form @submit.prevent="registerUser">
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
          :placeholder="$t(text.emailPlaceholder)"
          v-model="email"
          @updateInput="(val) => (email = val)"
          required
        />

        <BaseInput
          type="password"
          class="!w-full"
          :placeholder="$t(text.passwordPlaceholder)"
          v-model="password"
          @updateInput="(val) => (password = val)"
          required
        />
        <BaseInput
          type="password"
          class="!w-full"
          :placeholder="$t(text.confirmPasswordPlaceholder)"
          v-model="confirmPassword"
          @updateInput="(val) => (confirmPassword = val)"
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

        <BaseSelect
          v-model="gender"
          class="!w-full"
          @updateInput="(val) => (gender = val)"
          :placeholder="$t(text.genderPlaceholder)"
        >
          <option class="capitalize" value="male">{{ $t(text.male) }}</option>
          <option class="capitalize" value="female">
            {{ $t(text.female) }}
          </option>
        </BaseSelect>

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
        <BaseButton>{{ $t(text.loginPlaceholder) }}</BaseButton>
        <div class="flex flex-col">
          <RouterLink
            :to="`/${state.lang}/login`"
            class="text-bi-300 transition-colors hover:text-bi-400/50"
            >{{ $t(text.account) }}</RouterLink
          >
        </div>
      </div>
    </form>
  </div>
  <div
    class="max-w-[850px] rounded-md bg-white p-4 shadow-sm sm:mx-auto sm:w-full sm:p-6"
    v-else
  >
    <BaseTitle>{{ $t(text.success) }}</BaseTitle>
    <p class="mt-5">{{ $t(text.nextStep) }}</p>
    <router-link
      :to="`/${state.lang}/verify-email`"
      class="mt-2 block text-bi-300 transition-colors hover:text-bi-400/50"
      >Or get a new verification link</router-link
    >
  </div>
</template>
