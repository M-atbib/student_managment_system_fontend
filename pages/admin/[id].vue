<template>
  <div>
    <AdminSearch />

    <div
      class="flex lg:justify-end items-end w-full flex-wrap gap-4 lg:gap-8 my-5"
    >
      <AdminPresence :students="adminStore.studentTable" />
      <AdminAnnonce />
      <AdminAddStudent />
    </div>

    <AdminTable
      v-if="adminStore.studentTable"
      :studentTable="adminStore.studentTable"
    />
    <LayoutNoContent v-else />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAdminStore } from "~/stores/admin";

const adminStore = useAdminStore();
const route = useRoute();

onMounted(async () => {
  const uuid = route.params.id;
  await adminStore.getAllStudents(uuid);
});

definePageMeta({
  middleware: ["auth"],
  roles: ["owner", "coiffure", "esthetique"],
});
</script>
