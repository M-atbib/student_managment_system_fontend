<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center">
      <!-- Overlay -->
      <div class="fixed inset-0 transition-opacity" @click="toggleDialog">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div
        class="bg-white rounded-md overflow-hidden shadow-md transform transition-all my-16 max-w-[330px] lg:max-w-[650px] w-full p-5"
      >
        <Icon
          name="ci:close-md"
          @click="toggleDialog"
          class="absolute right-2 top-2 text-xl cursor-pointer"
        />

        <div>
          <!-- Form 1 -->
          <form @submit.prevent="submitForm">
            <h2>Ajouter Paiement</h2>

            <div class="flex flex-col gap-4 my-5">
              <div class="flex flex-col">
                <label for="type_frais">Type de Frais</label>
                <select
                  v-model="type"
                  name="type_frais"
                  id="type_frais"
                  class="w-full"
                >
                  <option default>Type de Frais</option>
                  <option value="mensualite">Mensualité</option>
                  <option value="inscription">Frais d'Inscription</option>
                  <option value="produit">Produit</option>
                  <option value="diplome">Frais Diplome</option>
                </select>
                <p v-if="typeError" class="text-red-500">{{ typeError }}</p>
              </div>

              <div>
                <h4>Method de Paiment</h4>
                <div class="flex w-[60%] justify-between mt-2">
                  <label for="method-paiment-espace" class="flex gap-2">
                    Espéce
                    <input
                      type="radio"
                      v-model="paymentMethod"
                      value="espece"
                      name="method-paiment"
                      id="method-paiment-espace"
                      class="w-4"
                    />
                  </label>
                  <label for="method-paiment-virement" class="flex gap-2">
                    Virement
                    <input
                      type="radio"
                      v-model="paymentMethod"
                      value="virement"
                      name="method-paiment"
                      id="method-paiment-virement"
                      class="w-4"
                    />
                  </label>
                  <label for="method-paiment-cheque" class="flex gap-2">
                    Chéque
                    <input
                      type="radio"
                      v-model="paymentMethod"
                      value="cheque"
                      name="method-paiment"
                      id="method-paiment-cheque"
                      class="w-4"
                    />
                  </label>
                </div>
              </div>

              <div v-if="type === 'mensualite'">
                <label for="month">Mois payé</label>
                <select v-model="month" name="month" id="month" class="w-full">
                  <option default>Sélectionnez le mois</option>
                  <option value="Janvier">Janvier</option>
                  <option value="Février">Février</option>
                  <option value="Mars">Mars</option>
                  <option value="Avril">Avril</option>
                  <option value="Mai">Mai</option>
                  <option value="Juin">Juin</option>
                  <option value="Juillet">Juillet</option>
                  <option value="Août">Août</option>
                  <option value="Septembre">Septembre</option>
                  <option value="Octobre">Octobre</option>
                  <option value="Novembre">Novembre</option>
                  <option value="Décembre">Décembre</option>
                </select>
              </div>

              <div>
                <label for="montant">Montant</label>
                <input
                  v-model="montant"
                  type="text"
                  name="montant"
                  id="montant"
                  placeholder="Entrer montant recever"
                />
                <p v-if="montantError" class="text-red-500">
                  {{ montantError }}
                </p>
              </div>

              <div>
                <label for="date">Date de Règlement</label>
                <input
                  v-model="date"
                  type="date"
                  name="date"
                  id="date"
                  placeholder="Entrer date de Réglement"
                />
                <p v-if="dateError" class="text-red-500">{{ dateError }}</p>
              </div>
            </div>

            <button type="submit" class="float-right">Ajouter</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAdminStore } from "~/stores/admin";

const adminStore = useAdminStore();
const props = defineProps({
  toggleDialog: Function,
  studentUuid: String,
});

let type = ref("");
let montant = ref("");
let date = ref("");
let typeError = ref("");
let montantError = ref("");
let dateError = ref("");
let paymentMethod = ref("");
let month = ref("");

const submitForm = async () => {
  typeError.value = type.value ? "" : "Type de Frais est requis";
  montantError.value = montant.value ? "" : "Montant est requis";
  dateError.value = date.value ? "" : "Date de Règlement est requis";

  if (typeError.value || montantError.value || dateError.value) {
    return;
  }

  props.toggleDialog();

  await adminStore.createPayment(
    props.studentUuid,
    type.value,
    paymentMethod.value,
    montant.value,
    date.value,
    month.value
  );

  await adminStore.getStudentDetails(props.studentUuid);
};
</script>
