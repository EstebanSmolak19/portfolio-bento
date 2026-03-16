<template>
  <div class="min-h-screen flex flex-col">
    <Header/>
    <main class="flex-1 flex items-center justify-center p-6">
      <slot />
    </main>
    <Footer/>
  </div>
</template>

<script setup>
import Footer from '~/components/Footer.vue';
import Header from '~/components/Header.vue';
</script>
