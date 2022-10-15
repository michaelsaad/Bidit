<script setup>
import { useStore } from '../store'
const { $state: state } = $(useStore())

let isCollapsed = $ref(true)
</script>

<template>
  <div
    class="fixed bottom-0 left-0 z-20 h-[4.5rem] w-full flex-shrink-0 border-t-2 border-[#123f55] bg-[#1C263D] transition-all duration-300 md:static md:h-auto md:min-h-screen md:border-t-0"
    :class="isCollapsed ? 'md:w-16' : 'md:w-48'"
  >
    <ul
      class="fixed flex w-[inherit] flex-row items-center justify-between gap-x-0.5 overflow-hidden bg-[#1C263D] sm:min-h-screen sm:items-stretch md:flex-col md:justify-start"
    >
      <!-- <li class="h-px w-2/3 bg-gray-700 mx-auto my-3"></li> -->
      <li>
        <RouterLink
          :to="`/${state.lang}/admin`"
          class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
          title="Dashboard"
        >
          <svg
            class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="3" fill="#425165" />
            <rect x="5" y="9" width="2" height="11" fill="#7B8A9E" />
            <rect x="11" y="4" width="2" height="16" fill="#7B8A9E" />
            <rect x="17" y="14" width="2" height="6" fill="#7B8A9E" />
          </svg>

          <transition name="fade">
            <span
              v-show="!isCollapsed"
              class="hidden translate-y-px font-normal transition-all md:block"
              >Dashboard</span
            >
          </transition>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="`/${state.lang}/admin/users`"
          class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
          title="Users"
        >
          <svg
            class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.8944 19.1651C20.964 18.9204 21 18.6705 21 18.4167C21 16.1294 18.0808 14.1683 13.927 13.339C14.8532 13.122 15.8938 13.0002 16.9935 13.0002C20.8631 13.0002 24 14.5078 24 16.3675C24 17.5333 22.7674 18.5607 20.8944 19.1651Z"
              fill="#8190A4"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.3386 10.4154C17.3803 9.33196 18 7.97402 18 6.5C18 4.89321 17.2637 3.42437 16.0469 2.29869C16.4582 2.17577 16.8954 2.10956 17.3488 2.10956C19.7672 2.10956 21.7278 3.99407 21.7278 6.31874C21.7278 8.64341 19.7672 10.5279 17.3488 10.5279C17.0011 10.5279 16.6629 10.489 16.3386 10.4154Z"
              fill="#425165"
            />
            <ellipse
              cx="9.36317"
              cy="18.5"
              rx="9.36317"
              ry="4.5"
              fill="#8190A4"
            />
            <ellipse
              cx="9.88336"
              cy="6.5"
              rx="5.72194"
              ry="5.5"
              fill="#425165"
            />
          </svg>

          <transition name="fade">
            <span
              v-show="!isCollapsed"
              class="hidden translate-y-px font-normal transition-all md:block"
              >Users</span
            >
          </transition>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="`/${state.lang}/admin/bannedusers`"
          class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
          title="Banned Users"
        >
          <svg
            class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.5992 6.24298C12.8543 6.95997 10.7222 9.19312 10.1512 11.9941C10.0625 11.998 9.97316 12 9.88338 12C6.72324 12 4.16144 9.53757 4.16144 6.5C4.16144 3.46243 6.72324 1 9.88338 1C12.9539 1 15.4595 3.32474 15.5992 6.24298Z"
              fill="#425165"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.0171 14.0108C9.80107 14.0036 9.58301 14 9.36317 14C4.19203 14 0 16.0147 0 18.5C0 20.9853 4.19203 23 9.36317 23C12.6163 23 15.4819 22.2027 17.1602 20.9924C13.3456 20.8223 10.2722 17.8027 10.0171 14.0108Z"
              fill="#8190A4"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.3251 17.4731C19.3861 18.1405 18.2411 18.4539 17.0931 18.3576C15.9452 18.2613 14.8684 17.7615 14.0538 16.947C13.2391 16.1324 12.7393 15.0557 12.6428 13.9078C12.5464 12.7598 12.8596 11.6148 13.5269 10.6758L20.3251 17.4747V17.4731ZM21.4739 16.3242L14.6758 9.52688C15.6148 8.85901 16.76 8.54535 17.9083 8.64155C19.0565 8.73775 20.1336 9.23759 20.9484 10.0524C21.7632 10.8672 22.2631 11.9443 22.3593 13.0925C22.4555 14.2408 22.1418 15.3852 21.4739 16.3242ZM24 13.5C24 15.2239 23.3152 16.8772 22.0962 18.0962C20.8772 19.3152 19.2239 20 17.5 20C15.7761 20 14.1228 19.3152 12.9038 18.0962C11.6848 16.8772 11 15.2239 11 13.5C11 11.7761 11.6848 10.1228 12.9038 8.90381C14.1228 7.68482 15.7761 7 17.5 7C19.2239 7 20.8772 7.68482 22.0962 8.90381C23.3152 10.1228 24 11.7761 24 13.5Z"
              fill="#8190A4"
            />
          </svg>

          <transition name="fade">
            <span
              v-show="!isCollapsed"
              class="hidden translate-y-px font-normal transition-all md:block"
              >Banned Users</span
            >
          </transition>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="`/${state.lang}/admin/bids`"
          class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
          title="Bids"
        >
          <svg
            class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 5C0 3.34315 1.34315 2 3 2H21C22.6569 2 24 3.34315 24 5V9.77778C22.6745 9.7778 21.6 10.7727 21.6 12C21.6 13.2273 22.6745 14.2222 24 14.2222V19C24 20.6569 22.6569 22 21 22H3C1.34315 22 0 20.6569 0 19V14.2222C1.21593e-05 14.2222 2.43187e-05 14.2222 3.6478e-05 14.2222C1.32552 14.2222 2.40004 13.2273 2.40004 12C2.40004 10.7727 1.32552 9.77778 3.6478e-05 9.77778C2.43187e-05 9.77778 1.21593e-05 9.77778 0 9.77778V5Z"
              fill="#425165"
            />
            <path
              d="M11.0878 8.84554C11.4413 8.05855 12.5587 8.05855 12.9122 8.84554L13.3429 9.80443C13.4933 10.1392 13.8151 10.3648 14.1811 10.3919L15.1528 10.4641C16.061 10.5315 16.4137 11.6789 15.7002 12.2448L15.0769 12.7392C14.7673 12.9847 14.6314 13.3895 14.7299 13.7721L14.9399 14.587C15.1599 15.4411 14.2469 16.1411 13.4792 15.707L12.4923 15.1488C12.1868 14.976 11.8132 14.976 11.5077 15.1488L10.5208 15.707C9.75306 16.1411 8.84008 15.4411 9.06011 14.587L9.27005 13.7721C9.36863 13.3895 9.23266 12.9847 8.92309 12.7392L8.29981 12.2448C7.5863 11.6789 7.93901 10.5315 8.8472 10.4641L9.81891 10.3919C10.1849 10.3648 10.5067 10.1392 10.6571 9.80443L11.0878 8.84554Z"
              fill="#C4C4C4"
            />
          </svg>

          <transition name="fade">
            <span
              v-show="!isCollapsed"
              class="hidden translate-y-px font-normal transition-all md:block"
              >Bids</span
            >
          </transition>
        </RouterLink>
      </li>

      <li>
        <RouterLink
          :to="`/${state.lang}/admin/orders`"
          class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
          title="Orders"
        >
          <svg
            class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <circle cx="17.9101" cy="18" r="2" fill="#425165" />
              <circle cx="6" cy="18" r="2" fill="#425165" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19 4H0V9.90909C0 12.6705 2.23858 14.9091 5 14.9091H19C21.7614 14.9091 24 12.6705 24 9.90909V9C24 6.23858 21.7614 4 19 4ZM13.1711 6.63636C12.7568 6.63636 12.4211 6.97215 12.4211 7.38636C12.4211 8.07672 12.9807 8.63636 13.671 8.63636H18.3684C18.9207 8.63636 19.3684 8.18864 19.3684 7.63636C19.3684 7.08408 18.9207 6.63636 18.3684 6.63636H13.1711Z"
                fill="#8291A5"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <transition name="fade">
            <span
              v-show="!isCollapsed"
              class="hidden translate-y-px font-normal transition-all md:block"
              >Orders</span
            >
          </transition>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="`/${state.lang}/admin/reports`"
          class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
          title="Reports"
        >
          <svg
            class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.25 2.5H16.75C19.5114 2.5 21.75 4.73858 21.75 7.5V16.5C21.75 19.2614 19.5114 21.5 16.75 21.5H7.25C4.48858 21.5 2.25 19.2614 2.25 16.5V2.5ZM5.90625 8.58594C5.90625 7.84812 6.50437 7.25 7.24219 7.25H16.3125C17.2963 7.25 18.0938 8.04749 18.0938 9.03125C18.0938 10.015 17.2963 10.8125 16.3125 10.8125H8.13281C6.90312 10.8125 5.90625 9.81563 5.90625 8.58594ZM7.24219 13.1875C6.50437 13.1875 5.90625 13.7856 5.90625 14.5234C5.90625 15.7531 6.90312 16.75 8.13281 16.75H16.3125C17.2963 16.75 18.0938 15.9525 18.0938 14.9688C18.0938 13.985 17.2963 13.1875 16.3125 13.1875H7.24219Z"
              fill="#8291A5"
            />
          </svg>

          <transition name="fade">
            <span
              v-show="!isCollapsed"
              class="hidden translate-y-px font-normal transition-all md:block"
              >Reports</span
            >
          </transition>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="`/${state.lang}/admin/notifications`"
          class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
          title="Notifications"
        >
          <svg
            class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 10C0 7.79086 1.79086 6 4 6H20C22.2091 6 24 7.79086 24 10V18H4C1.79086 18 0 16.2091 0 14V10Z"
              fill="#425165"
            />
            <circle cx="6" cy="12" r="1" fill="#8291A5" />
            <circle cx="9" cy="12" r="1" fill="#8291A5" />
            <circle cx="12" cy="12" r="1" fill="#8291A5" />
          </svg>

          <transition name="fade">
            <span
              v-show="!isCollapsed"
              class="hidden translate-y-px font-normal transition-all md:block"
              >Notifications</span
            >
          </transition>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="`/${state.lang}/admin/logs`"
          class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:ring-1 md:px-3 md:py-3"
          title="Logs"
        >
          <svg
            class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            ></path>
          </svg>

          <transition name="fade">
            <span
              v-show="!isCollapsed"
              class="hidden translate-y-px font-normal transition-all md:block"
              >Logs</span
            >
          </transition>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="`/${state.lang}`"
          class="flex w-full gap-1 bg-[#1C263D] py-6 font-medium text-[#8291A5] ring-inset transition-all hover:bg-[#273146] focus:outline-none focus:ring-1 md:px-3 md:py-3"
          title="To Home"
        >
          <svg
            class="pointer-events-none mx-[10px] w-5 flex-shrink-0 select-none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75V11.25ZM22.5303 12.5303C22.8232 12.2374 22.8232 11.7626 22.5303 11.4697L17.7574 6.6967C17.4645 6.40381 16.9896 6.40381 16.6967 6.6967C16.4038 6.98959 16.4038 7.46447 16.6967 7.75736L20.9393 12L16.6967 16.2426C16.4038 16.5355 16.4038 17.0104 16.6967 17.3033C16.9896 17.5962 17.4645 17.5962 17.7574 17.3033L22.5303 12.5303ZM9 12.75H22V11.25H9V12.75Z"
              fill="#8291A5"
            />
            <path
              d="M1 4C1 2.34315 2.34315 1 4 1H14V8C14 8.55228 13.5523 9 13 9H4C2.34315 9 1 7.65685 1 6V4Z"
              fill="#425165"
            />
            <rect
              x="1"
              y="20"
              width="15"
              height="5"
              transform="rotate(-90 1 20)"
              fill="#425165"
            />
            <path
              d="M1 18C1 16.3431 2.34315 15 4 15H13C13.5523 15 14 15.4477 14 16V23H4C2.34315 23 1 21.6569 1 20V18Z"
              fill="#425165"
            />
          </svg>

          <transition name="fade">
            <span
              v-show="!isCollapsed"
              class="hidden translate-y-px font-normal transition-all md:block"
              >To Home</span
            >
          </transition>
        </RouterLink>
      </li>
    </ul>
    <button
      @click="isCollapsed = !isCollapsed"
      class="shadow-x fixed bottom-0 my-3 mx-auto hidden h-7 w-7 rounded-full bg-indigo-600 ring-inset ring-offset-1 transition hover:bg-indigo-800 focus:outline-none focus:ring-1 md:block"
      :class="
        !isCollapsed
          ? 'translate-x-[11.1rem] rotate-180'
          : 'translate-x-[3.1rem]'
      "
      style="transition: transform 0.2s ease-out, left 0.3s ease-out"
    >
      <svg
        class="pointer-events-none mx-auto h-4 w-4 flex-shrink-0 select-none text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </button>
  </div>
</template>
