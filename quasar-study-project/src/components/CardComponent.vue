<template>
  <q-card class="my-card card">
    <q-img :src="image" :ratio="16 / 9" :fit="cover" />

    <q-card-section class="q-pa-lg">
      <div :class="categoryClass">
        {{ category }}
      </div>
      <div class="text-h6 q-pt-sm">{{ title }}</div>
      <div class="text-body2 q-my-sm text-card">
        {{ text }}
      </div>
      <div class="text-h6 q-pt-sm flex">
        <q-img
          :src="authorPic"
          :ratio="1 / 1"
          :fit="cover"
          class="avatar-image q-mr-md"
        />
        <div class="q-mt-md">
          <p class="text-body1">{{ authorName }}</p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CardComponent',
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorPic: {
      type: String,
      required: true,
    },
    categoryColor: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const categoryClass =
      'text-subtitle1 q-px-md category text-white bg-' +
      props.categoryColor +
      '-10';
    return {
      categoryClass,
    };
  },
});
</script>
<style lang="scss">
.card {
  border-radius: 20px 20px 10px 10px;
  width: 400px;
  height: 510px;
}
.category {
  display: inline-block;
  border-radius: 40px;
}
.text-card {
  height: 100px;
}
.avatar-image {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
</style>
