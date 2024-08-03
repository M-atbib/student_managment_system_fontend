<template>
  <div>
    <div class="group relative" @click="getStudentByGroup">
      <Icon name="mdi:eye-outline" class="text-2xl text-darkBlue" />
      <span class="tooltip">Voir List Etudiant</span>
    </div>

    <div v-if="showDialog" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity" @click="toggleDialog">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          class="bg-white rounded-md overflow-hidden shadow-md transform transition-all mt-12 lg:mb-0 max-w-[330px] lg:max-w-[720px] w-full p-5"
        >
          <Icon
            name="ci:close-md"
            @click="toggleDialog"
            class="absolute right-2 top-2 text-xl cursor-pointer"
          />

          <div>
            <h2>List des Etudiant du Group:</h2>
            <ul class="mt-5">
              <li
                v-for="(student, index) in adminStore.studentTable.data"
                :key="index"
                class="mb-3 border-b border-lavender last:border-none pb-3"
              >
                <span class="font-bold">{{ student.inscription_number }}</span>
                - {{ student.full_name }}
              </li>
            </ul>
            <p v-if="!adminStore.studentTable.data.length">No students found in this group.</p>

            <template v-if="adminStore.studentTable && adminStore.studentTable.meta">
              <div class="flex items-center justify-end gap-1 mt-8">
                <a
                  v-for="(link, index) in adminStore.studentTable.meta.links"
                  :href="link.url"
                  @click.prevent="adminStore.paginate(link.url)"
                  :key="index"
                  class="bg-darkBlue text-lavender py-2 px-3.5 rounded-full text-sm lg:text-base hover:font-semibold hover:bg-lavender hover:text-charcoal ease-in-out duration-300"
                >
                  <template v-if="link.label === 'pagination.previous'">
                    <Icon name="f7:chevron-left-2" />
                  </template>
                  <template v-else-if="link.label === 'pagination.next'">
                    <Icon name="f7:chevron-right-2" />
                  </template>
                  <template v-else>
                    {{ link.label }}
                  </template>
                </a>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAdminStore } from "~/stores/admin";

const showDialog = ref(false);
const adminStore = useAdminStore();

const toggleDialog = () => {
  showDialog.value = !showDialog.value;
};

const props = defineProps({
  groupUuid: String,
});

const getStudentByGroup = async () => {
  const selectedFilters = { group_uuid: props.groupUuid };
  await adminStore.searchStudents(
    localStorage.getItem("etab_uuid"),
    "",
    selectedFilters
  );
  toggleDialog();
};
</script>
