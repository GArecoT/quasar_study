<template>
  <q-page class="flex content-start justify-center q-mt-none">
    <div class="row full-width justify-center">
      <q-parallax :height="400" :speed="0.5">
        <template v-slot:media>
          <img
            class="my-custom-image"
            src="../../public/sky-2479213_1920.jpg"
          />
        </template>

        <h2 class="text-white">Components</h2>
      </q-parallax>
    </div>
    <div
      class="row justify-center bg-white full-width q-pa-sm"
      style="border-radius: 30px 30px 0 0; margin-top: -30px; z-index: 2"
    >
      <q-card
        class="my-card bg-green-5 text-white q-ma-sm cursor-pointer"
        style="width: 250px"
        @click="route.push('/card')"
      >
        <q-card-section>
          <div class="text-h6">Card Component</div>
          <div class="text-subtitle2">A responsive card component.</div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat>Show</q-btn>
        </q-card-actions>
      </q-card>
      <q-card
        class="my-card bg-purple-5 text-white q-ma-sm cursor-pointer"
        style="width: 250px"
        @click="route.push('/camera')"
      >
        <q-card-section>
          <div class="text-h6">Camera Component</div>
          <div class="text-subtitle2">
            A mobile friendly file form with a camera component.
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat>Show</q-btn>
        </q-card-actions>
      </q-card>
      <q-card
        class="my-card bg-yellow-8 text-white q-ma-sm cursor-pointer"
        style="width: 250px"
        @click="route.push('/calendar')"
      >
        <q-card-section>
          <div class="text-h6">Calendar Component</div>
          <div class="text-subtitle2">A drag and drop calendar component.</div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat>Show</q-btn>
        </q-card-actions>
      </q-card>
      <q-card
        class="my-card bg-blue-8 text-white q-ma-sm cursor-pointer"
        style="width: 250px"
        @click="route.push('/trip')"
      >
        <q-card-section>
          <div class="text-h6">Trips</div>
          <div class="text-subtitle2">Components for a turing web store.</div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat>Show</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
<style lang="sass">
.my-custom-image
  filter: blur(4px)
</style>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const route = useRouter();
</script>
