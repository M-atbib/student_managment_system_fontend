<template>
  <div>
    <button @click="toggleDialog" class="w-fit lg:w-[20ch]">
      Noter Presence
    </button>

    <div v-if="showDialog" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity" @click="toggleDialog">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          class="bg-white rounded-md overflow-hidden shadow-md transform transition-all mt-24 max-w-[330px] lg:max-w-[420px] w-full p-5"
        >
          <Icon
            name="ci:close-md"
            @click="toggleDialog"
            class="absolute right-2 top-2 text-xl cursor-pointer"
          />

          <div>
            <form @submit.prevent="submitForm">
              <h2>Noter Presence</h2>
              <div class="flex flex-col gap-1 w-full lg:w-[35ch] mt-5 mb-3">
                <label for="type" class="font-medium ml-1">Type:</label>
                <select v-model="type" name="type" id="type">
                  <option disabled>Type</option>
                  <option value="retard">Retard</option>
                  <option value="absence">Absence</option>
                </select>
              </div>

              <div class="flex gap-3 justify-center mb-3">
                <label for="justifier" class="font-medium ml-1"
                  >Justifier:</label
                >
                <input
                  v-model="justifier"
                  type="checkbox"
                  name="justifier"
                  id="justifier"
                  class="w-fit"
                />
              </div>

              <div class="flex flex-col gap-1 w-full lg:w-[35ch] mb-3">
                <label for="jsutification" class="font-medium ml-1"
                  >Jusification:</label
                >
                <input
                  v-model="jsutification"
                  type="text"
                  name="jsutification"
                  id="jsutification"
                />
              </div>

              <div class="flex flex-col gap-1 w-full lg:w-[35ch] mb-3">
                <label for="date" class="font-medium ml-1">Date:</label>
                <input v-model="date" type="date" name="date" id="date" />
              </div>

              <div class="flex flex-col gap-1 w-full lg:w-[35ch] mb-3">
                <label for="seance" class="font-medium ml-1">Seance:</label>
                <input
                  v-model="seance"
                  type="text"
                  name="seance"
                  id="seance"
                  placeholder="Enter Seance"
                />
              </div>

              <div class="flex flex-col gap-1 w-full lg:w-[35ch]">
                <label for="student" class="font-medium ml-1">Etudiant:</label>
                <multiselect
                  v-model="selectedStudents"
                  :options="transformData(props.students.data)"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  placeholder="Selectionner Etudiant"
                  label="name"
                  track-by="name"
                  :preselect-first="false"
                  class="w-full border border-gray-300 rounded-md p-2 cursor-pointer max-h-[150px] overflow-auto"
                >
                  <template #selection="{ values, isOpen }">
                    <span
                      class="multiselect__single"
                      v-if="values.length"
                      v-show="!isOpen"
                      >Vous avez selectionner {{ values.length }} etudiant
                    </span>
                  </template>
                </multiselect>

                <div class="w-full flex items-center flex-wrap gap-2 mt-2">
                  <span
                    v-for="student in selectedStudents"
                    :key="student.name"
                    class="tag bg-blue-500 text-white px-2 py-1 rounded"
                    >{{ student.name }}</span
                  >
                </div>
              </div>

              <button type="submit" class="float-right mt-5">Noter</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Multiselect from "vue-multiselect";
import { useAdminStore } from "~/stores/admin";

const adminStore = useAdminStore();
const showDialog = ref(false);
const selectedStudents = ref([]);
const type = ref("");
const justifier = ref("");
const jsutification = ref("");
const date = ref("");
const seance = ref("");
const props = defineProps({
  students: Array,
});

const transformData = (data) => {
  if (props.students) {
    if (Array.isArray(data)) {
      return data.map((student) => ({
        name: student.full_name,
        uuid: student.uuid,
      }));
    } else {
      return [
        {
          name: data.full_name,
          uuid: data.uuid,
        },
      ];
    }
  }
};

const toggleDialog = () => {
  showDialog.value = !showDialog.value;
};

const submitForm = async () => {
  const studentUuids = selectedStudents.value.map((student) => student.uuid);
  await adminStore.createPresence(
    seance.value,
    type.value,
    justifier.value,
    jsutification.value,
    date.value,
    studentUuids
  );
  toggleDialog();
};
</script>
