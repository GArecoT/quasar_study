<template>
  <q-card class="bg-white category-trip shadow-1 q-mx-xs">
    <q-img :src="props.img" :ratio="4 / 4" style="border-radius: 10px">
      <div
        class="flex content-end items-end full-width q-pa-sm full-height banner-trip-content"
      >
        <span
          class="text-weight-medium q-px-sm full-width"
          style="font-size: 1.8rem; white-space: normal"
        >
          {{ props.title }}
        </span>
      </div>
    </q-img>
  </q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  img: {
    type: String,
    required: true,
    default: 'https://cdn.quasar.dev/img/parallax2.jpg',
  },
  title: { type: String, required: true, default: '' },
});
const rating = ref(props.rating);
const favorite = ref(props.favorite);
onMounted(() => {
  rating.value = props.rating;
  favorite.value = props.favorite;
});
</script>
<style>
.category-trip {
  border-radius: 10px;
}
.banner-trip-content {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)) !important;
}
</style>
