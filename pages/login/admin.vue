<template>
    <div
      class="flex flex-col justify-center items-center h-[80vh] w-full text-charcoal"
    >
      <h1 class="text-center">Connectez-vous en tant <br/> qu'Administrateur ou Propriétaire</h1>
      <form
        @submit.prevent="submitForm"
        method="post"
        class="w-full lg:w-fit flex flex-col gap-5 mt-6"
      >
        <div class="flex flex-col gap-1 w-full lg:w-[35ch]">
          <label for="password" class="font-medium ml-1">Email:</label>
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            placeholder="Entrer Email"
          />
          <p v-if="emailError" class="text-red-500">{{ emailError }}</p>
        </div>
  
        <div class="flex flex-col gap-1 w-full lg:w-[35ch]">
          <label for="password" class="font-medium ml-1">Mot de Pass:</label>
          <input
            v-model="password"
            type="password" 
            name="password"
            id="password"
            placeholder="Entrer Mot de Pass"
          />
          <p v-if="passwordError" class="text-red-500">{{ passwordError }}</p>
        </div>
        <button type="submit" class="float-right w-[15ch]">
          <span v-if="!store.isLoading">Submit</span>
          <LayoutLoading v-else />
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useAppStore } from "~/stores";
  import LayoutLoading from "~/components/layout/Loading.vue";
  
  const store = useAppStore();
  const email = ref("");
  const password = ref("");
  const emailError = ref("");
  const passwordError = ref("");
  
  const submitForm = async () => {
    emailError.value = "";
    passwordError.value = "";
    if (!email.value) {
      emailError.value = "L'email est requis";
      return;
    }
    if (!password.value) {
      passwordError.value = "Le mot de passe est requis";
      return;
    }
    store.isLoading = true;
    try {
      await store.login(true, email.value, password.value);
    } catch (error) {
      // emailError.value = "Email ou mot de passe invalide";
      passwordError.value = "Email ou mot de passe invalide";
    } finally {
      store.isLoading = false;
    }
  };
  
  definePageMeta({
    middleware: ["auth"],
    roles: ["owner", "coiffure", "esthetique"],
    layout: "login",
  });
  </script>
