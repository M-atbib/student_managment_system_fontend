<template>
  <div>
    <button @click="toggleDialog" class="w-fit lg:w-[20ch]">
      Ajouter Etudiant
    </button>

    <div v-if="showDialog" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity" @click="toggleDialog">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          class="bg-white rounded-md overflow-hidden shadow-md transform transition-all my-8 lg:mb-0 max-w-[330px] lg:max-w-[720px] w-full p-5"
        >
          <Icon
            name="ci:close-md"
            @click="toggleDialog"
            class="absolute right-2 top-2 text-xl cursor-pointer"
          />

          <div>
            <!-- Tabs -->
            <ul class="flex border-b gap-3 lg:gap-5 mb-4">
              <li
                :class="['cursor-pointer', tab === 1 ? 'font-semibold' : '']"
                @click="tab = 1"
              >
                Info Personel
              </li>
              <li
                :class="['cursor-pointer', tab === 2 ? 'font-semibold' : '']"
                @click="tab = 2"
              >
                Info Professionnel
              </li>
            </ul>

            <!-- Form 1 -->
            <div v-if="tab === 1">
              <form @submit.prevent="tab = 2">
                <h2>Info Personel</h2>

                <!-- Inputs for Form1 -->
                <div
                  class="flex items-center flex-wrap gap-2 lg:gap-4 mt-3 mb-5"
                >
                  <div
                    class="admin-add-input"
                    v-for="(input, index) in personalInfo"
                    :key="index"
                  >
                    <label>{{ input.label }}</label>
                    <input
                      v-if="input.type !== 'file'"
                      v-model="studentData[input.name]"
                      :type="input.type"
                      :name="input.name"
                      :placeholder="input.placeholder"
                      :maxlength="255"
                    />
                    <input
                      v-else
                      :type="input.type"
                      :name="input.name"
                      :placeholder="input.placeholder"
                      :maxlength="255"
                      @change="handleFileUpload($event)"
                      accept=".jpg,.jpeg,.png"
                    />
                  </div>

                  <div class="admin-add-input">
                    <label>Nom de Responsable</label>
                    <input
                      v-model="newResponsable.nom"
                      type="text"
                      name="nom"
                      placeholder="Entrez la nom complet du responsable"
                    />
                  </div>

                  <div class="admin-add-input">
                    <label>Numero Telephone Responsable</label>
                    <input
                      v-model="newResponsable.num"
                      type="text"
                      name="num"
                      placeholder="Entrez le num du responsable"
                      @change="addResponsable"
                    />
                  </div>
                </div>

                <div class="flex flex-wrap gap-3">
                  <div
                    v-for="(responsable, index) in studentData.responsables"
                    :key="index"
                    class="w-fit bg-lightBlue py-1 px-2 rounded text-sm flex items-center"
                  >
                    <span>{{ responsable.nom }} - {{ responsable.num }}</span>
                    <Icon
                      name="ci:close-md"
                      class="text-lg"
                      @click="removeResponsable(index)"
                    />
                  </div>
                </div>

                <button type="submit" class="float-right">Suivant</button>
              </form>
            </div>

            <!-- Form 2 -->
            <div v-if="tab === 2">
              <form @submit.prevent="submitForm">
                <h2>Info Professionnel</h2>

                <!-- Inputs for Form2 -->
                <div
                  class="flex items-center flex-wrap gap-2 lg:gap-4 mt-3 mb-5"
                >
                  <div
                    class="admin-add-input"
                    v-for="(input, index) in professionalInfo"
                    :key="index"
                  >
                    <label>{{ input.label }}</label>
                    <input
                      v-if="
                        input.name !== 'group_uuid' &&
                        input.name !== 'training_level'
                      "
                      v-model="studentData[input.name]"
                      :type="input.type"
                      :name="input.name"
                      :placeholder="input.placeholder"
                      :maxlength="255"
                    />
                    <select
                      v-if="input.name === 'training_level'"
                      v-model="studentData[input.name]"
                      class="w-full"
                    >
                      <option value="spécialisation">Spécialisation</option>
                      <option value="qualification">Qualification</option>
                      <option value="technicien">Technicien</option>
                    </select>
                    <select
                      v-if="input.name === 'group_uuid'"
                      v-model="studentData[input.name]"
                      class="w-full"
                    >
                      <option
                        v-for="group in adminStore.groups"
                        :value="group.uuid"
                        :key="group.uuid"
                      >
                        {{ group.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <button type="submit" class="float-right">Soumettre</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useAdminStore } from "@/stores/admin";

const adminStore = useAdminStore();
const showDialog = ref(false);
const tab = ref(1);
const studentData = ref({ status: "active", responsables: [] });
const newResponsable = ref({
  nom: "",
  num: "",
});
const errors = ref({});
const route = useRoute();

// OnMounted to fetch the groups
onMounted(async () => {
  await adminStore.getGroups(localStorage.getItem("etab_uuid"));
});

const toggleDialog = () => {
  showDialog.value = !showDialog.value;
  if (!showDialog.value) {
    studentData.value = { status: "active", responsables: [] };
    errors.value = {};
    tab.value = 1;
  }
};

// Function to calculate the date_fin_at
const calculateEndDate = () => {
  if (
    !studentData.value.date_start_at ||
    !studentData.value.training_duration
  ) {
    return;
  }
  const startDate = new Date(studentData.value.date_start_at);
  let duration = 0;
  if (studentData.value.training_duration === "1ans") {
    duration = 12;
  } else if (studentData.value.training_duration === "6month") {
    duration = 6;
  }
  startDate.setMonth(startDate.getMonth() + duration);
  studentData.value.date_fin_at = startDate.toISOString().split("T")[0];
};

// function to calculate the annual_amount
const calculateAnnualAmount = () => {
  if (
    !studentData.value.monthly_amount ||
    !studentData.value.training_duration
  ) {
    return;
  }
  const monthlyAmount = parseInt(studentData.value.monthly_amount);
  let duration = 0;
  if (studentData.value.training_duration === "1ans") {
    duration = 12;
  } else if (studentData.value.training_duration === "6mois") {
    duration = 6;
  }
  studentData.value.annual_amount = (monthlyAmount * duration).toString();
};

// Function to upload the file
const handleFileUpload = async ($event) => {
  errors.value["photo"] = "";
  const file = $event.target.files[0];
  if (!file) {
    return;
  }
  const fileSize = file.size / 1024 / 1024; // in MB
  if (fileSize > 4) {
    errors.value["photo"] = "La taille du fichier ne doit pas dépasser 4MB";
  } else {
    studentData.value.photo = file;
  }
};

const addResponsable = () => {
  if (newResponsable.value.nom && newResponsable.value.num) {
    if (!studentData.value.responsables) {
      studentData.value.responsables = [];
    }
    studentData.value.responsables.push({ ...newResponsable.value });
    newResponsable.value = { nom: "", num: "" };
  }
};

const removeResponsable = (index) => {
  studentData.value.responsables.splice(index, 1);
};

// Watch effect to put inscription_number, sector, annual_amount in there inputs
watchEffect(() => {
  if (typeof window !== "undefined") {
    studentData.value.sector = localStorage.getItem("user_role");
  }
  calculateAnnualAmount();
});

// Function to submit the form
const submitForm = async () => {
  try {
    calculateEndDate();
    calculateAnnualAmount();

    const formData = new FormData();
    for (const key in studentData.value) {
      formData.append(key, studentData.value[key]);
    }

    await adminStore.createStudent(formData, localStorage.getItem("etab_uuid"));
    toggleDialog();

    const uuid = route.params.id;
    await adminStore.getAllStudents(uuid);
  } catch (error) {
    errors.value = error.response.data.errors;
  }
};

const personalInfo = [
  // {
  //   label: "Numero d'inscription",
  //   type: "text",
  //   name: "inscription_number",
  //   placeholder: "Entrez le numéro d'inscription",
  // },
  { label: "CIN", type: "text", name: "CIN", placeholder: "Entrez le CIN" },
  {
    label: "ID Massar",
    type: "text",
    name: "id_massar",
    placeholder: "Entrez le code massar",
  },
  {
    label: "Nom Complet",
    type: "text",
    name: "full_name",
    placeholder: "Entrez le nom complet",
  },
  {
    label: "Date de Naissance",
    type: "date",
    name: "birth_date",
    placeholder: "Entrez la date de naissance",
  },
  {
    label: "Lieu de Naissance",
    type: "text",
    name: "birth_place",
    placeholder: "Entrez le lieu de naissance",
  },
  {
    label: "Genre",
    type: "text",
    name: "gender",
    placeholder: "Entrez le Genre",
  },
  {
    label: "Niveau Scolaire",
    type: "text",
    name: "school_level",
    placeholder: "Entrez le niveau scolaire",
  },
  {
    label: "Numero Telephone Etudiant",
    type: "tel",
    name: "phone_number",
    placeholder: "Entrez le numéro de téléphone",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Entrez l'email",
  },
  {
    label: "Address",
    type: "address",
    name: "address",
    placeholder: "Entrez address",
  },
  {
    label: "Photo Etudiant",
    type: "file",
    name: "photo",
    placeholder: "Choisissez une photo",
  },
];

const professionalInfo = [
  {
    label: "Duree de Formation",
    type: "text",
    name: "training_duration",
    placeholder: "Entrez durée du formation(1ans ou 6mois)",
  },
  {
    label: "Secteur",
    type: "text",
    name: "sector",
    placeholder: "Entrez le secteur",
  },
  {
    label: "Filières de Formation ",
    type: "text",
    name: "filières_formation",
    placeholder: "Entrez filières de formation ",
  },
  {
    label: "Niveau de Formation",
    type: "select",
    name: "training_level",
    placeholder: "Entrez le niveau de formation",
  },
  {
    label: "Group",
    type: "text",
    name: "group_uuid",
    placeholder: "Entrez le group",
  },
  {
    label: "Date Debut",
    type: "date",
    name: "date_start_at",
    placeholder: "Entrez le date debut formation",
  },
  {
    label: "Montant Mensuel",
    type: "text",
    name: "monthly_amount",
    placeholder: "Entrez le montant mensuel",
  },
  {
    label: "Frais d'Inscription",
    type: "text",
    name: "registration_fee",
    placeholder: "Entrez les frais d'inscription",
  },
  {
    label: "Produit",
    type: "text",
    name: "product",
    placeholder: "Entrez le produit",
  },
  {
    label: "Frais Diplôme",
    type: "text",
    name: "frais_diplôme",
    placeholder: "Entrez le Frais Diplôme",
  },
  {
    label: "Montant Annual",
    type: "text",
    name: "annual_amount",
    placeholder: "Entrez le montant annuel",
  },
];
</script>
