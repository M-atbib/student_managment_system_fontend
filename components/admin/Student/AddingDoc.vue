<template>
  <div>
    <button
      v-if="props.method === 'POST'"
      @click="toggleDialog"
      class="w-[25ch]"
    >
      {{ title }}
    </button>

    <div v-else class="group relative" @click="toggleDialog">
      <Icon name="tabler:edit" class="text-2xl" />
      <span class="tooltip">Mettre à Jour</span>
    </div>

    <div v-if="showDialog" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity" @click="toggleDialog">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          class="bg-white rounded-md overflow-hidden shadow-md transform transition-all mt-28 max-w-[330px] lg:max-w-[600px] w-full p-5"
        >
          <Icon
            name="ci:close-md"
            @click="toggleDialog"
            class="absolute right-2 top-2 text-xl cursor-pointer"
          />

          <div>
            <h1>{{ props.title }}</h1>
            <form @submit.prevent="submitForm">
              <!-- <div class="mt-5 mb-4">
                <label for="name">Titre Document</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Entrer Titre Emploi du Temps"
                  v-model="name"
                />
              </div> -->

              <div class="mb-5">
                <label for="schedule">Document</label>
                <input
                  type="file"
                  name="schedule"
                  id="schedule"
                  @change="handleFileUpload"
                  accept=".pdf,.doc,.docx"
                />
              </div>
              <p v-if="fileSizeError" class="text-red-500 mt-1 ml-2">
                {{ fileSizeError }}
              </p>

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
import { ref } from "vue";
import { useAdminStore } from "@/stores/admin";

const props = defineProps({
  method: { type: String, default: "POST" },
  title: { type: String, default: "Ajouter Document" },
  action: { type: String, default: "Ajouter" },
  studentUuid: { type: String, required: true },
});

const adminStore = useAdminStore();
const showDialog = ref(false);
const file = ref(null);
const fileSizeError = ref("");

const toggleDialog = () => {
  showDialog.value = !showDialog.value;
};

const handleFileUpload = (event) => {
  fileSizeError.value = "";
  file.value = event.target.files[0];
  if (file.value.size / 1024 / 1024 > 4) {
    fileSizeError.value = "La taille du fichier ne doit pas dépasser 4MB";
  } else {
    fileSizeError.value = "";
  }
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append("name_file", file.value);
  formData.append("student_uuid", props.studentUuid);

  await adminStore.createDocument(formData);
  await adminStore.getStudentDetails(props.studentUuid);
  toggleDialog();
};
</script>
