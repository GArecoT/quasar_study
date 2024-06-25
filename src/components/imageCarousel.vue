<template>
  <div class="row" v-if="q.screen.gt.sm">
    <q-img
      img-class="q-pr-sm"
      class="cursor-pointer"
      :class="props.images.length > 1 ? 'col-9' : 'col-12'"
      :style="
        props.images.length > 1
          ? 'border-radius: 20px 0px 0px 20px'
          : 'border-radius: 20px'
      "
      :src="props.images[0]"
      :ratio="props.images.length > 1 ? 6 / 4 : 10 / 4"
      @click="
        openDialog = true;
        slide = 0;
      "
    />
    <div class="col-3 column">
      <q-img
        class="col cursor-pointer"
        style="border-radius: 0px 20px 20px 0px"
        :src="props.images[1]"
        @click="
          openDialog = true;
          slide = 1;
        "
      />
      <q-img
        class="col cursor-pointer"
        img-class="q-pt-sm"
        style="border-radius: 0px 20px 20px 0px"
        :src="props.images[2]"
        @click="
          openDialog = true;
          slide = 2;
        "
      />
      <q-img
        class="col cursor-pointer"
        img-class="q-pt-sm"
        style="border-radius: 0px 20px 20px 0px"
        :src="props.images[3]"
        @click="
          openDialog = true;
          slide = 3;
        "
      >
        <q-btn
          style="position: absolute; right: 5px; bottom: 5px"
          v-if="props.images.length > 4"
          color="grey-10"
          unelevated
          rounded
          label="Mostar todas"
        />
      </q-img>
    </div>
  </div>
  <q-carousel
    v-if="q.screen.lt.md"
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    autoplay
    swipeable
    animated
    control-color="white"
    navigation
    padding
    arrows
    :height="q.screen.xs ? '250px' : '350px'"
    style="border-radius: 20px"
    class="bg-primary text-white shadow-1 rounded-borders"
  >
    <q-carousel-slide
      :name="index"
      :img-src="item"
      v-for="(item, index) in props.images"
      :key="item"
      @click="
        openDialog = true;
        slide = index;
      "
    />
  </q-carousel>
  <q-dialog class="dialog-blur" v-model="openDialog">
    <q-carousel
      swipeable
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      v-model="slide"
      thumbnails
      infinite
      arrows
      style="
        height: 90vh !important;
        width: 90vw !important;
        max-width: 90vw !important;
        background: rgba(0, 0, 0, 0);
      "
    >
      <q-carousel-slide
        :name="index"
        :img-src="item"
        class="q-pa-none"
        v-for="(item, index) in props.images"
        :key="item"
        style="background-size: 0px"
        v-close-popup
      >
        <div class="fit flex content-center">
          <q-img class="fit" :src="item" fit="contain" />
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-btn
      style="position: absolute; top: 15px; right: 15px"
      color="white"
      class="text-black"
      round
      icon="close"
    />
  </q-dialog>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';

const q = ref(useQuasar());
const openDialog = ref(false);
const slide = ref(0);

const props = defineProps({
  images: { type: Array, required: true },
});
</script>
<style>
.dialog-blur {
  .q-dialog__backdrop {
    backdrop-filter: blur(5px);
  }
}
</style>
