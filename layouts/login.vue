<template>
  <div class="w-[85%] lg:w-[95%] mx-auto">
    <slot />
  </div>
</template>

<script>
import { ref } from "vue";
import { useAppStore } from "../stores/index";

export default {
  setup() {
    const store = useAppStore();
    return { store };
  },
};
</script>

<style lang="scss" scoped></style>
