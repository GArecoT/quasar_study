<template>
  <div>
    <h6 class="text-center q-my-sm">Calendar</h6>
    <q-table
      class="col-3"
      dense
      :rows="rows"
      :columns="columns"
      row-key="id"
      :pagination="{ rowsPerPage: 0 }"
      auto-width
      hide-bottom
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <!-- :class="fn_class_linha(props)"-->
          <q-td
            key="time"
            :props="props"
            style="width: 10px; position: relative"
          >
            <div style="border-radius: 15px">
              {{ props.row.time }}
            </div>
          </q-td>

          <draggable :list="props.row.events" group="events" itemKey="id">
            <template #item="{ element }">
              <div class="bg-blue-3 q-ma-xs q-pa-xs" style="border-radius: 5px">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';
const columns = ref([
  {
    name: 'time',
    label: 'Time',
    align: 'left',
    field: 'time',
    sortable: true,
  },
  {
    name: 'event',
    label: 'Events',
    align: 'left',
    field: 'event',
    sortable: true,
  },
]);

const rows = ref([
  {
    time: '07:00',
    events: [
      { name: 'AAAA', id: '0' },
      { name: 'ABBB', id: '1' },
      { name: 'ACCC', id: '2' },
    ],
  },
  {
    time: '08:00',
    events: [
      { name: 'BAAA', id: '0' },
      { name: 'BBBB', id: '1' },
      { name: 'BCCC', id: '2' },
    ],
  },
  {
    time: '09:00',
    events: [
      { name: 'CAAA', id: '0' },
      { name: 'CBBB', id: '1' },
      { name: 'CCCC', id: '2' },
    ],
  },
]);
</script>
