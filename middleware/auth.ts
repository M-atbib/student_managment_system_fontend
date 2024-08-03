import { useAppStore } from "~/stores";
import VueCookies from "vue-cookies";

export default defineNuxtRouteMiddleware(async (to) => {
  if (!process.client) {
    return;
  }

  const appStore = useAppStore();
  const requiredRoles = to.meta.roles || [];
  const token = VueCookies.get("token");

  // console.log("Required Roles:", requiredRoles);
  // console.log("User Roles:", appStore.roles);
  // console.log("Navigating to:", to.path);

  if (!token) {
    console.log("No token found, redirecting to login");
    if (to.path !== "/login/admin") {
      return navigateTo("/login/admin");
    }
  } else {
    try {
      const response = await appStore.fetchData("api/auth/validate-token");

      if (response.message !== "Token is valid") {
        console.log("Invalid token, redirecting to login");
        VueCookies.remove("token");
        await appStore.logout();
        return navigateTo("/login/admin");
      }

      if (!appStore.roles.length) {
        await appStore.fetchRolesAndPermissions();
      }

      if (to.path === "/login/admin" && appStore.roles.length) {
        if (
          appStore.roles.includes("coiffure") ||
          appStore.roles.includes("esthetique")
        ) {
          return navigateTo(`/admin/${appStore.etab}`);
        } else if (appStore.roles.includes("owner")) {
          return navigateTo("/owner");
        }
      }

      if (!appStore.roles.every((role) => requiredRoles.includes(role))) {
        // console.log("Redirecting to unauthorized page");
        await appStore.logout();
        return navigateTo("/login/admin");
      }
    } catch (error) {
      console.log("Error validating token, redirecting to login");
      VueCookies.remove("token");
      return navigateTo("/login/admin");
    }
  }
});
