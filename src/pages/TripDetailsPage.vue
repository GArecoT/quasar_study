<template>
  <div
    class="q-pa-sm flex q-gutter-x-sm justify-center full-width"
    style="overflow: hidden"
    :class="q.screen.lt.md ? 'q-mb-xl' : ''"
  >
    <div style="width: 1000px" class="q-py-md">
      <div class="flex justify-between items-center content-center">
        <p class="text-weight-bold" style="font-size: 1.5rem">
          {{ detalhes.nome }}
        </p>
        <div class="flex q-gutter-x-sm q-mb-sm">
          <q-btn
            round
            icon="ios_share"
            color="black"
            outline
            style="width: 1rem; height: 1rem"
          />
          <q-btn
            round
            :icon="detalhes.favorite ? 'favorite' : 'favorite_border'"
            :color="detalhes.favorite ? 'red-5' : 'black'"
            outline
            style="width: 1rem; height: 1rem"
            @click="detalhes.favorite = !detalhes.favorite"
          />
        </div>
      </div>
      <p>
        {{ detalhes.fornecedor }}
      </p>
      <div class="flex q-gutter-x-sm">
        <q-rating
          size="1rem"
          color="primary"
          readonly
          flat
          v-model="detalhes.rating"
          icon-half="star_half"
        />
        <span>{{ detalhes.num_avaliacoes }} avaliações</span>
      </div>
      <div class="q-my-sm">
        <imageCarousel :images="detalhes.images" />
      </div>
      <div class="flex q-my-sm q-gutter-sm">
        <q-btn
          size="0.8rem"
          outline
          rounded
          :icon="botoes.get(icone)"
          :label="icone"
          v-for="icone in detalhes.icones"
          :key="icone"
        />
      </div>
      <div class="row">
        <div class="q-pt-md col-md-8 col-xs-12 q-pr-md-xl">
          <p class="text-weight-medium">Detalhes:</p>
          <p
            class="q-pt-xs"
            :style="mostrar_mais ? '' : 'max-height: 100px; overflow: hidden'"
          >
            {{ detalhes.descricao }}
          </p>
          <div class="flex justify-center full-width">
            <q-btn
              v-if="mostrar_mais == false"
              label="Mostrar Mais"
              @click="mostrar_mais = true"
              flat
              color="black"
              size="0.8rem"
            />
          </div>
          <div class="q-pt-md">
            <q-separator />
            <q-expansion-item
              header-class="q-pa-none text-weight-medium"
              label="Destaques"
              default-opened
            >
              <div class="q-pt-sm">
                <p v-for="destaque in detalhes.destaques" :key="destaque">
                  • {{ destaque }}
                </p>
              </div>
            </q-expansion-item>

            <q-separator />
            <q-expansion-item
              header-class="q-pa-none text-weight-medium"
              label="Acessibilidade"
            >
              <p
                v-for="acessibilidade in detalhes.acessibilidade"
                :key="acessibilidade"
              >
                • {{ acessibilidade }}
              </p>
            </q-expansion-item>

            <q-separator />
            <q-expansion-item
              header-class="q-pa-none text-weight-medium"
              label="Perguntas frequêntes"
            >
              <div
                class="q-py-sm"
                v-for="pergunta in detalhes.faq"
                :key="pergunta"
              >
                <p class="text-weight-medium">{{ pergunta.pergunta }}</p>
                <p style="margin-top: -15px">{{ pergunta.resposta }}</p>
              </div>
            </q-expansion-item>

            <q-separator />
          </div>
        </div>
        <div class="col-md-4 col-xs-12" v-if="q.screen.gt.sm">
          <TripReserve :reserva="lclReserva" :detalhes="detalhes" />
        </div>
      </div>
    </div>
  </div>
  <div class="fixed-bottom full-width bg-white q-pa-sm" v-if="q.screen.lt.md">
    <q-btn
      rounded
      unelevated
      class="full-width q-py-sm"
      color="indigo-5"
      text-color="white"
      label="Reservar"
      @click="console.log(lclReserva.data)"
    >
      <q-popup-proxy>
        <TripReserve :reserva="lclReserva" :detalhes="detalhes" />
      </q-popup-proxy>
    </q-btn>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import imageCarousel from '../components/imageCarousel.vue';
import { botoes } from '../utils/trip.js';
import TripReserve from '../components/TripReserve.vue';

