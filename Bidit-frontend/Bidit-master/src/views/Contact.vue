<script setup>
import BaseTitle from '../components/Base/BaseTitle.vue'

const text = $ref({
  title: {
    ar: 'تواصل معنا',
    en: 'Contact Us',
  },
  contact: {
    ar: 'يمكنك التواصل معنا عبر الوسائل التالية:',
    en: 'You can contact us throw the following medias:',
  },
})
</script>

<template>
  <BaseTitle class="mx-5">{{ $t(text.title) }}</BaseTitle>
  <div class="m-5">
    <p class="mb-3 text-lg">{{ $t(text.contact) }}</p>

    <div class="flex flex-col items-start">
      <a
        href="https://www.facebook.com/ElshoroukAcd/"
        target="_blank"
        class="flex items-center gap-3 p-1"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
        >
          <title>Facebook</title>
          <path
            fill="#1877F2"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
        <span
          class="font-semibold text-indigo-800 transition-colors hover:text-indigo-500"
          >Bid!T on facebook</span
        >
      </a>

      <a
        href="mailto:bidit.platform@gmail.com"
        target="_blank"
        class="flex items-center gap-3 p-1"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
        >
          <title>Gmail</title>
          <path
            fill="#EA4335"
            d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          />
        </svg>
        <span
          class="font-semibold text-rose-800 transition-colors hover:text-rose-500"
          >Bid!T on GMail</span
        >
      </a>

      <a
        href="https://www.linkedin.com/feed/"
        target="_blank"
        class="flex items-center gap-3 p-1"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
        >
          <title>LinkedIn</title>
          <path
            fill="#0A66C2"
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        </svg>
        <span
          class="font-semibold text-indigo-800 transition-colors hover:text-indigo-500"
          >Bid!T on LinkedIn</span
        >
      </a>

      <a
        href="https://goo.gl/maps/RwzK3DuQhCx3bkuS8"
        class="flex items-center gap-3 p-1"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
        >
          <title>Google Maps</title>
          <path
            fill="#4285F4"
            d="M19.527 4.799c1.212 2.608.937 5.678-.405 8.173-1.101 2.047-2.744 3.74-4.098 5.614-.619.858-1.244 1.75-1.669 2.727-.141.325-.263.658-.383.992-.121.333-.224.673-.34 1.008-.109.314-.236.684-.627.687h-.007c-.466-.001-.579-.53-.695-.887-.284-.874-.581-1.713-1.019-2.525-.51-.944-1.145-1.817-1.79-2.671L19.527 4.799zM8.545 7.705l-3.959 4.707c.724 1.54 1.821 2.863 2.871 4.18.247.31.494.622.737.936l4.984-5.925-.029.01c-1.741.601-3.691-.291-4.392-1.987a3.377 3.377 0 0 1-.209-.716c-.063-.437-.077-.761-.004-1.198l.001-.007zM5.492 3.149l-.003.004c-1.947 2.466-2.281 5.88-1.117 8.77l4.785-5.689-.058-.05-3.607-3.035zM14.661.436l-3.838 4.563a.295.295 0 0 1 .027-.01c1.6-.551 3.403.15 4.22 1.626.176.319.323.683.377 1.045.068.446.085.773.012 1.22l-.003.016 3.836-4.561A8.382 8.382 0 0 0 14.67.439l-.009-.003zM9.466 5.868L14.162.285l-.047-.012A8.31 8.31 0 0 0 11.986 0a8.439 8.439 0 0 0-6.169 2.766l-.016.018 3.665 3.084z"
          />
        </svg>
        <span
          class="font-semibold text-sky-800 transition-colors hover:text-sky-500"
          >Bid!T's Location</span
        >
      </a>

      <a href="tel:01211597240" class="flex items-center gap-3 p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="#b897f5"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span
          class="font-semibold text-violet-800 transition-colors hover:text-violet-500"
          >Bid!T's Phone</span
        >
      </a>
    </div>
  </div>

</template>
