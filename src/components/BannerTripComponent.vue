<template>
  <div class="full-width q-pa-none full-height text-white">
    <div
      class="flex content-end items-end full-width q-pa-sm full-height banner-trip-content"
    >
      <span
        class="text-weight-medium q-px-sm full-width"
        style="font-size: 1.8rem; white-space: normal"
      >
        {{ props.title }}
      </span>
      <span class="q-px-sm q-pb-md full-width" style="white-space: normal">
        {{ props.description }}
      </span>
      <div class="q-pa-sm q-gutter-sm full-width">
        <q-btn
          no-caps
          unelevated
          rounded
          color="white"
          :label="props.btn_text"
          text-color="black"
          class="q-ma-none"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  img: {
    type: String,
    required: true,
    default: 'https://cdn.quasar.dev/img/parallax2.jpg',
  },
  title: {
    type: String,
    required: true,
    default: 'Title',
  },
  description: {
    type: String,
    required: true,
    default: 'Description',
  },
  btn_text: { type: String, required: true, default: 'More info' },
});
</script>
<style>
.banner-trip-content {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)) !important;
}
</style>
