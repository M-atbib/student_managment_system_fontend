import { defineStore } from "pinia";
import { useAppStore } from ".";

export const useOwnerStore = defineStore("admin", {
  state: () => ({
    etabs: null,
    etab: null,
    kpis: null,
  }),

  actions: {
    async getAllEtablissements() {
      const appStore = useAppStore();
      this.etabs = await appStore.fetchData("api/admin/etablissement");
    },

    async getEtablissementDetails() {
      const appStore = useAppStore();
      this.etab = await appStore.fetchData(
        `api/admin/etablissement/view/${localStorage.getItem("etab_uuid")}`
      );
    },

    async getDashboardData() {
      const appStore = useAppStore();
      this.kpis = await appStore.fetchData("api/admin/dashboard");
    },
  },
});
