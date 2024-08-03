<template>
  <div>
    <h1>Indicateurs Clés de Performance (KPIs)</h1>
    <div class="flex items-start justify-start gap-5 lg:gap-8 flex-wrap mt-5">
      <div
        v-for="(kpi, index) in kpis"
        :key="index"
        class="borders p-5 min-w-[30ch] shadow"
      >
        <h3>{{ kpi.title }}</h3>
        <p class="text-xl lg:text-2xl text-darkBlue font-bold text-right mt-3 capitalize">
          {{ kpi.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  kpis: Object,
});

const kpis = ref([
  {
    title: `Revenu attendu (${props.kpis.school_year})`,
    value: `${props.kpis.income_year} DH`,
  },
  {
    title: "Nombre total d'étudiants",
    value: `${props.kpis.students_count} étudiants`,
  },
  {
    title: "Argent reçu jusqu'à présent",
    value: `${props.kpis.current_money} DH`,
  },
  {
    title: "Taux d'inscription",
    value: `${props.kpis.taux_inscription?.toFixed(2)} %`,
  },
]);
</script>
