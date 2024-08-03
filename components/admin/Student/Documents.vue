<template>
  <div>
    <div class="flex flex-col lg:flex-row justify-between gap-3 mb-4 lg:mb-8">
      <h1>Documents</h1>
      <AdminStudentAddingDoc
        class="self-end"
        :studentUuid="props.studentDetails.uuid"
      />
    </div>

    <div>
      <ul class="flex items-start justify-start gap-5 lg:gap-12 flex-wrap">
        <li
          v-for="(doc, index) in props.studentDetails.documents"
          :key="index"
          class="borders shadow-sm w-full lg:w-fit p-4"
        >
          <h3>
            Titre Document:
            <span class="text-black highlight">{{
              getFileName(doc.name_file)
            }}</span>
          </h3>

          <div class="flex items-center justify-end gap-2 mt-2">
            <a
              :href="`http://127.0.0.1:8000/storage/${doc.name_file}`"
              target="_blank"
              class="font-bold"
              ><div class="group relative" @click="toggleDialog">
                <Icon name="mdi:eye-outline" class="text-2xl text-darkBlue" />
                <span class="tooltip">Voir Documents</span>
              </div></a
            >

            <div class="group relative" @click="deleteDoc(doc.uuid)">
              <Icon name="ic:outline-delete" class="text-2xl text-darkBlue" />
              <span class="tooltip">Supprimer</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from "~/stores/admin";

const adminStore = useAdminStore();
const props = defineProps({
  studentDetails: Object,
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

const deleteDoc = async (uuid) => {
  await adminStore.deleteDocument(uuid);
  await adminStore.getStudentDetails(props.studentDetails.uuid);
};
</script>
