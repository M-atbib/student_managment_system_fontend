<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <h1 class="text-6xl font-bold">404</h1>
      <p class="text-xl mt-3 mb-5">Oops! Page not found.</p>
      <nuxt-link to="/" class="text-blue-500">Return to Home</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Page Not Found'
    }
  }
}
</script>

<style scoped>
h1 {
  color: #3c4b64;
}
p {
  color: #526582;
}
</style>
