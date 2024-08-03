<template>
  <div
    class="flex flex-col justify-center items-center h-[80vh] w-full text-charcoal"
  >
    <h1 class="text-center">
      Connexion en tant <br />
      qu'étudiant
    </h1>
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
  store.isLoading = true;
  emailError.value = "";
  passwordError.value = "";

  if (!email.value) {
    emailError.value = "Email est requis";
  }

  if (!password.value) {
    passwordError.value = "Mot de passe est requis";
  }

  if (!emailError.value && !passwordError.value) {
    await store.login(false, email.value, password.value);
  }

  store.isLoading = false;
};

definePageMeta({
  middleware: ["student"],
  roles: ["student"],
  layout: "login",
});
</script>
