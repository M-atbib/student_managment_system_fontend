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
    if (to.path !== "/login") {
      return navigateTo("/login");
    }
  } else {
    try {
      const response = await appStore.fetchData("api/auth/validate-token");

      if (response.message !== "Token is valid") {
        console.log("Invalid token, redirecting to login");
        VueCookies.remove("token");
        await appStore.logout();
        return navigateTo("/login");
      }

      if (!appStore.roles.length) {
        await appStore.fetchRolesAndPermissions();
      }

      if (to.path === "/login" && appStore.roles.length) {
        if (appStore.roles.includes("student")) {
          return navigateTo("/student");
        }
      }

      if (!appStore.roles.every((role) => requiredRoles.includes(role))) {
        console.log("Redirecting to unauthorized page");
        await appStore.logout();
        return navigateTo("/login");
      }
    } catch (error) {
      console.log("Error validating token, redirecting to login");
      VueCookies.remove("token");
      return navigateTo("/login");
    }
  }
});
