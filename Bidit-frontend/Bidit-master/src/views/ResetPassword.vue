<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'
import BaseInput from '../components/Base/BaseInput.vue'
import BaseButton from '../components/Base/BaseButton.vue'
import BaseError from '../components/Base/BaseError.vue'
import { useStore } from '../store'
import { $t, useAxios, useMeta } from '../functions'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const { $state: state } = $(useStore())

const router = useRouter()
let email = $ref('')
let password = $ref('')
let confirmPassword = $ref('')
let token = $ref(router.currentRoute.value.params.token)
let isLoading = $ref(false)
let error = $ref('')

onMounted(async () => {
  let { response } = await useAxios(
    'get',
    `/auth/validate-password-token?token=${token}`,
  )

  if (!response.data.ok) {
    router.push(`/${state.lang}`)
  } else {
    email = response.data.data.email
  }
})

const resetPassword = async () => {
  isLoading = true
  let body = {
    email,
    password,
    confirmPassword,
  }

  let { response } = await useAxios('patch', '/auth/reset-password', body)

  if (!response.data.ok) {
    error = response.data.message
  } else {
    error = null
    router.push({
      name: 'login',
      params: { lang: state.lang },
      query: { ref: 'password_reset_success' },
    })
  }

  isLoading = false
}

const text = $ref({
  resetPassword: {
    ar: 'اعادة تعيين كلمة المرور',
    en: 'Reset Password',
  },
  passwordPlaceholder: {
    ar: 'كلمه السر',
    en: 'Password',
  },
  confirmPasswordPlaceholder: {
    ar: 'تأكيد كلمه السر',
    en: 'Confirm Password',
  },
  haveAccount: {
    ar: 'لدي حساب؟',
    en: `Already Have an Account?`,
  },
})

useMeta({ title: $t(text.resetPassword), base: true })
</script>

<template>
  <div
    class="max-w-[850px] rounded-md bg-white p-4 shadow-sm sm:mx-auto sm:w-full sm:p-6"
  >
    <BaseTitle>{{ $t(text.resetPassword) }}</BaseTitle>
    <form @submit.prevent="resetPassword">
      <div class="mt-6 mb-4 grid items-start gap-4 sm:grid-cols-2">
        <BaseInput
          type="password"
          class="!w-full"
          :placeholder="$t(text.passwordPlaceholder)"
          v-model="password"
          @updateInput="(val) => (password = val)"
          required
        /><BaseInput
          type="password"
          class="!w-full"
          :placeholder="$t(text.confirmPasswordPlaceholder)"
          v-model="confirmPassword"
          @updateInput="(val) => (confirmPassword = val)"
          required
        />
      </div>
      <transition name="fade">
        <BaseError class="mb-3" v-if="error">{{ error }}</BaseError>
      </transition>
      <div class="flex flex-col items-start gap-4">
        <BaseButton
          class="disabled:bg-blue-300"
          :disabled="isLoading && 'disabled'"
          >{{ $t(text.resetPassword) }}</BaseButton
        >
        <div class="flex flex-col">
          <RouterLink
            :to="`/${state.lang}/login`"
            class="text-bi-300 transition-colors hover:text-bi-400/50"
            >{{ $t(text.haveAccount) }}</RouterLink
          >
        </div>
      </div>
    </form>
  </div>
</template>
