<template>
  <div>
    <!-- Big Numbers -->
    <div
      class="flex items-center flex-wrap justify-between gap-2 mx-auto mb-10"
    >
      <h2 class="text-charcoal">
        Frais Total du Fromation:
        <span class="text-black big-highlight">{{ fraisTotal }}DH</span>
      </h2>
      <h2 class="text-charcoal">
        Frais Total Payer:
        <span class="text-green-600 big-highlight">{{ montantPayer }}DH</span>
      </h2>
      <h2 class="text-charcoal">
        Frais Total Restant:
        <span class="text-red-500 big-highlight">{{ montantRestant }}DH</span>
      </h2>

      <button @click="toggleDialog">Ajouter Paiement</button>
      <AdminStudentAddingPayment
        v-if="showDialog"
        :toggleDialog="toggleDialog"
        :studentUuid="props.studentDetails.uuid"
      />
    </div>

    <!-- Tracking All Payments -->
    <div>
      <h2>Suivi de Paiements:</h2>

      <div class="flex flex-col flex-wrap lg:flex-row items-stretch gap-5 mt-3">
        <ul
          v-for="(payment, index) in otherPayments"
          :key="index"
          :class="
            payment.name === 'Mensualite'
              ? 'w-full borders p-2 lg:p-3'
              : 'w-full lg:w-[32%] borders p-2 lg:p-3'
          "
        >
          <h3>{{ payment.name }}</h3>

          <li class="my-4 text-charcoal">
            Montant a Payer:
            <span class="text-black highlight"
              >{{ payment.amountToPay }}DH</span
            >
          </li>

          <li class="w-[65%] mx-auto">
            <div
              v-if="payment.name === 'Mensualite'"
              class="flex flex-col gap-7 w-full overflow-y-auto"
            >
              <div v-for="(details, month) in payment.details" :key="month" class="w-full lg:min-w-[12vw]">
                <h4
                  class="text-charcoal bg-lightBlue font-bold text-base lg:text-[17px] border border-lightBlue shadow-sm rounded text-center"
                >
                  {{ month }}
                </h4>
                <div
                  v-for="(detail, index) in details"
                  :key="index"
                  class="flex flex-row justify-between gap-3 last:mb-0 border-b border-lavender last:border-none py-3 "
                >
                  <p class="text-charcoal">
                    Prix:
                    <span class="text-green-600 highlight"
                      >{{ detail.price }}DH</span
                    >
                  </p>

                  <p class="text-charcoal">
                    Date:
                    <span class="text-black highlight">{{ detail.date }}</span>
                  </p>
                  <p class="text-charcoal">
                    Method:
                    <span class="text-black highlight capitalize">{{
                      detail.method
                    }}</span>
                  </p>
                </div>
              </div>
            </div>

            <div v-else>
              <div
                v-for="(detail, index) in payment.details"
                :key="index"
                class="flex flex-wrap justify-between gap-3 mb-6 last:mb-0"
              >
                <p class="text-charcoal">
                  Prix:
                  <span class="text-green-600 highlight"
                    >{{ detail.price }}DH</span
                  >
                </p>

                <p class="text-charcoal">
                  Date:
                  <span class="text-black highlight">{{ detail.date }}</span>
                </p>
                <p class="text-charcoal">
                  Method:
                  <span class="text-black highlight capitalize">{{
                    detail.method
                  }}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const showDialog = ref(false);
const props = defineProps({
  studentDetails: Object,
});
const fraisTotal =
  Number(props.studentDetails.annual_amount) +
  Number(props.studentDetails.frais_diplôme) +
  Number(props.studentDetails.product) +
  Number(props.studentDetails.registration_fee);

const montantPayer = props.studentDetails.payments.reduce((total, payment) => {
  return total + Number(payment.montant);
}, 0);

const montantRestant = fraisTotal - montantPayer;

const transformData = (studentData) => {
  const paymentTypes = {
    inscription: "Frais d'inscription",
    produit: "Produit",
    diplome: "Frais Diplome",
    mensualite: "Mensualite",
  };

  const otherPayments = [];
  const groupedData = studentData.payments.reduce((acc, curr) => {
    if (!acc[curr.type]) {
      acc[curr.type] = [];
    }
    acc[curr.type].push(curr);
    return acc;
  }, {});

  const paymentAmounts = {
    inscription: studentData.registration_fee,
    assurance: studentData.insurance,
    produit: studentData.product,
    diplome: studentData.frais_diplôme,
    mensualite: studentData.monthly_amount,
  };

  const orderedTypes = ["mensualite", "inscription", "produit", "diplome"];

  for (const type of orderedTypes) {
    let details = groupedData[type]
      ? groupedData[type].map((item) => ({
          price: item.montant,
          date: new Date(item.date_payment).toLocaleDateString("fr-FR"),
          month: item.month ? item.month : null,
          method: item.methode ? item.methode : "", // Adding method to the details
        }))
      : [];

    if (type === "mensualite") {
      details = details.reduce((grouped, detail) => {
        const key = detail.month;
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(detail);
        return grouped;
      }, {});
    }

    otherPayments.push({
      name: paymentTypes[type],
      amountToPay: paymentAmounts[type],
      details: details,
    });
  }

  return otherPayments;
};

const otherPayments = transformData(props.studentDetails);

console.log(otherPayments);

const toggleDialog = () => {
  showDialog.value = !showDialog.value;
};
</script>
