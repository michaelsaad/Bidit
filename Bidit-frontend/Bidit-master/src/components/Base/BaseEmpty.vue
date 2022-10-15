<script setup>
defineProps(['msg'])
</script>

<template>
  <div class="mx-auto mt-24 flex flex-col items-center gap-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:svgjs="http://svgjs.com/svgjs"
      version="1.1"
      width="150"
      height="150"
      x="0"
      y="0"
      viewBox="0 0 512 512"
      xml:space="preserve"
      class=""
      data-v-928b0044=""
    >
      <g data-v-928b0044="">
        <linearGradient
          xmlns="http://www.w3.org/2000/svg"
          id="SVGID_1_"
          gradientUnits="userSpaceOnUse"
          x1="256"
          x2="256"
          y1="406"
          y2="31"
          data-v-928b0044=""
        >
          <stop
            stop-opacity="1"
            stop-color="#1f1b5d"
            offset="0"
            data-v-928b0044=""
          ></stop>
          <stop
            stop-opacity="1"
            stop-color="#4f46e5"
            offset="1"
            data-v-928b0044=""
          ></stop>
        </linearGradient>
        <linearGradient
          xmlns="http://www.w3.org/2000/svg"
          id="SVGID_2_"
          gradientUnits="userSpaceOnUse"
          x1="256"
          x2="256"
          y1="481"
          y2="316"
          data-v-928b0044=""
        >
          <stop offset="0" stop-color="#c3ffe8" data-v-928b0044=""></stop>
          <stop offset=".9973" stop-color="#f0fff4" data-v-928b0044=""></stop>
        </linearGradient>
        <g xmlns="http://www.w3.org/2000/svg" data-v-928b0044="">
          <g data-v-928b0044="">
            <g data-v-928b0044="">
              <path
                d="m511.7 312.7-60-270c-1.5-6.901-7.8-11.7-14.7-11.7h-362c-6.899 0-13.2 4.799-14.7 11.7l-60 270c-.3 1.2-.3 2.099-.3 3.3l166 90h180l166-90c0-1.201 0-2.1-.3-3.3z"
                fill="url(#SVGID_1_)"
                data-original="url(#SVGID_1_)"
                data-v-928b0044=""
              ></path>
            </g>
          </g>
          <g data-v-928b0044="">
            <g data-v-928b0044="">
              <path
                d="m394.6 316c-11.521 0-22.049 6.526-27.173 16.846l-17.292 34.825c-2.533 5.102-7.739 8.329-13.435 8.329h-161.401c-5.697 0-10.902-3.227-13.435-8.329l-17.292-34.825c-5.123-10.32-15.65-16.846-27.172-16.846h-117.4v150c0 8.284 6.716 15 15 15h482c8.284 0 15-6.716 15-15v-150z"
                fill="#f0ffff"
                data-v-928b0044=""
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <span class="font-semibold">{{ $t(msg) }}</span>
  </div>
</template>
