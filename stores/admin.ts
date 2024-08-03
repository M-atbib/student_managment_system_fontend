import { defineStore } from "pinia";
import { useAppStore } from ".";

export const useAdminStore = defineStore("", {
  state: () => ({
    studentTable: null,
    studentDetails: null,
    timetable: null,
    groups: null,
  }),

  actions: {
    /** Function Related To STUDENTS **/
    // Action to GET
    async getAllStudents(uuid: string = "") {
      const appStore = useAppStore();
      this.studentTable = await appStore.fetchData(
        `api/admin/students/${uuid}?status=active`
      );
    },

    // Action to GET
    async getStudentDetails(studentUuid: string) {
      const appStore = useAppStore();
      this.studentDetails = await appStore.fetchData(
        `api/admin/students/view/${studentUuid}`
      );
    },

    // Action to CREATE
    async createStudent(formData: FormData, etabUuid: string) {
      const appStore = useAppStore();
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      await appStore.fetchData(
        `api/admin/students/create/${etabUuid}`,
        "POST",
        formData,
        headers
      );
    },

    // Action to ARCHIVER
    async archiveStudent(studentUuid: string) {
      const appStore = useAppStore();
      await appStore.fetchData(
        `api/admin/students/archive/${studentUuid}`,
        "DELETE"
      );
    },

    // Action to UPDATE
    async updateStudent(studentUuid: string, studentData: Record<string, any>) {
      const appStore = useAppStore();
      await appStore.fetchData(
        `api/admin/students/update/${studentUuid}`,
        "PUT",
        studentData
      );
    },

    /** Action Related to TIMETABLES **/
    // Action to GET
    async getTimetable(etabUuid: string = "") {
      const appStore = useAppStore();
      this.timetable = await appStore.fetchData(
        `api/admin/timetables/${etabUuid}`,
        "GET"
      );
    },

    // Action to POST
    async createTimetable(formData: FormData) {
      const appStore = useAppStore();
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      await appStore.fetchData(
        "api/admin/timetables/create",
        "POST",
        formData,
        headers
      );
    },

    // Action to PUT
    async updateTimetable(
      timetablUuid: String,
      title: string,
      group_uuid: string
    ) {
      const appStore = useAppStore();
      const data = {
        title: title,
        group_uuid: group_uuid,
      };
      await appStore.fetchData(
        `api/admin/timetables/update/${timetablUuid}`,
        "PUT",
        data
      );
    },

    // Action to DELETE
    async deleteTimetable(timetableUuid: string) {
      const appStore = useAppStore();
      await appStore.fetchData(
        `api/admin/timetables/delete/${timetableUuid}`,
        "DELETE"
      );
    },

    /** Action Related to GROUPS **/
    // Action to GET
    async getGroups(etabUuid: string = "") {
      const appStore = useAppStore();
      this.groups = await appStore.fetchData(
        `api/admin/groups/${etabUuid}`,
        "GET"
      );
    },

    // Action to POST
    async createGroup(formData: FormData) {
      const appStore = useAppStore();
      appStore.fetchData("api/admin/groups/create", "POST", formData);
    },

    // Action to PUT
    async updateGroup(groupUuid: string, name: string, etab_uuid: string) {
      const appStore = useAppStore();
      const data = {
        name: name,
        etab_uuid: etab_uuid,
      };
      await appStore.fetchData(
        `api/admin/groups/update/${groupUuid}`,
        "PUT",
        data
      );
    },

    // Action to DELETE
    async deleteGroup(groupUuid: string) {
      const appStore = useAppStore();
      await appStore.fetchData(
        `api/admin/groups/delete/${groupUuid}`,
        "DELETE"
      );
    },

    /** Action Related to PAYMENTS **/
    // Action to POST
    async createPayment(
      studentUuid: string,
      type: string,
      paymentMethod: String,
      montant: number,
      datePayment: string,
      month: String
    ) {
      const appStore = useAppStore();
      const data = {
        student_uuid: studentUuid,
        type: type,
        methode: paymentMethod,
        montant: montant,
        date_payment: datePayment,
        month: month,
      };
      await appStore.fetchData("api/admin/payments/create", "POST", data);
    },

    /** Action Related to ATTENDANCE **/
    // Action to POST
    async createPresence(
      seance: String,
      type: string,
      justifier: Boolean,
      justification: String,
      date: string,
      studentUuids: string[]
    ) {
      const appStore = useAppStore();
      const data = {
        title: seance,
        type: type,
        justification: justifier,
        remarque: justification,
        date: date,
        student_uuids: studentUuids,
      };
      await appStore.fetchData("api/admin/presences", "POST", data);
    },

    /** Action Related to REMARK **/
    // Action to POST
    async createRemarque(text: string, studentUuid: string) {
      const appStore = useAppStore();
      const data = {
        text: text,
        student_uuid: studentUuid,
      };
      await appStore.fetchData("api/admin/remarques/create", "POST", data);
    },

    // Action to DELELTE
    async deleteRemark(remarqueUuid: string) {
      const appStore = useAppStore();
      await appStore.fetchData(
        `api/admin/remarques/delete/${remarqueUuid}`,
        "DELETE"
      );
    },

    /** Action Related to ANNONCEMENTS **/
    // Action to POST
    async createAnnonce(
      text: string,
      dateValidite: string,
      sector: string,
      etabUuid: string
    ) {
      const appStore = useAppStore();
      const data = {
        text: text,
        date_validite: dateValidite,
        sector: sector,
        etab_uuid: etabUuid,
      };
      await appStore.fetchData("api/admin/annonces/create", "POST", data);
    },

    /** Actions Related to DOCUMENTS **/
    // Action POST
    async createDocument(formData: FormData) {
      const appStore = useAppStore();
      await appStore.fetchData("api/admin/documents/create", "POST", formData, {
        "Content-Type": "multipart/form-data",
      });
    },

    // Action Delete
    async deleteDocument(documentUuid: string) {
      const appStore = useAppStore();
      await appStore.fetchData(
        `api/admin/documents/delete/${documentUuid}`,
        "DELETE"
      );
    },

    /** OTHER ACTIONS **/
    // Action to paginate the student data
    async paginate(url: string) {
      const appStore = useAppStore();

      if (url) {
        const apiUrl = url.split("http://127.0.0.1:8000/")[1];
        this.studentTable = await appStore.fetchData(apiUrl);
      }
    },

    // Action to search and filter students
    async searchStudents(
      etabUuid: string,
      name: string = "",
      filters: Record<string, string> = {},
      status: string = "active"
    ) {
      const appStore = useAppStore();
      let params = `&status=${status}`;
      if (name) params += `&name=${name}`;
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params += `&${key}=${value}`;
      });
      if (params.charAt(0) === "&") params = "?" + params.substring(1);

      this.studentTable = await appStore.fetchData(
        `api/admin/students/${etabUuid}${params}`
      );
    },

    // Action to upload files
    async uploadFile(action: string, uuid: string, nameFile: File) {
      const appStore = useAppStore();
      const formData = new FormData();
      formData.append("name_file", nameFile);
      await appStore.fetchData(
        `api/admin/upload/update/${action}/${uuid}`,
        "POST",
        formData
      );
    },

    // Send Email iwth password , email,
    async sendEmail(username: string, loginemail: string, password: string) {
      const appStore = useAppStore();
      await appStore.fetchData(
        `api/send-email/${username}/${loginemail}/${password}`,
        "GET"
      );
    },
  },
});
