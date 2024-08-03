<template>
  <div
    class="w-[90%] lg:w-[95%] min-h-screen flex flex-col gap-6 lg:gap-12 mx-auto pt-4"
  >
    <LayoutOtherNavbar />

    <div class="flex-grow">
      <div v-if="store.isLoading">
        <LayoutSecondLoading />
      </div>

      <slot />
    </div>

    <LayoutFooter />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAppStore } from "../stores/index.ts";

const store = useAppStore();
const layoutKey = ref(0);

watch(
  () => store.roles,
  () => {
    layoutKey.value++;
  }
);
</script>
