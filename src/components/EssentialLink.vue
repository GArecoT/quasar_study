<template>
  <q-item clickable tag="a">
    <q-item-section @click="goToPage">
      <q-item-label class="text-uppercase">{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },
  },
  setup(props) {
    const route = useRouter();
    const goToPage = (a: boolean) => {
      if (a) {
        route.push(props.link);
      }
    };
    return { goToPage };
  },
});
</script>
