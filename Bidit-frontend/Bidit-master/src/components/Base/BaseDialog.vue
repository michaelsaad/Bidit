<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup></script>

<template>
  <div>
    <div
      class="fixed top-0 left-0 z-20 grid h-full w-full bg-black/20 backdrop-blur-sm"
      :="$attrs"
    ></div>
    <slot />
  </div>
</template>
