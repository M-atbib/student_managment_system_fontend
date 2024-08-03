<template>
  <div>
    <div
      class="flex items-center justify-end gap-3 lg:gap-14 mb-5"
      v-if="adminStore.studentDetails"
    >
      <h1 class="font-medium">
        Nom Etudiant:
        <span class="font-bold text-black">{{
          adminStore.studentDetails.full_name
        }}</span>
      </h1>
      <h2 class="font-medium text-charcoal">
        N° Inscription:
        <span class="font-bold text-black">{{
          adminStore.studentDetails.inscription_number
        }}</span>
      </h2>
      <button @click="sendPassword">
        <Icon name="mingcute:send-fill" class="text-2xl" />
      </button>
    </div>
    <!-- Tabs -->
    <ul
      class="flex border-b gap-3 lg:gap-4 mb-4 lg:mb-8 overflow-x-auto text-nowrap"
    >
      <li
        v-for="(item, index) in tabs"
        :key="index"
        :class="[
          'cursor-pointer py-2 px-4 rounded-t-md hover:font-bold hover:text-darkBlue hover:bg-lightBlue transition-all duration-300',
          tab === index + 1 ? 'font-bold text-darkBlue bg-lightBlue' : '',
        ]"
        @click="tab = index + 1"
      >
        {{ item.name }}
      </li>
    </ul>

    <!-- Component to render -->
    <component
      :is="tabs[tab - 1].component"
      :studentDetails="adminStore.studentDetails"
      v-if="adminStore.studentDetails"
    ></component>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAdminStore } from "~/stores/admin";
import { useAppStore } from "~/stores";
import AllInformation from "~/components/Admin/Student/AllInformation.vue";
import PaymentDetails from "~/components/Admin/Student/PaymentDetails.vue";
import Presence from "~/components/Admin/Student/Presence.vue";
import Documents from "~/components/Admin/Student/Documents.vue";
import Remarques from "~/components/Admin/Student/Remarques.vue";

const store = useAppStore();
const route = useRoute();
const adminStore = useAdminStore();
const tab = ref(1);
const tabs = [
  {
    name: "Toutes les Informations",
    component: AllInformation,
  },
  {
    name: "Détails Paiement",
    component: PaymentDetails,
  },
  {
    name: "Presence",
    component: Presence,
  },
  {
    name: "Documents",
    component: Documents,
  },
  {
    name: "Remarques",
    component: Remarques,
  },
];

const sendPassword = async () => {
  await adminStore.sendEmail(
    adminStore.studentDetails.full_name,
    adminStore.studentDetails.email,
    adminStore.studentDetails.password
  );
};

onMounted(async () => {
  const id = route.params.id;
  await adminStore.getStudentDetails(id);
});

definePageMeta({
  middleware: ["auth"],
  roles: ["owner", "coiffure", "esthetique"],
});
</script>
