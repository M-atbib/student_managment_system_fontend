<template>
  <div>
    <button @click="toggleDialog" class="w-fit lg:w-[20ch]">
      Publier Annonce
    </button>

    <div v-if="showDialog" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity" @click="toggleDialog">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          class="bg-white rounded-md overflow-hidden shadow-md transform transition-all my-28 max-w-[330px] lg:max-w-[650px] w-full p-5"
        >
          <Icon
            name="ci:close-md"
            @click="toggleDialog"
            class="absolute right-2 top-2 text-xl cursor-pointer"
          />

          <div>
            <form @submit.prevent="submitForm">
              <h2>Publier Annonce</h2>
              <div>
                <label for="date">Duée de validité de cette annonce</label>
                <input
                  v-model="annonceData.date"
                  type="date"
                  name="date"
                  id="date"
                />
                <p v-if="dateError" class="text-red-500">{{ dateError }}</p>
              </div>

              <textarea
                v-model="annonceData.text"
                name="annonce"
                id="annonce"
                rows="10"
                placeholder="Ajouter Annonce"
                class="w-full p-2 resize-none my-4 outline-none border border-lavender rounded-md"
              ></textarea>
              <p v-if="textError" class="text-red-500">{{ textError }}</p>
              <button type="submit" class="float-right">Publier</button>
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
import { useAppStore } from "@/stores";

const adminStore = useAdminStore();
const appStore = useAppStore();
const showDialog = ref(false);
const annonceData = ref({});
const dateError = ref("");
const textError = ref("");

const toggleDialog = () => {
  showDialog.value = !showDialog.value;
};

const submitForm = async () => {
  dateError.value = annonceData.value.date ? "" : "La date est requise";
  textError.value = annonceData.value.text ? "" : "Le texte est requis";

  if (dateError.value || textError.value) {
    return;
  }

  await adminStore.createAnnonce(
    annonceData.value.text,
    annonceData.value.date,
    appStore.roles[0],
    localStorage.getItem("etab_uuid")
  );
  annonceData.value = {}; // Clear the form fields after submission
  toggleDialog();
};
</script>
