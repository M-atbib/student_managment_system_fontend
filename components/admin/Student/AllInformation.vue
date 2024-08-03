<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="w-[17%] mx-auto">
        <img
          :src="`http://127.0.0.1:8000/storage/${props.studentDetails.photo}`"
          alt=""
          style="border-radius: 50%"
          class="borders text-center shadow-sm"
        />
      </div>

      <div class="flex flex-col lg:flex-row gap-5 lg:gap-16">
        <!-- Inputs for Form1 -->
        <div class="flex flex-col gap-5 w-full lg:w-[50%] my-6">
          <h2>Info Personel</h2>

          <div
            class="w-full"
            v-for="(input, index) in personalInfo"
            :key="index"
          >
            <label class="text-sm">{{ input.label }}</label>
            <input
              v-if="input.type !== 'file'"
              v-model="input.value"
              :type="input.type"
              :name="input.name"
              :placeholder="input.placeholder"
              maxlength="255"
              :disabled="
                input.name === 'password' || input.name === 'inscription_number'
              "
            />
            <input
              v-else
              :type="input.type"
              :name="input.name"
              :placeholder="input.placeholder"
              :maxlength="255"
              @change="handleFileUpload"
              accept=".jpg,.jpeg,.png"
            />
          </div>
        </div>

        <!-- Inputs for Form2 -->
        <div class="flex flex-col gap-5 w-full lg:w-[50%] my-6">
          <h2>Info Professionnel</h2>

          <div
            class="w-full"
            v-for="(input, index) in professionalInfo"
            :key="index"
          >
            <label class="text-sm">{{ input.label }}</label>
            <input
              v-if="
                input.name !== 'group_uuid' &&
                input.name !== 'sector' &&
                input.name !== 'training_level'
              "
              :type="input.type"
              :name="input.name"
              :placeholder="input.placeholder"
              v-model="input.value"
              maxlength="255"
            />
            <input
              v-else-if="input.name === 'sector'"
              :type="input.type"
              :name="input.name"
              :placeholder="input.placeholder"
              v-model="input.value"
              disabled
              maxlength="255"
            />
            <select
              v-else-if="input.name === 'training_level'"
              v-model="input.value"
              class="w-full"
            >
              <option value="spécialisation">Spécialisation</option>
              <option value="qualification">Qualification</option>
              <option value="technicien">Technicien</option>
            </select>
            <select v-else v-model="input.value" class="w-full">
              <option
                v-for="(group, index) in adminStore.groups"
                :key="index"
                :value="group.uuid"
              >
                {{ group.name }}
              </option>
            </select>

            <p
              v-if="input.name === 'photo' && fileSizeError"
              class="text-red-500"
            >
              {{ fileSizeError }}
            </p>
          </div>
        </div>
      </div>

      <button type="submit" class="float-right">Mettre à Jour</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAdminStore } from "~/stores/admin";

const props = defineProps({
  studentDetails: Object,
});

console.log(props.studentDetails);

const adminStore = useAdminStore();
const submitAttempted = ref(false);
const fileSizeError = ref("");
const fileInput = ref(null);

onMounted(async () => {
  await adminStore.getGroups(localStorage.getItem("etab_uuid"));
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file.size / 1024 / 1024 > 4) {
    fileSizeError.value = "La taille du fichier ne doit pas dépasser 4MB";
  } else {
    fileSizeError.value = "";
    fileInput.value = personalInfo.find(
      (input) => input.type === "file" && input.name === "photo"
    );
    if (fileInput) {
      fileInput.value = file;
    }
  }
};

const submitForm = async () => {
  submitAttempted.value = true;

  if (fileInput.value) {
    await adminStore.uploadFile(
      "student",
      props.studentDetails.uuid,
      fileInput.value
    );
  }

  await adminStore.updateStudent(
    props.studentDetails.uuid,
    Object.fromEntries(
      [
        ...personalInfo,
        ...professionalInfo,
        { name: "status", value: "active" },
      ].map((input) => [input.name, input.value])
    )
  );

  await adminStore.getStudentDetails(props.studentDetails.uuid); // Refresh the timetable list
};

const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

