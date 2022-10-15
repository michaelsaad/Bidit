import axios from 'axios'
import { useStore } from './store'
import { categories } from './lang/categories.json'
import { reportTypes } from './lang/reportTypes.json'
import { statuses } from './lang/bidstatus.json'
import { statuses as orderStatuses } from './lang/orderstatus.json'
import { reportStatuses } from './lang/reportstatus.json'
import { useCookies } from 'vue3-cookies'

export const $t = (x) => {
  const { $state: state } = useStore()
  return x[state.lang]
}

export const routerLang = (state, to, next) => {
  if (to.params.lang === 'en' || to.meta.requiresAdmin) {
    state.lang = 'en'
    localStorage.setItem('lang', 'en')
  } else if (to.params.lang === 'ar') {
    state.lang = 'ar'
    localStorage.setItem('lang', 'ar')
  } else {
    const currentLang = localStorage.getItem('lang')

    if (!currentLang) {
      const preferdLang = navigator.language.split('-')[0]

      if (preferdLang === 'en') {
        state.lang = 'en'
        localStorage.setItem('lang', 'en')
      } else {
        state.lang = 'ar'
        localStorage.setItem('lang', 'ar')
      }
    } else state.lang = currentLang
    next({ name: to.name, params: { lang: state.lang } })
    return
  }

  if (state.lang === 'ar') {
    document.body.dir = 'rtl'
    document.querySelector('html').lang = state.lang
  } else {
    document.body.dir = 'ltr'
    document.querySelector('html').lang = state.lang
  }
}

export const getPreferedLanguage = () => {
  const { $state: state } = useStore()
  let preferdLang = navigator.language.split('-')[0]

  if (preferdLang === 'en') {
    return (state.lang = 'en')
  } else {
    return 'ar'
  }
}

export const getType = (val) => {
  let itemType

  if (!val) return 'N/F'

  categories.items.forEach((item) => {
    if (item.en.toLowerCase() === val?.toLowerCase()) {
      itemType = $t(item)
    }
  })

  return itemType || 'N/F'
}

export const getReportType = (val) => {
  let reportType

  if (!val) return 'N/F'

  reportTypes.forEach((report) => {
    if (report.en.toLowerCase() === val?.toLowerCase()) {
      reportType = $t(report)
    }
  })

  return reportType || 'N/F'
}

export const getReportStatus = (val) => {
  let reportStatus

  if (!val) return 'N/F'

  reportStatuses.forEach((state) => {
    if (state.en.toLowerCase() === val.toLowerCase()) {
      reportStatus = $t(state)
    }
  })

  return reportStatus || 'N/F'
}

export const getOrderStatus = (val) => {
  let orderStatus

  if (!val) return 'N/F'

  orderStatuses.forEach((state) => {
    if (state.en.toLowerCase() === val.toLowerCase()) {
      orderStatus = $t(state)
    }
  })

  return orderStatus || 'N/F'
}

export const getStatus = (val) => {
  let bidStatus

  if (!val) return 'N/F'

  statuses.forEach((state) => {
    if (state.en.toLowerCase() === val.toLowerCase()) {
      bidStatus = $t(state)
    }
  })

  return bidStatus || 'N/F'
}

export const getPricePerLang = (val) => {
  return new Intl.NumberFormat('en-EG', {
    maximumFractionDigits: 0,
  }).format(val)
}

export const useAxios = async (req, path, body) => {
  const { $state: state } = useStore()

  const { cookies } = useCookies()
  let authToken = cookies.get('authToken')

  let response = $ref(null)

  let headers = {
    'Access-Control-Allow-Origin': '*',
    'Accept-Language': state.lang,
    Authorization: authToken ? `Bearer ${authToken}` : null,
  }

  try {
    response = await axios({
      method: req,
      url: state.BASE_URL + path,
      data: body,
      headers,
      validateStatus: () => true,
    })
  } catch (err) {
    console.log(err)
  }

  return { response }
}

export const usePaymob = async (order) => {
  const { $state: state } = useStore()

  let authRes = await axios({
    method: 'post',
    url: 'https://accept.paymob.com/api/auth/tokens',
    data: {
      api_key:
        'ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6VXhNaUo5LmV5SnVZVzFsSWpvaWFXNXBkR2xoYkNJc0luQnliMlpwYkdWZmNHc2lPakUzTXpreE55d2lZMnhoYzNNaU9pSk5aWEpqYUdGdWRDSjkuYUZZWnJWRVp2NnczdlRXSDN2LS1pSjlRSUdNenVEZ3drYlVReTh5enRzUDlqQmE1bzRRb240QkpLdFItNmJOdzJIZG1jUWRnaEFnbVZURFBsTDZBdEE=',
    },
    validateStatus: () => true,
  })

  let body = {
    auth_token: await authRes.data.token,
    delivery_needed: 'false',
    amount_cents: order.price * 100,
    currency: 'EGP',
    items: [
      {
        name: order.bid.item.name,
        amount_cents: order.price * 100,
        description: order.bid.item.description,
        quantity: '1',
      },
    ],
  }

  let orderRes = await axios({
    method: 'post',
    url: 'https://accept.paymob.com/api/ecommerce/orders',
    data: body,
    validateStatus: () => true,
  })

  let body2 = {
    auth_token: await authRes.data.token,
    amount_cents: order.price * 100,
    expiration: 3600,
    order_id: await orderRes.data.id,
    billing_data: {
      email: state.user.email,
      first_name: state.user.name,
      phone_number: state.user.phone,
      last_name: state.user.name,
      apartment: 'NA',
      floor: 'NA',
      street: 'NA',
      building: 'NA',
      shipping_method: 'NA',
      postal_code: 'NA',
      city: 'NA',
      country: 'NA',
      state: 'NA',
    },
    currency: 'EGP',
    integration_id: 2062140,
  }

  let paymentRes = await axios({
    method: 'post',
    url: `https://accept.paymob.com/api/acceptance/payment_keys`,
    data: body2,
    validateStatus: () => true,
  })

  return `https://accept.paymobsolutions.com/api/acceptance/iframes/381359?payment_token=${paymentRes.data.token}`
}

export const useDebounce = (cb, delay = 300) => {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(args)
    }, delay)
  }
}

export const useMeta = ({ title, base }) => {
  let str
  if (base) str = ' - Bidit'
  document.title = title + str
}
