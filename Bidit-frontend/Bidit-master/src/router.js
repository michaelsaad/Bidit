import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { getPreferedLanguage, routerLang, useAxios } from './functions'
import { useStore } from './store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect: () => {
        let lang = localStorage.getItem('lang')

        if (lang) {
          return lang
        } else {
          return getPreferedLanguage()
        }
      },
    },
    {
      path: '/:lang',
      component: () => import('./views/NothingButARouterView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('./views/Home.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('./views/About.vue'),
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('./views/Contact.vue'),
        },
        {
          path: 'bid/:bidID',
          name: 'bidview',
          component: () => import('./views/BidView.vue'),
        },
        {
          path: 'bids',
          name: 'bids',
          component: () => import('./views/AllBids.vue'),
        },
        {
          path: 'bids/categories',
          name: 'allCategories',
          component: () => import('./views/AllCategories.vue'),
        },
        {
          path: 'bids/:cat',
          name: 'bids categories',
          component: () => import('./views/BidsCategories.vue'),
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('./views/Account.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/inventory',
          name: 'accountInventory',
          component: () => import('./views/Inventory.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/notification',
          name: 'userNotification',
          component: () => import('./views/Notifications.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/purchases',
          name: 'accountPurchases',
          component: () => import('./views/Purchases.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/sales',
          name: 'accountSales',
          component: () => import('./views/Sales.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/orders',
          name: 'accountOrders',
          component: () => import('./views/Orders.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/order/:id',
          name: 'order',
          component: () => import('./views/Order.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'account/reports',
          name: 'account/reports',
          component: () => import('./views/Reports.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('./views/Login.vue'),
          meta: {
            requiresUnAuth: true,
          },
        },
        {
          path: 'forgot-password',
          name: 'forgotPassword',
          component: () => import('./views/ForgotPassword.vue'),
          meta: {
            requiresUnAuth: true,
          },
        },
        {
          path: 'reset-password/:token',
          name: 'resetPassword',
          component: () => import('./views/ResetPassword.vue'),
          meta: {
            requiresUnAuth: true,
          },
        },
        {
          path: 'verify-email',
          name: 'verifyEmail',
          component: () => import('./views/VerifyEmail.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'verify-email/:token',
          name: 'verifyEmailWToken',
          component: () => import('./views/VerifyEmail.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('./views/Register.vue'),
          meta: {
            requiresUnAuth: true,
          },
        },
        {
          path: 'payment-successful',
          name: 'paymentSuccessful',
          component: () => import('./views/payment/PaymentSuccessful.vue'),
        },
        {
          path: 'payment-failed',
          name: 'paymentFailed',
          component: () => import('./views/payment/PaymentFailed.vue'),
        },
        {
          path: 'admin',
          name: 'admin',
          component: () => import('./views/Admin/Admin.vue'),
          meta: {
            requiresAdmin: true,
          },
        },
        {
          path: 'admin/users',
          name: 'usersAdmin',
          component: () => import('./views/Admin/Users.vue'),
          meta: {
            requiresAdmin: true,
          },
        },
        {
          path: 'admin/bannedusers',
          name: 'bannedUserAdmin',
          component: () => import('./views/Admin/BannedUsers.vue'),
          meta: {
            requiresAdmin: true,
          },
        },
        {
          path: 'admin/bids',
          name: 'bidsAdmin',
          component: () => import('./views/Admin/Bids.vue'),
          meta: {
            requiresAdmin: true,
          },
        },
        {
          path: 'admin/orders',
          name: 'ordersAdmin',
          component: () => import('./views/Admin/Orders.vue'),
          meta: {
            requiresAdmin: true,
          },
        },
        {
          path: 'admin/notifications',
          name: 'notificationsAdmin',
          component: () => import('./views/Admin/Notifications.vue'),
          meta: {
            requiresAdmin: true,
          },
        },
        {
          path: 'admin/reports',
          name: 'reportsAdmin',
          component: () => import('./views/Admin/Reports.vue'),
          meta: {
            requiresAdmin: true,
          },
        },
        {
          path: 'admin/logs',
          name: 'logsAdmin',
          component: () => import('./views/Admin/Logs.vue'),
          meta: {
            requiresAdmin: true,
          },
        },
        {
          path: '404',
          name: '404',
          component: () => import('./views/404.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { $state: state } = useStore()
  const { cookies } = useCookies()

  let tokenExpired = false
  let authToken = cookies.get('authToken')
  let isLoggedIn = cookies.get('isLoggedIn')
  if (isLoggedIn) state.isLoggedIn = isLoggedIn

  if (authToken) {
    let { response } = await useAxios('get', '/auth/user')

    if (response.data.ok) {
      state.user = response.data.data
      state.isLoggedIn = true
    } else {
      state.user = null
      state.isLoggedIn = false
      cookies.remove('authToken')
      cookies.remove('isLoggedIn')
      tokenExpired = true
    }
  }

  routerLang(state, to, next)

  if (
    state.isLoggedIn &&
    !state.user?.isVerified &&
    to.name !== 'verifyEmail' &&
    to.name !== 'verifyEmailWToken' &&
    to.name !== 'verifyEmailWToken' &&
    to.name !== 'userNotification'
  ) {
    return next({
      name: 'verifyEmail',
      params: { lang: state.lang },
    })
  }

  if (
    state.isLoggedIn &&
    state.user?.isVerified &&
    (to.name === 'verifyEmail' || to.name === 'verifyEmailWToken')
  ) {
    return next({
      name: 'home',
      params: { lang: state.lang },
    })
  }

  if (tokenExpired) {
    next({
      name: 'login',
      params: { lang: state.lang },
      query: { ref: 'token_expired' },
    })
    return
  }

  if (state.isLoggedIn && to.meta.requiresUnAuth) {
    next({ name: 'home', params: { lang: state.lang } })
    return
  }

  if (state.isLoggedIn && to.meta.requiresAdmin && !state.user.isAdmin) {
    next({ name: 'home', params: { lang: state.lang } })
    return
  }

  if (!state.isLoggedIn && to.meta.requiresAuth) {
    next({ name: 'home', params: { lang: state.lang } })
    return
  }
  next()
})

export default router
