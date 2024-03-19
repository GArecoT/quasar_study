<template>
  <q-page class="flex content-start justify-center q-mt-none">
    <div class="row full-width justify-center">
      <h2>Components</h2>
    </div>
    <div class="row justify-center">
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
    </div>
    <div class="row">
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
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const route = useRouter();
</script>
