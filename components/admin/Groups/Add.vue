<template>
  <div>
    <button
      v-if="props.method === 'POST'"
      @click="toggleDialog"
      class="w-fit lg:w-[20ch]"
    >
      Ajouter Group
    </button>

    <div v-else class="group relative" @click="toggleDialog">
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
              <div class="my-5">
                <label for="name">Nom de Group</label>
                <input
                  v-model="name"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Entrer Nom de Group"
                />
                <p v-if="nameError" class="text-red-500 mt-1 ml-2">
                  {{ nameError }}
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
const name = ref("");
const nameError = ref("");

const props = defineProps({
  method: { type: String, default: "POST" },
  title: { type: String, default: "Ajouter Group" },
  action: { type: String, default: "Ajouter" },
  group: { type: Object, default: () => ({}) },
});

const toggleDialog = () => {
  showDialog.value = !showDialog.value;
};

watchEffect(() => {
  if (props.method === "PUT" && props.group) {
    name.value = props.group.name;
  } else {
    name.value = "";
  }
});

const submitForm = async () => {
  nameError.value = name.value ? "" : "Le titre est requis";

  if (nameError.value) {
    return;
  }

  toggleDialog();

  try {
    let formData = new FormData();
    formData.append("name", name.value);
    formData.append("etab_uuid", localStorage.getItem("etab_uuid"));

    if (props.method === "POST") {
      await adminStore.createGroup(formData);
      name.value = "";
    } else if (props.method === "PUT") {
      await adminStore.updateGroup(
        props.group.uuid,
        name.value,
        localStorage.getItem("etab_uuid")
      );
    }

    await adminStore.getGroups(localStorage.getItem("etab_uuid")); // Refresh the timetable list
  } catch (error) {
    console.error(error);
  }
};
</script>