const q = ref(useQuasar());
const mostrar_mais = ref(false);
const detalhes = ref({
  favorite: false,
  nome: 'Balneário em Bonito com trilha e tobogã.',
  fornecedor: 'Por: Marcelo Batata Frita',
  num_avaliacoes: 102,
  icones: ['trilha', 'piscina'],
  descricao: `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa arcu, rutrum at gravida non, lacinia dictum neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec quis auctor elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut pretium massa id arcu aliquam, quis finibus leo laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus et ipsum eu arcu malesuada semper nec eget massa. Praesent iaculis, elit in lacinia elementum, erat purus porta massa, quis imperdiet nisl dui quis erat. Curabitur tempus felis nibh, et suscipit eros placerat vel.

Donec molestie pharetra enim vitae gravida. Donec in suscipit quam. Nam fermentum ut dolor id viverra. Praesent tempus quam quam, at ultrices dolor vestibulum eget. Etiam luctus justo et massa interdum, vitae laoreet arcu sodales. Aliquam feugiat a leo ut interdum. Pellentesque ornare, eros vel sagittis aliquam, risus dui tincidunt ipsum, a accumsan leo justo in tellus. Donec sollicitudin ante ante, et tempus nisl mattis in. Curabitur commodo congue dapibus. Donec aliquet tempor tellus vitae dignissim. Phasellus et neque nec neque suscipit tincidunt. Nunc ut ornare dui. Sed id tempor urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean malesuada molestie magna, id aliquam neque commodo id.

Proin ac sodales lacus, vitae gravida lorem. Fusce sagittis vitae mauris ac accumsan. Nunc porttitor, tellus sed lacinia lacinia, elit lectus hendrerit ipsum, quis aliquet urna neque ut tellus. Cras ut ligula dapibus, porttitor augue at, aliquam nibh. Nulla vehicula ipsum et nisl placerat finibus. Fusce congue felis a laoreet ornare. Nulla facilisi.

Nam risus sem, tincidunt eu felis quis, gravida scelerisque quam. Morbi sit amet accumsan lorem. Pellentesque ligula dolor, aliquam vitae leo in, commodo ornare mauris. Nullam in ullamcorper nibh. Vivamus egestas mi eu ante maximus luctus. Donec rhoncus sagittis enim eu feugiat. Praesent in mattis nibh, at mattis nisi.

Proin in diam felis. Nam a ipsum facilisis, gravida enim non, vestibulum elit. Maecenas ac consequat massa. Vestibulum scelerisque libero eu ex molestie sollicitudin. Curabitur et cursus urna. Sed pellentesque est id leo viverra, in luctus eros ornare. Mauris non arcu quis lectus malesuada maximus. Donec vestibulum mauris non sodales tempus.
  `,
  images: [
    'https://agenciaygarape.com.br/file/passeio/29/im_praia-da-figueira-balneario_14.jpg',
    'https://images.pexels.com/photos/1864189/pexels-photo-1864189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/707344/pexels-photo-707344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/756903/pexels-photo-756903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/754738/pexels-photo-754738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ],
  destaques: [
    'Almoço pantaneiro.',
    'Café da manhã gostoso.',
    'Bebida ao ar livre.',
    'Mesa de sinuca.',
    'Churrasco bom chimarrão.',
  ],
  acessibilidade: ['Rampa para cadeirantes'],
  faq: [
    { pergunta: 'Pode levar animais?', resposta: 'Não' },
    {
      pergunta: 'É permitido o uso de entorpercentres ilegais?',
      resposta: 'Não',
    },
    {
      pergunta: 'Tem estacionamento?',
      resposta: 'Tem um grande estacionamento com 825 lugares para Unos.',
    },
    {
      pergunta: 'Se cabe uno cabe algum outro tipo de carro?',
      resposta: 'Não.',
    },
  ],
  rating: 4,
  time: ['07:30', '08:00', '08:30', '09:00'],
  data_disponivel_inicio: '22/05/1999',
  data_disponivel_fim: '15/12/2024',
  datas_exessoes: ['04/07/2024', '25/12/2024', '26/06/2024'],
  pacotes: [
    {
      nome: 'Pacote básico',
      descricao: 'Pacote básico, sem nenhuma firula.',
      valor: '100,00',
      cdg: '0',
    },
    {
      nome: 'Pacote com bóia e churrasco',
      descricao:
        'Pacote com churrasco feito na hora, cerveja gelada e bóia para boiar.',
      valor: '200,00',
      cdg: '1',
    },
  ],
});

const lclReserva = ref({
  hora: detalhes.value.time[0],
  data: '',
  pacote: '',
});

onMounted(() => {
  lclReserva.value.data = new Date().toLocaleDateString().replaceAll('/', '-');
});
</script>
