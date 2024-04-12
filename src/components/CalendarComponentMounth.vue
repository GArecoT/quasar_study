<template>
  <div class="full-width">
    <h6 class="text-capitalize text-center">
      {{ today.toLocaleString('default', { month: 'long' }) }}
    </h6>
    <q-table
      dense
      :rows="mounth"
      row-key="day"
      :pagination="{ rowsPerPage: 0 }"
      auto-width
      hide-bottom
      grid
    >
      <template v-slot:item="props">
        <div style="width: 14.2%">
          <q-card flat style="min-height: 100px">
            <q-card-section
              class="text-center q-pa-none q-ma-none"
              style="min-height: 19px"
            >
              <p style="border-radius: 20px" class="q-pa-xs">
                {{ props.row.day }}
              </p>
            </q-card-section>
            <q-card-section>
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
            </q-card-section>
            <q-divider />
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
const mounth = ref([{}]);
const numDays = new Date(
  today.value.getFullYear(),
  today.value.getMonth() + 1,
  0
).getDate();

//Create object
mounth.value.pop();
for (let day = 0; day < numDays; day++) {
  const temp = { day: day + 1, events: {} };
  mounth.value.push(temp);
}
</script>
