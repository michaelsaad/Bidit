import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      lang: null,
      user: null,
      isLoggedIn: false,
      BASE_URL: 'https://bidit-app.herokuapp.com',
      // BASE_URL: 'http://localhost:8080',
    }
  },
  getters: {
    isNTUnSeen: (state) => {
      if (!state.user || !state.isLoggedIn) {
        return null
      }

      let unSeen = false

      state?.user?.notifications?.forEach((nt) => {
        if (nt.seen === false) {
          unSeen = true
        }
      })

      return unSeen
    },
  },
})
