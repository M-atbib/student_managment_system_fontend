<template>
  <div>
    <h1>Presence</h1>

    <div>
      <div class="flex justify-between items-center w-[70%] gap-2 mt-5">
        <div>
          <h2>Weekly Report</h2>
          <p>Date: <strong>{{ weeklyReport.date }}</strong></p>
          <p>Retard: <strong>{{ weeklyReport.retard }}</strong></p>
          <p>Absence: <strong>{{ weeklyReport.absence }}</strong></p>
        </div>

        <div>
          <h2>Monthly Report</h2>
          <p>Date: <strong>{{ monthlyReport.date }}</strong></p>
          <p>Retard: <strong>{{ monthlyReport.retard }}</strong></p>
          <p>Absence: <strong>{{ monthlyReport.absence }}</strong></p>
        </div>

        <div>
          <h2>Yearly Report</h2>
          <p>Date: <strong>{{ yearlyReport.date }}</strong></p>
          <p>Retard: <strong>{{ yearlyReport.retard }}</strong></p>
          <p>Absence: <strong>{{ yearlyReport.absence }}</strong></p>
        </div>
      </div>
      <ul class="flex items-start justify-start gap-5 lg:gap-10 flex-wrap mt-5">
        <li
          v-for="(presence, index) in props.studentDetails.presences"
          :key="index"
          class="borders shadow-sm w-full lg:w-fit p-4"
        >
          <h3 class="mb-2">
            Seance:
            <span class="text-black highlight">{{ presence.title }}</span>
          </h3>
          <h3 class="mb-2">
            Retard/Absence:
            <span class="text-black highlight">{{ presence.type }}</span>
          </h3>
          <h3 class="mb-2">
            Justifier:
            <span class="text-black highlight">{{
              presence.justification === 1 ? "Oui" : "Non"
            }}</span>
          </h3>
          <h3 class="mb-2">
            justification:
            <span class="text-black highlight">{{ presence.remarque }}</span>
          </h3>
          <h3>
            Date:
            <span class="text-black highlight">{{ presence.date }}</span>
          </h3>

          <!-- <div class="flex items-center justify-end gap-2">
            <div class="group relative">
              <Icon name="ic:outline-delete" class="text-2xl" />
              <span class="tooltip">Supprimer</span>
            </div>
          </div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "vue";
import {
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  format,
} from "date-fns";

const props = defineProps({
  studentDetails: Object,
});

const calculateReport = (presences, periodFn) => {
  const report = { retard: 0, absence: 0, date: '' };
  const now = new Date();

  presences.forEach((presence) => {
    const presenceDate = new Date(presence.date);
    if (periodFn(now, presenceDate) === 0) {
      if (presence.type === "retard") {
        report.retard++;
      } else if (presence.type === "absence") {
        report.absence++;
      }
      report.date = format(presenceDate, 'dd-MM-yyy');
    }
  });

  return report;
};

const weeklyReport = computed(() =>
  calculateReport(props.studentDetails.presences, differenceInWeeks)
);
const monthlyReport = computed(() =>
  calculateReport(props.studentDetails.presences, differenceInMonths)
);
const yearlyReport = computed(() =>
  calculateReport(props.studentDetails.presences, differenceInYears)
);

console.log(props.studentDetails);
</script>
