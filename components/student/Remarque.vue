<template>
  <div class="borders w-full lg:w-[48%] p-5 shadow-sm">
    <h2>Remarques</h2>
    <ul class="text-charcoal text-wrap mt-3">
      <li
        v-for="(remarque, index) in props.studentInfo"
        :key="index"
        class="mb-2 pb-2 border-b border-lavender last:border-none text-charcoal last:mb-0"
      >
        <p>
          Message:
          <span class="text-black highlight">{{ remarque.text }}</span>
        </p>
        <p class="mt-1">
          Date:
          <span class="text-black highlight">{{
            formatDate(remarque.updated_at)
          }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  studentInfo: Object,
});

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("fr-FR", options);
};
</script>
