<template>
  <div class="full-width">
    <div class="flex justify-between content-center">
      <div />
      <h6 class="text-capitalize" style="padding-left: 30px">
        {{ today.toLocaleString('default', { month: 'long' }) }}
      </h6>
      <q-btn
        class="q-mx-lg text-black self-center"
        color="green-2"
        icon="add"
        style="height: 30px"
        round
        @click="eventDialog = true"
      />
    </div>
    <q-table
      dense
      :rows="month"
      row-key="day"
      :pagination="{ rowsPerPage: 0 }"
      auto-width
      hide-bottom
      grid
    >
      <template v-slot:item="props">
        <div style="width: 14.2%">
          <q-card
            flat
            bordered
            style="min-height: 200px"
            :class="props.row.dummy ? 'bg-grey-2' : 'bg-white'"
          >
            <q-card-section
              class="text-center q-pa-none q-ma-xs"
              v-if="props.pageIndex < 7"
            >
              <span style="border-radius: 20px">
                {{ daysWeek[props.pageIndex % 7] }}
              </span>
            </q-card-section>
            <q-card-section
              class="text-center q-pa-none q-ma-xs"
              v-if="!props.row.dummy"
            >
              <span style="border-radius: 20px">
                {{ props.row.day }}
              </span>
            </q-card-section>
            <q-separator class="q-mx-xs" />
            <q-card-section class="q-pa-xs">
              <draggable
                v-if="!props.row.dummy"
                :list="props.row.events"
                group="events"
                itemKey="id"
                style="min-height: 100px"
              >
                <template #item="{ element }">
                  <div
                    class="q-py-xs q-px-sm cursor-pointer"
                    :class="'bg-' + element.color + '-3'"
                    style="border-radius: 5px"
                    @click="handleClickEvent(element)"
                  >
                    {{ element.time }} - {{ element.name }}
                  </div>
                </template>
              </draggable>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="eventDialog">
    <AddEventComponent
      @new-event="(props) => addEvent(props)"
      @edit-event="(props) => editEvent(props)"
      @delete-event="(props) => deleteEvent(props)"
      :edit="isEdit"
      :eventEdit="eventEdit"
      isMonth
    />
  </q-dialog>
</template>
<script setup>
//.TODO: create blank
import AddEventComponent from 'components/AddEventComponent.vue';
import draggable from 'vuedraggable';
import { ref } from 'vue';
const eventDialog = ref(false);
const eventEdit = ref({});
const isEdit = ref(false);
const today = ref(new Date());
const month = ref([]);
let id = 1;
const numDays = new Date(
  today.value.getFullYear(),
  today.value.getMonth() + 1,
  0
).getDate();
const firstDayWeek = new Date(
  today.value.getFullYear(),
  today.value.getMonth() + 1,
  0
).getDay();

const daysWeek = ['SUN.', 'MON.', 'TUE.', 'WED.', 'THU.', 'FRI.', 'SAT.'];
//Create object
//Create dummy days
for (let day = 0; day < firstDayWeek; day++) {
  month.value.push({ day: '', events: [], dummy: true });
}
for (let day = 0; day < numDays; day++) {
  month.value.push({ day: day + 1, events: [] });
}
// month.value[2].events[0] = {
//   time: '12:00',
//   name: 'Lunch with Ana ❤️❤️',
//   color: 'green',
//   id: 0,
//   date: today.value.toLocaleDateString('jp-JP'),
// };
function addEvent(props) {
  if (
    parseInt(props.date.toString().slice(5, 7)) ==
    today.value.getMonth() + 1
  ) {
    month.value
      .find(({ day }) => day == props.date.toString().slice(8, 10))
      .events.push({
        time: props.time,
        name: props.name,
        color: props.color,
        id: id + 1,
        date: props.date,
      });
    id++;
  }
}
function deleteEvent(props) {
  for (let day in month.value) {
    for (let event in month.value[day]?.events)
      if (month.value[day].events[event].id == props.id)
        month.value[day].events.splice(event, 1);
  }
}
function editEvent(props) {
  deleteEvent(props);
  addEvent(props);
}
function handleClickEvent(props) {
  isEdit.value = true;
  eventEdit.value = props;
  eventDialog.value = true;
}
</script>
