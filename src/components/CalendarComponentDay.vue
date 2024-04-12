<template>
  <div>
    <h6 class="text-center q-my-sm">Daily Calendar</h6>
    <div class="flex content-start">
      <div>
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
              <q-td
                key="time"
                :props="props"
                style="width: 10px; position: relative"
              >
                <div style="border-radius: 15px">
                  {{ props.row.time }}
                </div>
              </q-td>
              <q-td
                key="time"
                :props="props"
                style="width: 10px; position: relative"
              >
                <draggable :list="props.row.events" group="events" itemKey="id">
                  <template #item="{ element }">
                    <div
                      class="q-ma-xs q-py-xs q-px-sm cursor-pointer"
                      :class="'bg-' + element.color + '-3'"
                      style="border-radius: 5px"
                      @click="handleClickEvent(element)"
                    >
                      {{ element.name }}
                    </div>
                  </template>
                </draggable>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <q-btn
        class="q-mx-sm text-black"
        color="green-2"
        icon="add"
        style="height: 30px"
        round
        @click="
          () => {
            eventDialog = true;
            isEdit = false;
          }
        "
      />
    </div>
  </div>
  <q-dialog v-model="eventDialog">
    <AddEventComponent
      @new-event="(props) => addEvent(props)"
      @edit-event="(props) => editEvent(props)"
      @delete-event="(props) => deleteEvent(props)"
      :edit="isEdit"
      :eventEdit="eventEdit"
    />
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';
import AddEventComponent from 'components/AddEventComponent.vue';
const eventDialog = ref(false);
const isEdit = ref(false);
const eventEdit = ref({});
let id = 5;
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
    time: '05:00',
    events: [],
  },
  {
    time: '06:00',
    events: [{ name: 'Waking up', id: '1', color: 'red' }],
  },
  {
    time: '07:00',
    events: [
      { name: 'Morning Coffee', id: '0', color: 'brown' },
      { name: 'Cycle to work 🚲', id: '2', color: 'blue' },
    ],
  },
  {
    time: '08:00',
    events: [],
  },
  {
    time: '09:00',
    events: [],
  },
  {
    time: '10:00',
    events: [],
  },
  {
    time: '11:00',
    events: [],
  },
  {
    time: '12:00',
    events: [{ name: 'Lunch', id: '3', color: 'green' }],
  },
  {
    time: '13:00',
    events: [],
  },
  {
    time: '14:00',
    events: [],
  },
  {
    time: '15:00',
    events: [],
  },
  {
    time: '16:00',
    events: [],
  },
  {
    time: '17:00',
    events: [],
  },
  {
    time: '18:00',
    events: [],
  },
  {
    time: '19:00',
    events: [],
  },
  {
    time: '20:00',
    events: [{ name: 'Diner', id: '4', color: 'lime' }],
  },
  {
    time: '21:00',
    events: [],
  },
  {
    time: '22:00',
    events: [],
  },
  {
    time: '23:00',
    events: [{ name: 'Sleep', id: '5', color: 'grey' }],
  },
  {
    time: '00:00',
    events: [],
  },
  {
    time: '01:00',
    events: [],
  },
  {
    time: '02:00',
    events: [],
  },
  {
    time: '03:00',
    events: [],
  },
  {
    time: '04:00',
    events: [],
  },
]);

function addEvent(event) {
  const temp = { name: event.name, color: event.color, id: id + 1 };
  for (let item in rows.value) {
    if (rows.value[item].time == event.time) {
      rows.value[item].events[rows.value[item].events.length] = temp;
    }
  }
  id++;
}
function editEvent(event) {
  for (let item in rows.value) {
    for (let temp in rows.value[item].events) {
      if (event.id == rows.value[item].events[temp].id) {
        rows.value[item].events[temp].name = event.name;
        rows.value[item].events[temp].color = event.color;
        //if the time is different
        if (
          event.time != undefined &&
          event.time != null &&
          rows.value[item].time !== event.time
        )
          rows.value[item].events.splice(temp, 1);

        for (let item in rows.value) {
          if (event.time == rows.value[item].time) {
            //let tempEvent = structuredClone(event);
            delete event.time;
            rows.value[item].events.push(event);
          }
        }
      }
    }
  }
}
function deleteEvent(event) {
  for (let item in rows.value) {
    for (let temp in rows.value[item].events) {
      if (event.id == rows.value[item].events[temp].id) {
        rows.value[item].events.splice(temp, 1);
      }
    }
  }
}
function handleClickEvent(event) {
  isEdit.value = true;
  eventEdit.value = event;
  eventDialog.value = true;
}
</script>
