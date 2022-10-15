<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '../store'
import { categories } from '../lang/categories.json'
import BaseDDL from './Base/BaseDDL.vue'
import BaseDialog from './Base/BaseDialog.vue'
import SearchBar from './SearchBar.vue'
import DropDownNav from './DropDownNav.vue'
import { watch } from 'vue'
import { useCookies } from 'vue3-cookies'

const { $state: state } = useStore()
const store = useStore()
const router = useRouter()
let activeMenu = $ref(null)
let searchDialog = $ref(false)
let hamburgerMenu = $ref(false)

watch($$(searchDialog), () => {
  if (searchDialog.value === true)
    document.documentElement.style.overflow = 'hidden'
  else document.documentElement.style.overflow = 'auto'
})

const text = $ref({
  navDDLButton: {
    ar: 'الاقسام',
    en: 'Categories',
  },
  userItems: [
    {
      ar: 'الحساب',
      en: 'Account',
      to: 'account',
    },
    {
      ar: 'المخزون',
      en: 'Inventory',
      to: 'account/inventory',
    },
    {
      ar: 'المشتريات',
      en: 'Purchases',
      to: 'account/purchases',
    },
    {
      ar: 'المبيعات',
      en: 'Sales',
      to: 'account/sales',
    },

    {
      ar: 'الطلبات',
      en: 'Orders',
      to: 'account/orders',
    },
    {
      ar: 'البلاغات',
      en: 'Reports',
      to: 'account/reports',
    },
    {
      ar: 'تسجيل الخروج',
      en: 'Logout',
      to: 'logout',
    },
  ],
  langDDLItems: [
    {
      lang: 'ع',
      flag: '/images/flags/eg.svg',
    },
    {
      lang: 'en',
      flag: '/images/flags/us.svg',
    },
  ],
  account: {
    ar: 'حسابي',
    en: 'My Account',
    to: 'account',
    requiresUNAuth: true,
  },
  login: {
    ar: 'تسجيل الدخول',
    en: 'Login',
    to: 'login',
    requiresAuth: true,
  },
})

const toggleDDL = (ddl = null) => {
  if (activeMenu !== ddl) {
    activeMenu = ddl

    addEventListener(
      'mouseup',
      (e) => {
        if (!e.target?.dataset[ddl]) {
          activeMenu = null
        }
      },
      {
        once: true,
        passive: true,
      },
    )
  } else {
    activeMenu = null
  }
}

const changeLang = (lang) => {
  let newLang = lang === 'ع' ? 'ar' : 'en'

  newLang === 'ar' ? (document.body.dir = 'rtl') : (document.body.dir = 'ltr')

  localStorage.setItem('lang', newLang)
  state.lang = newLang
  router.replace({ params: { lang: newLang } })
}

const toggleDDM = () => {
  if (!hamburgerMenu) {
    hamburgerMenu = true
    document.body.style.overflow = 'hidden'
  } else {
    hamburgerMenu = false
    document.body.style.overflow = 'auto'
  }
}

const logout = () => {
  let { cookies } = useCookies()

  cookies.remove('authToken')
  cookies.remove('isLoggedIn')
  state.isLoggedIn = false
  state.user = null
  router.go()
}
</script>

