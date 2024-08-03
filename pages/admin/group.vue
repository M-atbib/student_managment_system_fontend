<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1>Groupes</h1>
      <AdminGroupsAdd />
    </div>

    <ul
      v-if="groupArray"
      class="flex items-start justify-start gap-8 lg:gap-12 flex-wrap"
    >
      <li
        v-for="(group, index) in groupArray"
        :key="index"
        class="borders w-full lg:w-fit p-4"
      >
        <h3 class="font-medium">
          Nom Group: <span class="text-black highlight">{{ group.name }}</span>
        </h3>
        <p class="my-3">
          N° Etudiant:
          <span class="font-bold">{{ group.students_count }}</span>
        </p>
        <div class="flex items-center justify-end gap-2">
          <AdminGroupsStudentList
            v-if="group.students_count > 0"
            :groupUuid="group.uuid"
          />

          <div class="group relative" @click="deleteTimetable(group.uuid)">
            <Icon name="ic:outline-delete" class="text-2xl text-darkBlue" />
            <span class="tooltip">Supprimer</span>
          </div>

          <AdminGroupsAdd
            :method="'PUT'"
            :title="'Mettre à Jour Group'"
            :action="'Mettre à Jour'"
            :group="group"
          />
        </div>
      </li>
    </ul>

    <LayoutNoContent v-else />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAdminStore } from "~/stores/admin";

const adminStore = useAdminStore();
const showList = ref(false);

const groupArray = computed(() => {
  if (adminStore.groups) {
    return Array.isArray(adminStore.groups)
      ? adminStore.groups
      : [adminStore.groups];
  }
});

const refreshTimetable = async () => {
  await adminStore.getGroups(localStorage.getItem("etab_uuid"));
};

onMounted(refreshTimetable);

const deleteTimetable = async (uuid) => {
  await adminStore.deleteGroup(uuid);
  await refreshTimetable();
};

definePageMeta({
  middleware: ["auth"],
  roles: ["owner", "coiffure", "esthetique"],
});
</script>