const personalInfo = [
  {
    label: "Numero d'inscription",
    type: "text",
    name: "inscription_number",
    placeholder: "Entrez le numéro d'inscription",
    value: props.studentDetails.inscription_number,
  },
  {
    label: "CIN",
    type: "text",
    name: "CIN",
    placeholder: "Entrez le CIN",
    value: props.studentDetails.CIN,
  },
  {
    label: "ID Massar",
    type: "text",
    name: "id_massar",
    placeholder: "Entrez le code massar",
    value: props.studentDetails.id_massar,
  },
  {
    label: "Nom Complet",
    type: "text",
    name: "full_name",
    placeholder: "Entrez le nom complet",
    value: props.studentDetails.full_name,
  },
  {
    label: "Date de Naissance",
    type: "date",
    name: "birth_date",
    placeholder: "Entrez la date de naissance",
    value: formatDate(props.studentDetails.birth_date),
  },
  {
    label: "Lieu de Naissance",
    type: "text",
    name: "birth_place",
    placeholder: "Entrez le lieu de naissance",
    value: props.studentDetails.birth_place,
  },
  {
    label: "Genre",
    type: "text",
    name: "gender",
    placeholder: "Entrez le Genre",
    value: props.studentDetails.gender,
  },
  {
    label: "Niveau Scolaire",
    type: "text",
    name: "school_level",
    placeholder: "Entrez le niveau scolaire",
    value: props.studentDetails.school_level,
  },
  {
    label: "Numero Telephone Etudiant",
    type: "tel",
    name: "phone_number",
    placeholder: "Entrez le numéro de téléphone",
    value: props.studentDetails.phone_number,
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Entrez l'email",
    value: props.studentDetails.email,
  },
  ...(props.studentDetails.responsable
    ? props.studentDetails.responsable
        .map((responsable, index) => [
          {
            label: `Nom Responsable ${index + 1}`,
            type: "text",
            name: `responsable_nom_${index + 1}`,
            placeholder: "Entrez le nom du responsable",
            value: responsable.nom,
          },
          {
            label: `Numero Telephone Responsable ${index + 1}`,
            type: "text",
            name: `responsable_num_${index + 1}`,
            placeholder: "Entrez le num du responsable",
            value: responsable.num,
          },
        ])
        .flat()
    : [
        {
          label: `Nom Responsable`,
          type: "text",
          name: `responsable_nom`,
          placeholder: "Entrez le nom du responsable",
          value: "",
        },
        {
          label: `Numero Telephone Responsable`,
          type: "text",
          name: `responsable_num`,
          placeholder: "Entrez le num du responsable",
          value: "",
        },
      ]),
];

const professionalInfo = [
  {
    label: "Duree de Formation",
    type: "text",
    name: "training_duration",
    placeholder: "Entrez la durée de la formation",
    value: props.studentDetails.training_duration,
  },
  {
    label: "Secteur",
    type: "text",
    name: "sector",
    placeholder: "Entrez le secteur",
    value: props.studentDetails.sector,
  },
  {
    label: "Filières de Formation ",
    type: "text",
    name: "filières_formation",
    placeholder: "Entrez filières de formation ",
    value: props.studentDetails.filières_formation,
  },
  {
    label: "Niveau de Formation",
    type: "select",
    name: "training_level",
    placeholder: "Entrez le niveau de formation",
    value: props.studentDetails.training_level,
    options: ["spécialisation", "qualification", "technicien"],
  },
  {
    label: "Group",
    type: "text",
    name: "group_uuid",
    placeholder: "Entrez le group",
    value: props.studentDetails.group[0].uuid,
  },
  {
    label: "Date Debut",
    type: "date",
    name: "date_start_at",
    placeholder: "Entrez le date debut formation",
    value: formatDate(props.studentDetails.date_start_at),
  },
  {
    label: "Date Fin",
    type: "date",
    name: "date_fin_at",
    placeholder: "Entrez le date debut formation",
    value: formatDate(props.studentDetails.date_fin_at),
  },
  {
    label: "Montant Mensuel",
    type: "text",
    name: "monthly_amount",
    placeholder: "Entrez le montant mensuel",
    value: props.studentDetails.monthly_amount,
  },
  {
    label: "Frais d'Inscription",
    type: "text",
    name: "registration_fee",
    placeholder: "Entrez les frais d'inscription",
    value: props.studentDetails.registration_fee,
  },
  {
    label: "Produit",
    type: "text",
    name: "product",
    placeholder: "Entrez le produit",
    value: props.studentDetails.product,
  },
  {
    label: "Frais Diplôme",
    type: "text",
    name: "frais_diplôme",
    placeholder: "Entrez le Frais Diplôme",
    value: props.studentDetails.frais_diplôme,
  },
  {
    label: "Montant Annual",
    type: "text",
    name: "annual_amount",
    placeholder: "Entrez le montant annuel",
    value: props.studentDetails.annual_amount,
  },
  {
    label: "Photo Etudiant",
    type: "file",
    name: "photo",
    placeholder: "Choisissez une photo",
    value: "",
  },
];
</script>
