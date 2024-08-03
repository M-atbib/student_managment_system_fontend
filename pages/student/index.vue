<template>
  <div v-if="studentStore.studentInfo || studentStore.annonce">
    <!-- info, paiement, note, remarque, annonce -->
    <h1 class="mb-4">Votre Informations:</h1>
    <StudentInfo :studentInfo="studentStore.studentInfo" />

    <h1 class="mb-4">Vos paiements :</h1>
    <StudentPaiements :studentInfo="studentStore.studentInfo" />

    <h1 class="mb-4">Annonces Général et Remarques:</h1>
    <div class="w-full flex flex-col lg:flex-row gap-5 justify-between mb-8">
      <StudentRemarque :studentInfo="studentStore.studentInfo.remarques" />
      <StudentAnnonce :annonces="studentStore.annonce" />
    </div>

    <h1 class="mb-4">Votre Presence:</h1>
    <StudentPresence :studentInfo="studentStore.studentInfo.presences" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStudentStore } from "~/stores/student";

const studentStore = useStudentStore();

onMounted(async () => {
  await studentStore.getStudentInfo();
  console.log(studentStore.studentInfo);

  await studentStore.getAnnonce();

});

definePageMeta({
  middleware: ["student"],
  roles: ["student"],
  layout: "owner",
});
</script>
