<template>
  <button
    :="$attrs"
    class="group relative rounded-md bg-bi-300 to-black px-5 py-2 font-medium text-white backdrop-blur-sm transition-colors hover:bg-bi-400"
  >
    <slot />
  </button>
</template>