<template>
  <nav
    :="$attrs"
    class="fixed z-20 max-h-screen w-full bg-white shadow-sm backdrop-blur-sm sm:px-2 md:px-8"
    dir="ltr"
  >
    <div
      class="mx-auto flex h-16 max-w-atreus items-stretch justify-between gap-5"
    >
      <div class="flex items-center gap-2">
        <button
          class="flex h-full cursor-pointer items-center justify-center px-3 font-semibold text-black transition-colors hover:bg-bi-200 md:hidden"
          @click="toggleDDM()"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-v-d2eb525e=""
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.8"
              d="M4 8h16M4 16h16"
              data-v-d2eb525e=""
            ></path>
          </svg>
        </button>
        <RouterLink
          :to="`/${state.lang}`"
          class="font-merriweather text-3xl font-extrabold text-black"
          >BID!T</RouterLink
        >
      </div>
      <ul class="flex h-full items-center font-semibold text-black">
        <li class="relative h-full">
          <button
            class="flex h-full cursor-pointer items-center justify-center px-3 font-semibold transition-colors hover:bg-bi-200"
            @click="searchDialog = true"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </li>
        <li class="relative h-full" v-if="state.isLoggedIn && state.user">
          <RouterLink
            :to="`/${state.lang}/account/notification`"
            class="relative flex h-full cursor-pointer items-center justify-center px-3 font-semibold transition-colors hover:bg-bi-200"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
            <span
              class="h-2 w-2 rounded-full bg-red-700 p-0.5 text-xs text-white"
              v-if="store.isNTUnSeen"
            ></span>
          </RouterLink>
        </li>
        <li class="relative hidden h-full md:block">
          <button
            class="py-auto block h-full cursor-pointer px-3 font-semibold transition-colors hover:bg-bi-200"
            :data-cat="true"
            @click="toggleDDL('cat')"
          >
            {{ $t(text.navDDLButton) }}
            <span class="pointer-events-none ml-1">&darr;</span>
          </button>
          <transition name="curtain">
            <BaseDDL
              class="absolute right-0"
              v-if="activeMenu === 'cat'"
              dir="auto"
            >
              <li
                class="border-b capitalize last-of-type:border-none hover:bg-bi-200"
              >
                <RouterLink
                  class="flex w-full px-3 py-2 transition-colors hover:bg-bi-200"
                  :to="`/${state.lang}/bids`"
                >
                  {{ $t({ ar: 'الكل', en: 'all' }) }}
                </RouterLink>
              </li>
              <li
                v-for="(item, index) in categories.items"
                :key="index"
                class="border-b capitalize last-of-type:border-none hover:bg-bi-200"
              >
                <RouterLink
                  class="flex w-full px-3 py-2 transition-colors hover:bg-bi-200"
                  :to="`/${state.lang}/bids/${item.to}`"
                >
                  {{ $t(item) }}
                </RouterLink>
              </li>
            </BaseDDL>
          </transition>
        </li>
        <li class="relative hidden h-full md:block">
          <button
            class="block h-full cursor-pointer px-3 font-semibold transition-colors hover:bg-bi-200"
            :data-lang="true"
            @click="toggleDDL('lang')"
          >
            <div class="pointer-events-none flex items-center">
              <img
                class="mr-2 w-6"
                :src="
                  state.lang === 'ar'
                    ? `/images/flags/eg.svg`
                    : `/images/flags/us.svg`
                "
                :alt="state.lang"
              />
              <span
                class="uppercase"
                :class="{ '-mt-1': state.lang === 'ar' }"
                >{{ state.lang === 'ar' ? 'ع' : 'en' }}</span
              >
              <span class="ml-1">&darr;</span>
            </div>
          </button>
          <transition name="curtain">
            <BaseDDL class="absolute !w-full" v-if="activeMenu === 'lang'">
              <li
                v-for="(item, index) in text.langDDLItems"
                :key="index"
                class="border-b last-of-type:border-none hover:bg-bi-200"
              >
                <button
                  class="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-bi-200"
                  @click="changeLang(item.lang)"
                >
                  <img
                    :src="item.flag"
                    :alt="item.lang"
                    class="pointer-events-none w-6"
                  />
                  <span
                    class="font-semibold uppercase"
                    :class="{ '-mt-2': item.lang === 'ar' }"
                  >
                    {{ item.lang }}</span
                  >
                </button>
              </li>
            </BaseDDL>
          </transition>
        </li>
        <li class="relative block h-full" v-if="state.isLoggedIn">
          <button
            class="block h-full cursor-pointer px-3 font-semibold transition-colors hover:bg-bi-200"
            :data-user="true"
            @click="toggleDDL('user')"
          >
            <img
              v-if="state?.user?.profilePicture"
              :src="`https://ik.imagekit.io/bidit/${state?.user?.profilePicture?.name}?tr=w-40,h-40,`"
              class="pointer-events-none w-10 rounded-full"
              alt="avatar"
            />
            <img
              v-else
              src="/images/avatar.png"
              class="pointer-events-none w-10 rounded-full"
              alt="avatar"
            />
          </button>
          <transition name="curtain">
            <BaseDDL class="absolute right-0" v-if="activeMenu === 'user'">
              <li
                v-for="(item, index) in text.userItems"
                :key="index"
                class="border-b last-of-type:border-none hover:bg-bi-200"
                dir="auto"
              >
                <button
                  v-if="item.to === 'logout'"
                  class="flex w-full items-center gap-2 px-3 py-2 text-left font-semibold transition-colors hover:bg-bi-200"
                  @mousedown="logout()"
                >
                  {{ $t(item) }}
                </button>
                <RouterLink
                  v-else
                  :to="`/${state.lang}/${item.to}`"
                  class="flex w-full items-center justify-between gap-2 px-3 py-2 text-left font-semibold transition-colors hover:bg-bi-200"
                >
                  {{ $t(item) }}
                </RouterLink>
              </li>
            </BaseDDL>
          </transition>
        </li>
        <li
          class="relative h-full"
          v-if="text.account.requiresUNAuth && !state.isLoggedIn"
        >
          <RouterLink
            class="flex h-full cursor-pointer items-center justify-center bg-bi-300 px-3 font-semibold text-white transition-colors hover:bg-bi-400"
            :to="`/${state.lang}/${text.login.to}`"
          >
            {{ $t(text.login) }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>

  <transition :name="state.lang === 'ar' ? 'slideRight' : 'slideLeft'">
    <DropDownNav v-if="hamburgerMenu" @hideNav="hamburgerMenu = false" />
  </transition>

  <transition name="fade">
    <BaseDialog v-if="searchDialog" @click="searchDialog = false" />
  </transition>
  <transition name="zoomSearch">
    <SearchBar v-if="searchDialog" @exitSearch="searchDialog = false" />
  </transition>
</template>

<style scoped>
.zoomSearch-enter-active,
.zoomSearch-leave-active {
  transition: transform 0.3s ease-in-out;
}

.zoomSearch-enter-from,
.zoomSearch-leave-to {
  transform: scale(0) translateX(-50%);
}

.zoomSearch-enter-to,
.zoomSearch-leave-from {
  transform: scale(1) translateX(-50%);
}
</style>
