<template>
  <div
    class="w-full h-[70vh] flex flex-col items-center justify-center gap-10 align-middle"
  >
    <img src="~/assets/images/logo.png" alt="logo" class="w-24 lg:w-60" />
    <div class="text-center">
      <h1 class="mb-5">Naviguer au espace etudiant</h1>
      <NuxtLink to="/login" class="button">Espace Etudiant Test</NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "login",
});
</script>
