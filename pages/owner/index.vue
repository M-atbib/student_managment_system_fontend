<template>
  <div v-if="ownerStore.etabs && ownerStore.kpis">
    <OwnerKpis :kpis="ownerStore.kpis" />
    <OwnerEtablissements :etabs="ownerStore.etabs" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAppStore } from "~/stores";
import { useOwnerStore } from "~/stores/owner";

// Access permissions store
const store = useAppStore();
const ownerStore = useOwnerStore();
const hasPermission = store.hasPermission;

// Fetch all etablissements on component mount
onMounted(async () => {
  await ownerStore.getAllEtablissements();
  await ownerStore.getDashboardData();
});

// Set up middleware and meta properties
definePageMeta({
  middleware: ["auth"],
  roles: ["owner"],
  layout: "owner",
});
</script>
