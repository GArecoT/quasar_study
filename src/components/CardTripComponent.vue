<template>
  <q-card class="bg-white card_trip">
    <q-img
      :src="props.img"
      :ratio="4 / 3"
      :fit="cover"
      style="border-radius: 10px"
    />
    <q-btn
      color="white"
      :text-color="favorite ? 'red-5' : 'grey-7'"
      icon="favorite"
      round
      unelevated
      class="cursor-pointer"
      style="position: absolute; right: 5px; top: 5px"
      @click="favorite = !favorite"
    />
    <div class="flex" style="min-height: 170px">
      <div>
        <div class="flex full-width q-pa-sm items-center">
          <span
            v-if="props.highlight_text != ''"
            style="border: 1px solid; border-radius: 5px"
            class="q-py-xs q-px-sm text-weight-medium text-uppercase"
            >{{ props.highlight_text }}</span
          >
          <div class="q-ml-xs q-gutter-x-sm">
            <q-icon name="directions_bike" v-if="props.cycling">
              <q-tooltip> Ciclismo </q-tooltip>
            </q-icon>
            <q-icon name="pool" v-if="props.pool">
              <q-tooltip> Piscina </q-tooltip>
            </q-icon>
            <q-icon name="scuba_diving" v-if="props.diving">
              <q-tooltip> Mergulho </q-tooltip>
            </q-icon>
            <q-icon name="hiking" v-if="props.hiking">
              <q-tooltip> Trilha </q-tooltip>
            </q-icon>
            <q-icon name="coffee_maker" v-if="props.breakfast">
              <q-tooltip> Café da manhã </q-tooltip>
            </q-icon>
          </div>
        </div>
        <div
          class="q-px-sm text-weight-medium"
          style="
            font-size: 1.2rem;
            max-height: 80px;
            min-height: 80px;
            overflow-y: hidden;
            text-overflow: ellipsis;
          "
        >
          {{ props.title }}
        </div>
      </div>
      <div
        class="q-pa-sm flex q-gutter-x-sm self-end justify-between q-mt-auto"
      >
        <q-rating size="1.2rem" color="primary" readonly v-model="rating" />
        <span class="q-pt-xs"
          >A partir de:
          <span class="text-weight-medium">R$ {{ props.price }}</span></span
        >
      </div>
    </div>
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
  highlight_text: { type: String, required: false, default: '' },
  price: { type: String, required: true, default: '' },
  rating: { type: Number, required: true, default: 0 },
  cycling: { type: Boolean, required: false, default: false },
  pool: { type: Boolean, required: false, default: false },
  diving: { type: Boolean, required: false, default: false },
  hiking: { type: Boolean, required: false, default: false },
  breakfast: { type: Boolean, required: false, default: false },
  favorite: { type: Boolean, required: false, default: false },
});
const rating = ref(props.rating);
const favorite = ref(props.favorite);
onMounted(() => {
  rating.value = props.rating;
  favorite.value = props.favorite;
});
</script>
<style>
.card_trip {
  min-width: 300px;
  min-height: 400px;
  max-width: 300px;
  max-height: 400px;
  border-radius: 10px;
}
</style>
