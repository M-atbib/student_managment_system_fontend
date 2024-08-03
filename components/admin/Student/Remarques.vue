<template>
  <div>
    <div class="flex items-center justify-between mb-4 lg:mb-8">
      <h1>Remarques</h1>
    </div>

    <div>
      <ul class="flex items-start justify-start gap-5 lg:gap-12 flex-wrap">
        <li
          v-for="(remarque, index) in props.studentDetails.remarques"
          :key="index"
          class="borders shadow-sm w-full lg:w-fit p-4"
        >
          <h3>
            Remarque:
            <span class="text-black highlight">{{ remarque.text }}</span>
          </h3>
          <p class="cursor-pointer my-2">
            Date:
            <span class="highlight">{{ formatDate(remarque.updated_at) }}</span>
          </p>

          <div class="flex items-center justify-end gap-2">
            <div
              class="group relative curso-pointer"
              @click="deleteAction(remarque.uuid)"
            >
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
import { ref } from "vue";
import { useAdminStore } from "~/stores/admin";

const adminStore = useAdminStore();
const props = defineProps({
  studentDetails: Object,
});

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("fr-FR", options);
};

const deleteAction = async (uuid) => {
  await adminStore.deleteRemark(uuid, props.studentDetails.uuid);
  await adminStore.getStudentDetails(props.studentDetails.uuid);
};
</script>
