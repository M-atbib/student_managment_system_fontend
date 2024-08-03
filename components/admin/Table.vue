<template>
  <div class="block">
    <div class="overflow-x-auto lg:overflow-visible">
      <table class="w-full table-auto text-xs lg:text-base">
        <thead>
          <tr class="bg-lavender text-charcoal uppercase">
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="py-2 px-1 lg:py-3 text-center"
            >
              {{ header }}
            </th>
          </tr>
        </thead>

        <tbody class="text-charcoal text-center relative h-16">
          <tr
            v-for="(data, index) in allStudentsArray"
            :key="index"
            class="border-b border-lavender capitalize"
          >
            <td>{{ data.inscription_number }}</td>
            <td>{{ data.full_name }}</td>
            <td>{{ data.CIN }}</td>
            <td>{{ data.id_massar }}</td>
            <td>{{ formatDate(data.birth_date) }}</td>
            <td>{{ formatDate(data.created_at) }}</td>
            <td>{{ data.status }}</td>

            <td>
              <AdminTableActions :studentId="data.uuid" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <template v-if="props.studentTable && props.studentTable.meta">
      <div class="flex items-center justify-end gap-1 mt-8">
        <a
          v-for="(link, index) in props.studentTable.meta.links"
          :href="link.url"
          @click.prevent="adminStore.paginate(link.url)"
          :key="index"
          class="bg-darkBlue text-lavender py-2 px-3.5 rounded-full text-sm lg:text-base hover:font-semibold hover:bg-lavender hover:text-charcoal ease-in-out duration-300"
        >
          <template v-if="link.label === 'pagination.previous'">
            <Icon name="f7:chevron-left-2" />
          </template>
          <template v-else-if="link.label === 'pagination.next'">
            <Icon name="f7:chevron-right-2" />
          </template>
          <template v-else>
            {{ link.label }}
          </template>
        </a>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useAppStore } from "~/stores";
import { useAdminStore } from "~/stores/admin";

const store = useAppStore();
const adminStore = useAdminStore();
const props = defineProps({
  studentTable: Object,
});
const headers = [
  "N° Inscription",
  "Nom Complet",
  "CIN",
  "ID Massar",
  "Date Naissance",
  "Date Inscription",
  "Status",
  "Actions",
];

const allStudentsArray = computed(() => {
  if (props.studentTable) {
    return Array.isArray(props.studentTable.data)
      ? props.studentTable.data
      : [props.studentTable];
  }
});

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("fr-FR", options);
};
</script>
