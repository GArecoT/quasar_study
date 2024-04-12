<template>
  <q-page>
    <q-tabs v-model="tab" class="text-indigo-7">
      <q-tab name="daily" label="Daily" />
      <q-tab name="mounthly" label="Mounthly" />
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      horizontal
      transition-prev="jump-up"
      transition-next="jump-up"
    >
      <q-tab-panel name="daily" class="row items-center justify-evenly">
        <CalendarComponentDay />
      </q-tab-panel>
      <q-tab-panel name="mounthly" class="row items-center justify-evenly">
        <CalendarComponentMounth />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>
<script setup>
import { ref } from 'vue';
import CalendarComponentDay from 'components/CalendarComponentDay.vue';
import CalendarComponentMounth from 'components/CalendarComponentMounth.vue';
const tab = ref('daily');
</script>
