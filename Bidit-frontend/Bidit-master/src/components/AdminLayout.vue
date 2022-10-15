<script setup>
import AdminNavbar from '../components/AdminNavbar.vue'
</script>

<template>
  <div class="flex flex-1 overflow-hidden">
    <AdminNavbar />

    <div class="mb-16 w-full overflow-hidden p-5 md:mb-5">
      <slot />
    </div>
  </div>
</template>
