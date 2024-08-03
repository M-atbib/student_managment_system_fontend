<template>
  <div class="borders p-5 mb-8 shadow-sm">
    <div class="flex flex-col lg:flex-row gap-10 justify-between ">
      <ul>
        <h3>Info Personel</h3>
        <li
          v-for="info in personalInfo"
          :key="info.name"
          class="mt-3 text-sm lg:text-base text-charcoal"
        >
          {{ info.name }}:
          <span class="highlight text-black">{{ info.value || "-" }}</span>
        </li>
      </ul>

      <ul class="mb-1">
        <h3>Info Professionel</h3>
        <li
          v-for="info in professionalInfo"
          :key="info.name"
          class="mt-3 text-sm lg:text-base text-charcoal"
        >
          {{ info.name }}:
          <span class="highlight text-black">{{ info.value || "-" }}</span>
        </li>
      </ul>
      <ul class="mb-1">
        <h3>Info de Contact</h3>
        <li
          v-for="info in contactInfo"
          :key="info.name"
          class="mt-3 text-sm lg:text-base text-charcoal"
        >
          {{ info.name }}:
          <span class="highlight text-black">{{ info.value || "-" }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  studentInfo: Object,
});

const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

const personalInfo = [
  { name: "Numero d'inscription", value: props.studentInfo.inscription_number },
  { name: "CIN", value: props.studentInfo.CIN },
  { name: "ID Massar", value: props.studentInfo.id_massar },
  { name: "Nom Complet", value: props.studentInfo.full_name },
  {
    name: "Date de Naissance",
    value: formatDate(props.studentInfo.birth_date),
  },
  { name: "Lieu de Naissance", value: props.studentInfo.birth_place },
  { name: "Genre", value: props.studentInfo.gender },
  { name: "Niveau Scolaire", value: props.studentInfo.school_level },
];

const contactInfo = [
  { name: "Numero Telephone Etudiant", value: props.studentInfo.phone_number },
  { name: "Email", value: props.studentInfo.email },
  {
    name: "Nature de Responsable",
    value: props.studentInfo.nature_responsable,
  },
  {
    name: "N° Tel Responsable",
    value: props.studentInfo.num_tel_responsable,
  },
  { name: "Adress", value: props.studentInfo.address },
];

const professionalInfo = [
  { name: "Duree de Formation", value: props.studentInfo.training_duration },
  { name: "Sector", value: props.studentInfo.sector },
  {
    name: "Filières de Formation ",
    value: props.studentInfo.filières_formation,
  },
  { name: "Niveau de Formation", value: props.studentInfo.training_level },
  { name: "Group", value: props.studentInfo.group[0].name },
  { name: "Date Debut", value: formatDate(props.studentInfo.date_start_at) },
  { name: "Date Fin", value: formatDate(props.studentInfo.date_fin_at) },
];
</script>
