<template>
  <div class="flex justify-center items-center gap-1">
    <NuxtLink :to="`/admin/student/${props.studentId}`" class="group relative">
      <Icon name="mdi:eye-outline" class="text-xl text-darkBlue lg:text-2xl" />
      <span class="tooltip">Voir Détails</span>
    </NuxtLink>

    <div class="group relative" @click="archiver">
      <Icon name="mingcute:archive-line" class="text-xl text-darkBlue lg:text-2xl" />
      <span class="tooltip">Archiver</span>
    </div>

    <AdminTableMessage :studentUuid="props.studentId" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAdminStore } from "~/stores/admin";
import { useRoute } from "vue-router";

const adminStore = useAdminStore();
const showMessage = ref(false);
const route = useRoute();
const props = defineProps({
  studentId: String,
});

const archiver = async () => {
  const uuid = route.params.id;

  await adminStore.archiveStudent(props.studentId);
  await adminStore.getAllStudents(uuid);
};

const toggleMessage = () => {
  showMessage.value = !showMessage.value;
};
</script>
