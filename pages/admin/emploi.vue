<template>
  <div>
    <LayoutAlert />
    <div
      class="flex flex-col lg:flex-row lg:items-center gap-3 justify-between mb-8"
    >
      <h1>Emploi du Temps</h1>
      <AdminEmploiAdd class="self-end" />
    </div>

    <div v-if="adminStore.timetable">
      <ul
        class="flex items-stretch justify-start gap-8 lg:gap-10 flex-wrap h-fit"
      >
        <li
          v-for="(emploi, index) in timetableArray"
          :key="index"
          class="borders w-full lg:w-[31%] p-4 pb-10 relative text-wrap"
        >
          <h3>
            Titre d'emploi du temps:
            <span class="highlight">{{ emploi.title }}</span>
          </h3>
          <p class="my-3">
            Groupe Concerné:
            <span class="highlight">{{ emploi.group.name }}</span>
          </p>
          <p class="cursor-pointer mb-2">
            File:
            <a
              :href="`http://127.0.0.1:8000/storage/${emploi.name_file}`"
              target="_blank"
              class="highlight hover:bg-lightBlue"
              >{{ getFileName(emploi.name_file) }}</a
            >
          </p>

          <div
            class="flex items-end justify-end gap-2 absolute right-4 bottom-4"
          >
            <div
              class="group relative cursor-pointer"
              @click="deleteTimetable(emploi.uuid)"
            >
              <Icon name="ic:outline-delete" class="text-2xl text-darkBlue" />
              <span class="tooltip">Supprimer</span>
            </div>

            <AdminEmploiAdd
              :method="'PUT'"
              :title="'Mettre à Jour Emploi du Temp'"
              :action="'Mettre à Jour'"
              :timetable="emploi"
            />
          </div>
        </li>
      </ul>
    </div>

    <LayoutNoContent v-else />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAdminStore } from "~/stores/admin";

const adminStore = useAdminStore();

const refreshTimetable = async () => {
  await adminStore.getTimetable(localStorage.getItem("etab_uuid"));
};

onMounted(refreshTimetable);

const deleteTimetable = async (uuid) => {
  await adminStore.deleteTimetable(uuid);
  await refreshTimetable();
};

const timetableArray = computed(() => {
  if (adminStore.timetable) {
    return Array.isArray(adminStore.timetable)
      ? adminStore.timetable
      : [adminStore.timetable];
  }
});

const getFileName = (filePath) => {
  let fileName = filePath.split("/").pop();
  let nameParts = fileName.split("_");
  if (nameParts.length > 1) {
    nameParts.shift();
    fileName = nameParts.join("_");
  }
  return fileName.split(".").slice(0, -1).join(".");
};

definePageMeta({
  middleware: ["auth"],
  roles: ["owner", "coiffure", "esthetique"],
});
</script>
