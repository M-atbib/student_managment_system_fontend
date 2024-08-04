import { defineStore } from "pinia";
import axios from "axios";
import VueCookies from "vue-cookies";

axios.defaults.withCredentials = true;

export const useAppStore = defineStore("app", {
  state: () => ({
    roles: [] as string[],
    permissions: [] as string[],
    etab: "" as String,
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: "" as string,
    successMessage: "" as string,
    noContent: "" as string,
  }),

  actions: {
    async fetchData(
      url: string,
      method: string = "GET",
      data: object = {},
      headers: object = {}
    ) {
      this.isLoading = true;
      this.noContent = "";

      const config = useRuntimeConfig();
      const backendUrl = config.public.backendUrl;
      const fullUrl = `${backendUrl}/${url}`;
      const accessToken = VueCookies.get("token");

      if (url !== "api/auth/login" && url !== "api/auth/student/login") {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      }

      // Merge the default headers with the headers passed to the function
      const finalHeaders = { ...axios.defaults.headers.common, ...headers };

      try {
        let response;
        switch (method) {
          case "GET":
            response = await axios.get(fullUrl, { headers: finalHeaders });
            break;
          case "POST":
            response = await axios.post(fullUrl, data, {
              headers: finalHeaders,
            });
            this.isError = false;
            this.isSuccess = false;
            this.errorMessage = "";
            this.successMessage = "";
            this.errorMessage = response.data.message;
            this.successMessage = response.data.message;
            this.isSuccess = true;
            break;
          case "PUT":
            response = await axios.put(fullUrl, data, {
              headers: finalHeaders,
            });
            this.isError = false;
            this.isSuccess = false;
            this.errorMessage = "";
            this.successMessage = "";
            this.errorMessage = response.data.message;
            this.successMessage = response.data.message;
            this.isSuccess = true;
            break;
          case "DELETE":
            response = await axios.delete(fullUrl, { headers: finalHeaders });
            this.isError = false;
            this.isSuccess = false;
            this.errorMessage = "";
            this.successMessage = "";
            this.errorMessage = response.data.message;
            this.successMessage = response.data.message;
            this.isSuccess = true;
            break;
          default:
            throw new Error("Méthode invalide");
        }

        if (response.status !== 200 && response.status !== 201) {
          this.isError = true;

          throw new Error(
            response.data.message || "La réponse du réseau n'était pas correcte"
          );
        }

        return response.data;
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          this.noContent = error.response.data.message;
        } else {
          throw error;
        }
      } finally {
        this.isLoading = false;
      }
    },
    async login(isAdmin: boolean, email: string, password: string) {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const loginEndpoint = isAdmin
        ? "api/auth/login"
        : "api/auth/student/login";
      const response = await this.fetchData(loginEndpoint, "POST", {
        email,
        password,
      });

      // console.log(response)
      VueCookies.set("token", response.token, "30d", "", "", true, "Strict");
      this.setRoles(response.roles);
      this.setPermissions(response.permissions);
      this.setEtablisssement(response.etab_uuid);

      if (
        this.roles.includes("coiffure") ||
        this.roles.includes("esthetique")
      ) {
        // console.log(this.etab);
        return navigateTo(`/admin/${this.etab}`);
      } else if (this.roles.includes("owner")) {
        return navigateTo("/owner");
      } else {
        return navigateTo("/student");
      }
    },

    async logout() {
      await this.fetchData("api/auth/logout", "POST");
      VueCookies.remove("token");
      this.setRoles([]);
      this.setPermissions([]);
      localStorage.clear();
      return navigateTo("/");
    },

    async fetchRolesAndPermissions() {
      const response = await this.fetchData(
        "api/auth/roles-permissions",
        "GET"
      );

      this.setRoles(response.roles);
      this.setPermissions(response.permissions);
    },

    setRoles(roles: string[]) {
      this.roles = roles;
      if (typeof window !== "undefined") {
        localStorage.setItem("user_role", roles);
      }
    },

    setPermissions(permissions: string[]) {
      this.permissions = permissions;
    },

    setEtablisssement(etab: string) {
      this.etab = etab;
      if (typeof window !== "undefined") {
        localStorage.setItem("etab_uuid", etab);
      }
    },
  },

  getters: {
    hasPermission: (state) => (requiredRoles: string[]) => {
      return state.roles.some((role) => requiredRoles.includes(role));
    },
  },
});
