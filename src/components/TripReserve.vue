<template>
  <div
    class="q-ma-sm q-pa-md bg-grey-2 full-width shadow-2"
    style="border-radius: 20px"
  >
    <div class="flex q-gutter-x-sm">
      <q-btn
        rounded
        no-caps
        icon="calendar_today"
        :label="converteData(lclReserva.data)"
        unelevated
        color="white"
        text-color="black"
      >
        <q-popup-proxy
          ref="refData"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            :options="dateOptions"
            v-model="lclReserva.data"
            minimal
            dense
            flat
            input-debounce="500"
            mask="DD-MM-YYYY"
            @update:model-value="refData.hide()"
          />
        </q-popup-proxy>
      </q-btn>
      <q-btn
        rounded
        no-caps
        icon="schedule"
        :label="lclReserva.hora"
        unelevated
        color="white"
        text-color="black"
      >
        <q-popup-proxy
          ref="refHora"
          transition-show="scale"
          transition-hide="scale"
        >
          <div
            style="max-width: 320px"
            class="q-pa-xs justify-center flex q-gutter-sm bg-grey-2"
          >
            <q-btn
              color="white"
              text-color="black"
              style="border-radius: 10px"
              unelevated
              :label="time"
              v-for="time in lclDetalhes.time"
              :key="time"
              @click="
                lclReserva.hora = time;
                refHora.hide();
              "
            />
          </div> </q-popup-proxy
      ></q-btn>
    </div>
    <q-item
      class="q-my-sm"
      tag="label"
      v-for="pacote in lclDetalhes.pacotes"
      :key="pacote"
    >
      <q-item-section avatar top>
        <q-radio
          v-model="lclReserva.pacote"
          :val="pacote.cdg"
          color="indigo-5"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ pacote.nome }}</q-item-label>
        <q-item-label caption>{{ pacote.descricao }}</q-item-label>
      </q-item-section>
    </q-item>
    <p class="text-right q-pt-md" style="font-size: 1.2rem">
      <span class="text-weight-medium">Total: </span>R$ {{ valor }}
    </p>
    <q-btn
      :disable="parseInt(valor) <= 0"
      rounded
      unelevated
      class="full-width q-mx-sm"
      color="indigo-5"
      text-color="white"
      label="Reservar"
      v-close-popup
    />
  </div>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { ref, defineProps, watch, onMounted } from 'vue';

const props = defineProps(['reserva', 'detalhes']);
const refData = ref(null);
const refHora = ref(null);
const lclDetalhes = ref({
  nome: '',
  fornecedor: '',
  num_avaliacoes: 0,
  descricao: '',
  images: [],
  destaques: [],
  acessibilidade: [],
  faq: [],
  rating: 4,
  time: [],
  data_disponivel_inicio: '',
  data_disponivel_fim: '',
  datas_exessoes: [],
  pacotes: [],
});
const valor = ref('0,00');

const lclReserva = ref({
  hora: lclDetalhes.value.time[0],
  data: '',
  pacote: '',
});

const dias_semana = new Map([
  [0, 'Domingo'],
  [1, 'Segunda'],
  [2, 'Terça'],
  [3, 'Quarta'],
  [4, 'Quinta'],
  [5, 'Sexta'],
  [6, 'Sábado'],
]);

function validaExcessoes(date) {
  for (let data in lclDetalhes.value.datas_exessoes) {
    if (
      lclDetalhes.value.datas_exessoes[data].split('/').reverse().join('/') ==
      date
    )
      return false;
  }
  return true;
}

function dateOptions(date) {
  const temp =
    date >=
      lclDetalhes.value.data_disponivel_inicio.split('/').reverse().join('/') &&
    date >= new Date().toLocaleDateString().split('/').reverse().join('/') &&
    date <=
      lclDetalhes.value.data_disponivel_fim.split('/').reverse().join('/') &&
    validaExcessoes(date);

  return temp;
}

function converteData(date) {
  const temp = new Date(date.split('-').reverse());
  return (
    dias_semana.get(temp.getDay()) +
    ' - ' +
    temp.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' })
  );
}

watch(props.reserva, () => (lclReserva.value = props.reserva));
watch(props.detalhes, () => (lclDetalhes.value = props.detalhes));
watch(
  lclReserva,
  () =>
    lclReserva.value.pacote !== ''
      ? (valor.value =
          lclDetalhes.value.pacotes[
            lclDetalhes.value.pacotes.findIndex(
              (item) => item.cdg == lclReserva.value.pacote
            )
          ].valor)
      : '',
  { deep: true }
);

onMounted(() => {
  lclReserva.value = props.reserva;
  lclDetalhes.value = props.detalhes;
});
</script>
