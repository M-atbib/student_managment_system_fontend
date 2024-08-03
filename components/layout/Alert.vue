<template>
  <div v-if="displayAlert" class="fixed top-20 right-5">
    <div
      class="text-white p-4 rounded-lg shadow-md z-50"
      :class="
        appStore.isSuccess
          ? 'bg-green-500'
          : appStore.isError
          ? 'bg-red-500'
          : ''
      "
    >
      <p>{{ appStore.errorMessage || appStore.successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "~/stores";
import { ref, watch } from "vue";

const appStore = useAppStore();
const displayAlert = ref(false);
const timer = ref(5);

watch(
  () => [appStore.isError, appStore.isSuccess],
  ([isError, isSuccess]) => {
    if (isError || isSuccess) {
      displayAlert.value = true;
      const interval = setInterval(() => {
        if (timer.value === 0) {
          displayAlert.value = false;
          clearInterval(interval);
        } else {
          timer.value--;
        }
      }, 1000);
    }
  }
);
</script>
