<script setup>
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <Navbar />
  <div class="mx-auto min-h-[70vh] max-w-atreus pt-[5.5rem]">
    <slot />
  </div>
  <Footer />
</template>
