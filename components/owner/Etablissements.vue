<template>
  <div class="mt-8">
    <h1>Etablissements</h1>
    <div class="flex flex-wrap gap-5 lg:gap-8 mt-6 lg:mt-12">
      <div v-for="(etab, index) in etabs" :key="index">
        <NuxtLink
          :to="`/admin/${etab.branch_uuid}`"
          @click="storeEtabUuid(etab.branch_uuid)"
          class="block w-[90vw] lg:w-full borders py-7 px-5 text-center text-xl font-bold text-wrap lg:text-nowrap hover:bg-lightBlue text-darkBlue shadow"
        >
          {{ etab.branch_name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useOwnerStore } from "~/stores/owner";

const ownerStore = useOwnerStore();
const props = defineProps({
  etabs: Array,
});

const storeEtabUuid = async (uuid) => {
  localStorage.setItem("etab_uuid", uuid);
  await ownerStore.getEtablissementDetails();
};
</script>
