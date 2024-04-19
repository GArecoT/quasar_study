<template>
  <div
    class="bg-white"
    style="border-radius: 15px"
    :style="q.screen.lt.md ? '' : 'width: 500px'"
  >
    <q-form v-if="!isMonth">
      <div class="flex bg-grey-2 full-width justify-end">
        <q-btn icon="close" flat v-close-popup />
      </div>
      <div class="row q-pa-md full-width q-gutter-y-md">
        <q-input
          dense
          label="Event Name"
          class="col-12"
          v-model="event.name"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type the name',
          ]"
        />
        <q-select
          dense
          label="Time"
          class="col-4"
          v-model="event.time"
          :options="times"
        />
        <div class="col-8 q-pt-sm">
          <q-radio
            v-model="event.color"
            keep-color
            val="blue"
            label="Blue"
            color="blue-3"
          />
          <q-radio
            v-model="event.color"
            keep-color
            val="green"
            label="Green"
            color="green-3"
          />
          <q-radio
            v-model="event.color"
            keep-color
            val="red"
            label="Red"
            color="red-3"
          />
          <q-radio
            v-model="event.color"
            keep-color
            val="lime"
            label="Lime"
            color="lime-3"
          />
        </div>
      </div>
      <div class="flex full-width justify-end q-pa-md q-gutter-x-sm">
        <q-btn
          v-if="props.edit"
          label="Delete"
          color="red-5"
          v-close-popup
          @click="$emit('deleteEvent', event)"
        />
        <q-btn
          label="Save"
          :disabled="
            event.name == '' || event.time == '' || event.color == ''
              ? true
              : false
          "
          color="blue-5"
          v-close-popup
          type="submit"
          @click="
            props.edit ? $emit('editEvent', event) : $emit('newEvent', event)
          "
        />
      </div>
    </q-form>
    <q-form v-if="isMonth">
      <div class="flex bg-grey-2 full-width justify-end">
        <q-btn icon="close" flat v-close-popup />
      </div>
      <div class="row q-pa-md full-width q-gutter-y-md">
        <q-input
          dense
          label="Event Name"
          class="col-12"
          v-model="eventMonth.name"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type the name',
          ]"
        />
      </div>
      <div class="row q-pa-md full-width q-gutter-y-md">
        <q-input
          dense
          label="Event Date"
          v-model="eventMonth.date"
          filled
          type="date"
          class="col-6"
        />
        <q-input
          dense
          label="Event Time"
          v-model="eventMonth.time"
          filled
          type="time"
          class="col-6"
        />
      </div>
      <div class="row q-pa-md full-width q-gutter-y-md">
        <div class="col-12 q-pt-sm">
          <q-radio
            v-model="eventMonth.color"
            keep-color
            val="blue"
            label="Blue"
            color="blue-3"
          />
          <q-radio
            v-model="eventMonth.color"
            keep-color
            val="green"
            label="Green"
            color="green-3"
          />
          <q-radio
            v-model="eventMonth.color"
            keep-color
            val="red"
            label="Red"
            color="red-3"
          />
          <q-radio
            v-model="eventMonth.color"
            keep-color
            val="lime"
            label="Lime"
            color="lime-3"
          />
        </div>
      </div>
      <div class="flex full-width justify-end q-pa-md q-gutter-x-sm">
        <q-btn
          v-if="props.edit"
          label="Delete"
          color="red-5"
          v-close-popup
          @click="$emit('deleteEvent', event)"
        />
        <q-btn
          label="Save"
          :disabled="
            eventMonth.name == '' ||
            eventMonth.time == '' ||
            eventMonth.color == '' ||
            eventMonth.date == ''
              ? true
              : false
          "
          color="blue-5"
          v-close-popup
          type="submit"
          @click="
            props.edit
              ? $emit('editEvent', event)
              : $emit('newEvent', eventMonth)
          "
        />
      </div>
    </q-form>
  </div>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
const props = defineProps({
  edit: { type: Boolean, default: false },
  eventEdit: Object,
  isMonth: { type: Boolean, default: false },
});
const q = useQuasar();
const event = ref({ name: '', time: '', color: '' });
const eventMonth = ref({ name: '', time: '', date: '', color: '' });
const times = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];
onMounted(() => {
  if (props.edit) {
    console.log(props.eventEdit);
    event.value.name = props.eventEdit.name;
    event.value.time = props.eventEdit.time;
    event.value.color = props.eventEdit.color;
    event.value.id = props.eventEdit.id;
  }
});
</script>
