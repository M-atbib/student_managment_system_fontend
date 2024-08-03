<template>
  <nav class="relative flex justify-between items-center z-10">
    <!-- Logo -->
    <img src="../../assets/images/logo.png" alt="logo" class="w-24 lg:w-32" />

    <!-- Burger Menu -->
    <div class="lg:hidden">
      <Icon name="ic:round-menu" class="text-2xl" @click="toggleMenu" />
    </div>

    <div
      :class="[
        'absolute lg:relative top-12 lg:top-0 right-0 flex-col lg:flex-row lg:items-center gap-4 bg-white lg:bg-none p-3 lg:p-0 border lg:border-none border-lavender rounded-md',
        menuOpen ? 'flex' : 'hidden',
        'lg:flex',
      ]"
    >
      <!-- Navigating to Schedule & Attendance -->
      <div
        class="text-sm flex flex-col lg:flex-row gap-3"
        v-if="$route.path.startsWith('/admin')"
      >
        <NuxtLink
          v-if="store.roles.includes('owner')"
          to="/owner"
          class="text-base lg:text-lg"
        >
          Tableau de bord
        </NuxtLink>
        <NuxtLink to="/admin/emploi" class="text-base lg:text-lg">
          Emploi du Temps
        </NuxtLink>
        <NuxtLink to="/admin/group" class="text-base lg:text-lg">
          Groupes
        </NuxtLink>
      </div>

      <!-- Profile -->
      <div class="relative">
        <div
          @click="toggleProfile"
          class="w-10 bg-lavender rounded-full p-3 cursor-pointer"
        >
          <img src="../../assets/images/avatar.png" alt="avatar" />
        </div>

        <div
          class="absolute top-12 -right-2 bg-lavender rounded-md shadow-sm p-4"
          v-show="profile"
        >
          <div
            @click="store.logout"
            class="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <Icon name="tabler:logout-2" />
            <p class="text-sm">Déconnecter</p>
          </div>

          <div class="flex items-center gap-2 cursor-not-allowed">
            <Icon name="material-symbols:settings" />
            <p class="text-sm">Paramètres</p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAppStore } from "~/stores";

const store = useAppStore();
const profile = ref(false);
const menuOpen = ref(false);

const toggleProfile = () => {
  profile.value = !profile.value;
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>
