<template>
  <div>
    <div class="group relative" @click="toggleDialog">
      <Icon name="tabler:message" class="text-xl text-darkBlue lg:text-2xl" />
      <span class="tooltip">Remarque</span>
    </div>

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
              <h2>Laisser Remarque au Parent</h2>
              <textarea
                v-model="remarqueText"
                rows="10"
                placeholder="Laisser une remarque au parent"
                class="w-full p-2 resize-none my-4 outline-none border border-lavender rounded-md"
              ></textarea>
              <button
                type="submit"
                class="float-right"
                @submit.prevent="submitForm"
              >
                Envoyer
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
import { useAdminStore } from "~/stores/admin";
import { useAppStore } from "~/stores/";

const adminStore = useAdminStore();
const appStore = useAppStore();

const showDialog = ref(false);
const remarqueText = ref("");
const props = defineProps({
  studentUuid: String,
});

const toggleDialog = () => {
  showDialog.value = !showDialog.value;
};

const submitForm = async () => {
  await adminStore.createRemarque(remarqueText.value, props.studentUuid);
  showDialog.value = false;
};
</script>
