<template>
  <div class="full-width">
    <div class="flex justify-between content-center">
      <div />
      <h6 class="text-capitalize">
        {{ today.toLocaleString('default', { month: 'long' }) }}
      </h6>
      <q-btn
        class="q-mx-lg text-black self-center"
        color="green-2"
        icon="add"
        style="height: 30px"
        round
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
          <q-card flat bordered style="min-height: 200px">
            <q-card-section class="text-center q-pa-none q-ma-xs">
              <span style="border-radius: 20px">
                {{ props.row.day }}
              </span>
            </q-card-section>
            <q-separator class="q-mx-xs" />
            <q-card-section class="q-pa-xs">
              <draggable
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
</template>
<script setup>
import draggable from 'vuedraggable';
import { ref } from 'vue';
const today = ref(new Date());
const month = ref([{}]);
const numDays = new Date(
  today.value.getFullYear(),
  today.value.getMonth() + 1,
  0
).getDate();

//Create object
month.value.pop();
for (let day = 0; day < numDays; day++) {
  const temp = { day: day + 1, events: [] };
  month.value.push(temp);
}
let temp = { time: '12:00', name: 'Lunch with Ana ❤️❤️', color: 'green' };
month.value[2].events[0] = temp;
</script>
