<template>
  <div>
    <h1>Presence</h1>

    <div>
      <ul
        class="flex items-start justify-start gap-5 lg:gap-10 flex-wrap mt-4 lg:mt-8"
      >
        <li
          v-for="(presence, index) in props.studentDetails.presences"
          :key="index"
          class="borders shadow-sm w-full lg:w-fit p-4"
        >
          <h3 class="mb-2">
            Seance:
            <span class="text-black highlight">{{ presence.title }}</span>
          </h3>
          <h3 class="mb-2">
            Retard/Absence:
            <span class="text-black highlight">{{ presence.type }}</span>
          </h3>
          <h3 class="mb-2">
            Justifier:
            <span class="text-black highlight">{{
              presence.justification === 1 ? "Oui" : "Non"
            }}</span>
          </h3>
          <h3 class="mb-2">
            justification:
            <span class="text-black highlight">{{ presence.remarque }}</span>
          </h3>
          <h3>
            Date:
            <span class="text-black highlight">{{ presence.date }}</span>
          </h3>

          <!-- <div class="flex items-center justify-end gap-2">
            <div class="group relative">
              <Icon name="ic:outline-delete" class="text-2xl" />
              <span class="tooltip">Supprimer</span>
            </div>
          </div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  studentDetails: Object,
});

console.log(props.studentDetails);
</script>
