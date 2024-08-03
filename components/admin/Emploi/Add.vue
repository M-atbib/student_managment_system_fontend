<template>
  <div>
    <button
      v-if="props.method === 'POST'"
      @click="toggleDialog"
      class="w-fit lg:w-[25ch]"
    >
      Ajouter Emploi du Temps
    </button>

    <div v-else class="group relative cursor-pointer" @click="toggleDialog">
      <Icon name="tabler:edit" class="text-2xl text-darkBlue" />
      <span class="tooltip">Mettre à Jour</span>
    </div>

    <div v-if="showDialog" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity" @click="toggleDialog">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          class="bg-white rounded-md overflow-hidden shadow-md transform transition-all mt-28 lg:mb-0 max-w-[330px] lg:max-w-[600px] w-full p-5"
        >
          <Icon
            name="ci:close-md"
            @click="toggleDialog"
            class="absolute right-2 top-2 text-xl cursor-pointer"
          />

          <div>
            <h1>{{ props.title }}</h1>
            <form @submit.prevent="submitForm">
              <div class="mt-5 mb-4">
                <label for="name">Titre Emploi du Temps</label>
                <input
                  v-model="title"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Entrer Titre Emploi du Temps"
                  maxlength="255"
                />
                <p v-if="titleError" class="text-red-500 mt-1 ml-2">
                  {{ titleError }}
                </p>
              </div>

              <div class="flex flex-col mb-4">
                <label for="group">Groupe Concerné</label>
                <select v-model="group" name="group" id="group">
                  <option disabled>Groupe Concerné</option>
                  <option
                    v-for="(grp, index) in adminStore.groups"
                    :key="index"
                    :value="grp.uuid"
                  >
                    {{ grp.name }}
                  </option>
                </select>
                <p v-if="groupError" class="text-red-500 mt-1 ml-2">
                  {{ groupError }}
                </p>
              </div>

              <div class="mb-5">
                <label for="schedule">Emploi du Temps</label>
                <input
                  type="file"
                  name="name_file"
                  id="schedule"
                  @change="handleFileUpload"
                  maxlength="255"
                  accept=".pdf"
                />
                <p v-if="scheduleError" class="text-red-500 mt-1 ml-2">
                  {{ scheduleError }}
                </p>
                <p v-if="fileSizeError" class="text-red-500 mt-1 ml-2">
                  {{ fileSizeError }}
                </p>
              </div>

              <button type="submit" class="float-right">
                {{ props.action }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useAdminStore } from "~/stores/admin";

const adminStore = useAdminStore();
const showDialog = ref(false);
const title = ref("");
const group = ref("");
const schedule = ref(null);
const titleError = ref("");
const groupError = ref("");
const scheduleError = ref("");
const fileSizeError = ref("");

const props = defineProps({
  method: { type: String, default: "POST" },
  title: { type: String, default: "Ajouter Emploi" },
  action: { type: String, default: "Ajouter" },
  timetable: { type: Object, default: () => ({}) },
});

onMounted(async () => {
  await adminStore.getGroups(localStorage.getItem("etab_uuid"));
});

watchEffect(() => {
  if (props.method === "PUT" && props.timetable) {
    title.value = props.timetable.title;
    group.value = props.timetable.group.uuid;
  } else {
    title.value = "";
    group.value = "";
    schedule.value = null;
  }
});

const toggleDialog = () => {
  showDialog.value = !showDialog.value;
};

const handleFileUpload = (event) => {
  fileSizeError.value = "";
  schedule.value = event.target.files[0];
  if (schedule.value.size / 1024 / 1024 > 4) {
    fileSizeError.value = "La taille du fichier ne doit pas dépasser 4MB";
  } else {
    fileSizeError.value = "";
  }
};

const submitForm = async () => {
  try {
    let formData = new FormData();
    formData.append("title", title.value);
    formData.append("group_uuid", group.value);
    formData.append("name_file", schedule.value);

    if (props.method === "POST") {
      titleError.value = title.value ? "" : "Le titre est requis";
      groupError.value = group.value ? "" : "Le groupe est requis";
      scheduleError.value = schedule.value ? "" : "L'horaire est requis";

      if (
        titleError.value ||
        groupError.value ||
        scheduleError.value ||
        fileSizeError.value
      ) {
        return;
      }

      await adminStore.createTimetable(formData);
      title.value = "";
      group.value = "";
      schedule.value = null;
    } else if (props.method === "PUT") {
      if (schedule && schedule.value) {
        await adminStore.uploadFile(
          "timetable",
          props.timetable.uuid,
          schedule.value
        );
      }

      await adminStore.updateTimetable(
        props.timetable.uuid,
        title.value,
        group.value
      );
    }

    toggleDialog();

    await adminStore.getTimetable(localStorage.getItem("etab_uuid")); // Refresh the timetable list
  } catch (error) {
    console.error(error);
  }
};
</script>
