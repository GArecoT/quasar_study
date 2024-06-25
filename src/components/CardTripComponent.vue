<template>
  <q-card class="bg-white card_trip shadow-1 q-mx-xs">
    <q-img
      :src="props.img"
      :ratio="10 / 9"
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
    <div class="flex">
      <div>
        <div
          class="flex full-width q-pa-sm items-center"
          style="min-height: 45px"
        >
          <span
            v-if="props.highlight_text != ''"
            style="border: 1px solid; border-radius: 5px; font-size: 0.8rem"
            class="q-py-xs q-px-sm text-weight-medium text-uppercase"
            >{{ props.highlight_text }}</span
          >
          <div
            class="q-gutter-x-sm"
            :class="props.highlight_text == '' ? '' : 'q-pl-xs'"
          >
            <q-icon
              :name="botoes.get(icon)"
              v-for="icon in props.icons"
              :key="icon"
            >
              <q-tooltip> {{ icon }} </q-tooltip>
            </q-icon>
          </div>
        </div>
        <div
          class="q-px-sm text-weight-medium text-left"
          style="
            font-size: 1rem;
            max-height: 60px;
            min-height: 60px;
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
        <q-rating
          size="1rem"
          color="primary"
          readonly
          v-model="rating"
          flat
          icon-half="star_half"
        />
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
import { botoes } from 'src/utils/trip';

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
  icons: {
    type: Array,
    required: false,
    default() {
      return [''];
    },
  },
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
  border-radius: 10px;
}
</style>
