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
    <CardTripComponent
      img="https://roteirobonitoms.com.br/wp-content/uploads/2022/06/balneareo-municipal-bonito-4.jpg"
      title="Balneário Municipal com mergulho, ciclismo e café da manhã"
      price="200,00"
      highlight_text="Mais vendido"
      :rating="4"
      cycling
      diving
      breakfast
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardComponent from 'components/CardComponent.vue';
import CardTripComponent from '../components/CardTripComponent.vue';

export default defineComponent({
  name: 'CardPage',
  components: { CardComponent, CardTripComponent },
});
</script>
