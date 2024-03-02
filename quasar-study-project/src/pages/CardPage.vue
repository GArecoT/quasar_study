<template>
  <q-page class="row items-center justify-evenly">
    <CardComponent
      title="Teste"
      text="Gato Dorme 80 horas seguidas, entenda. Olha ele dormindo peludinho, fofo demais eu amo ele já."
      authorPic="src/assets/autor.jpg"
      authorName="aaa"
      image="src/assets/Domestic_cat_sleeping.jpg"
      category="Gatinhos"
      categoryColor="blue"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardComponent from 'components/CardComponent.vue';

export default defineComponent({
  name: 'CardPage',
  components: { CardComponent },
});
</script>
