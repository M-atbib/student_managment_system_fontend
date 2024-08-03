import { defineStore } from "pinia";
import { useAppStore } from ".";

export const useStudentStore = defineStore("student", {
  state: () => ({
    studentInfo: null,
    annonce: null,
  }),
  actions: {
    async getStudentInfo() {
      const appStore = useAppStore();
      this.studentInfo = await appStore.fetchData("api/student/info");
    },

    async getAnnonce() {
      const appStore = useAppStore();
      this.annonce = await appStore.fetchData("api/student/annonces");
    },
  },
});
