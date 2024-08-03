<template>
  <div>
    <form @submit.prevent="searchStudents">
      <div class="flex gap-2 lg:gap-4">
        <div class="w-[100%] lg:w-[90%] relative">
          <input
            v-model="searchName"
            type="search"
            name="search"
            id="search"
            placeholder="Rechercher par Nom"
          />
          <Icon
            name="iconamoon:search-light"
            class="absolute top-2.5 right-3"
          />
        </div>
        <button type="submit" class="py-1.5">Rechercher</button>
      </div>

      <div
        class="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-5 mt-5"
      >
        <div v-for="(filter, index) in filters" :key="index">
          <select
            :id="filter.title"
            class="w-full lg:w-[20ch] text-sm lg:text-base"
            v-model="filter.selected"
          >
            <option disabled value="">{{ filter.title }}</option>
            <option
              v-for="(option, index) in filter.options"
              :key="index"
              :value="option.value"
            >
              {{ option.option }}
            </option>
          </select>
        </div>

        <div class="group relative" @click="removeFilter">
          <Icon name="mdi:filter-off-outline" class="text-2xl" />
          <span class="tooltip">Supprimer Filtre</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAdminStore } from "~/stores/admin";
import { useRoute } from "vue-router";
import { ref } from "vue";

const adminStore = useAdminStore();
// ?name=John&sector=coiffure&training_level=Level%201&status=active&date_start_at=2024-06-08

const filters = [
  {
    title: "Niveau de Formation",
    search: "training_level",
    options: [
      { value: "", option: "Vide" },
      { value: "qualification", option: "Qualification" },
      { value: "specialisation", option: "Spécialisation" },
      { value: "technicien", option: "Technicien" },
    ],
    selected: "",
  },
  {
    title: "Année Scolaire",
    search: "date_start_at",
    options: [
      { value: "", option: "Vide" },
      { value: "2023/2024", option: "2023/2024" },
      { value: "2022/2023", option: "2022/2023" },
    ],
    selected: "",
  },
];

const searchName = ref("");
const route = useRoute();

const searchStudents = async () => {
  const uuid = route.params.id;
  const selectedFilters = filters.reduce((acc, filter) => {
    if (filter.selected) acc[filter.search] = filter.selected;
    return acc;
  }, {});
  await adminStore.searchStudents(uuid, searchName.value, selectedFilters);
};

const removeFilter = async () => {
  const uuid = route.params.id;
  await adminStore.getAllStudents(uuid);
};
</script>
