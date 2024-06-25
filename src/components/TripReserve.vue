<template>
  <div
    class="q-ma-sm q-pa-md bg-grey-2 full-width shadow-2"
    style="border-radius: 20px"
  >
    <p class="text-weight-medium" style="font-size: 1rem">Reserve Agora!</p>
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
          ref="popup"
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
            @update:model-value="popup.hide()"
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
          ref="popup"
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
                popup.hide();
              "
            />
          </div> </q-popup-proxy
      ></q-btn>
    </div>
    <q-btn
      rounded
      unelevated
      class="full-width q-mx-sm q-mt-xl"
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
});

const lclReserva = ref({
  hora: lclDetalhes.value.time[0],
  data: '',
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

onMounted(() => {
  lclReserva.value = props.reserva;
  lclDetalhes.value = props.detalhes;
});
</script>
