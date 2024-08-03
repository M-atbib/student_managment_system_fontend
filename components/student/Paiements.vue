<template>
  <div class="mb-8 borders p-3 lg:p-5 shadow-sm">
    <!-- Big Numbers -->
    <div
      class="flex items-center flex-wrap justify-between gap-2 mx-auto mb-10"
    >
      <h2 class="text-black">
        Frais Total du Fromation:
        <span class="big-highlight">{{ fraisTotal }}DH</span>
      </h2>
      <h2 class="text-black">
        Frais Total Payer:
        <span class="text-green-600 big-highlight">{{ montantPayer }}DH</span>
      </h2>
      <h2 class="text-black">
        Frais Total Restant:
        <span class="text-red-500 big-highlight">{{ montantRestant }}DH</span>
      </h2>
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
              : 'w-full lg:w-[23%] borders p-2 lg:p-3'
          "
        >
          <h3>{{ payment.name }}</h3>
          <li class="mt-3 mb-2">
            Montant a Payer:
            <span class="highlight text-black"
              >{{ payment.amountToPay }}DH</span
            >
          </li>
          <li
            :class="
              payment.name === 'Mensualite' ? 'flex flex-wrap  gap-7' : ''
            "
          >
            <div
              v-for="(detail, index) in payment.details"
              :key="index"
              :class="
                payment.name === 'Mensualite'
                  ? ''
                  : 'flex items-center justify-between mb-2'
              "
            >
              <p>
                Prix:
                <span class="text-green-600 highlight"
                  >{{ detail.price }}DH</span
                >
              </p>
              <p>
                Date:
                <span class="text-black highlight">{{ detail.date }}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  studentInfo: Object,
});
const fraisTotal =
  Number(props.studentInfo.annual_amount) +
  Number(props.studentInfo.frais_diplôme) +
  Number(props.studentInfo.product) +
  Number(props.studentInfo.registration_fee);

const montantPayer = props.studentInfo.payments.reduce((total, payment) => {
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
    produit: studentData.product,
    diplome: studentData.frais_diplôme,
    mensualite: studentData.monthly_amount,
  };

  const orderedTypes = ["mensualite", "inscription", "produit", "diplome"];

  for (const type of orderedTypes) {
    otherPayments.push({
      name: paymentTypes[type],
      amountToPay: paymentAmounts[type],
      details: groupedData[type]
        ? groupedData[type].map((item) => ({
            price: item.montant,
            date: new Date(item.date_payment).toLocaleDateString("fr-FR"),
          }))
        : [],
    });
  }

  return otherPayments;
};

const otherPayments = transformData(props.studentInfo);
</script>
