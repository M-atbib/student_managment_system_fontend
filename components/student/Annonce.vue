<template>
  <div class="borders w-full lg:w-[48%] p-5 shadow-sm">
    <h2>Annonces</h2>
    <ul class="text-wrap mt-3">
      <li
        v-for="(annonce, index) in props.annonces"
        :key="index"
        class="mb-2 pb-2 border-b border-lavender last:border-none last:mb-0 text-charcoal"
      >
        <p>
          Message:
          <span class="text-black ml-1 lg:text-[17px] font-semibold">{{ annonce.text }}</span>
        </p>
        <p class="mt-1">
          Date:
          <span class="text-black ml-1 lg:text-[17px] font-semibold">{{ formatDate(annonce.created_at) }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  annonces: Object,
});

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("fr-FR", options);
};
</script>
