<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <h1 class="text-6xl font-bold">500</h1>
      <p class="text-xl mt-3 mb-5">Oops! Something went wrong.</p>
      <nuxt-link to="/" class="text-blue-500">Return to Home</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Server Error",
    };
  },
};
</script>
