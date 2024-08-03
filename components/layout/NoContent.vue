<template>
  <div class="flex items-center justify-center min-h-[40vh]">
    <h1 class="text-gray-500 text-xl">{{ appStore.noContent }}</h1>
  </div>
</template>

<script setup>
import {useAppStore} from "~/stores";

const appStore = useAppStore()
</script>

<style scoped>
/* You can add styles here if needed */
</style>
