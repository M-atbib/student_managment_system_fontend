<template>
  <div class="borders w-full p-5 shadow-sm">
    <ul
      v-if="props.studentInfo.length > 0"
      class="flex flex-wrap gap-3 lg:gap-5 text-charcoal text-wrap"
    >
      <li
        v-for="(presence, index) in props.studentInfo"
        :key="index"
        class="flex flex-col gap-3 capitalize"
      >
        <p>
          Title:
          <span class="text-black highlight">{{ presence.title }}</span>
        </p>
        <p>
          Type:
          <span class="text-black highlight">{{ presence.type }}</span>
        </p>
        <p>
          Date:
          <span class="text-black highlight">{{ presence.date }}</span>
        </p>
      </li>
    </ul>

    <div v-else class="text-center py-10">
      <h2>Vous n'aves aucun absence ou retard</h2>
    </div>
  </div>
</template>

<script setup>
import student from "~/middleware/student";

const props = defineProps({
  studentInfo: Array,
});

console.log(props.studentInfo);
</script>
