<template>
  <div
    class="q-pa-sm flex q-gutter-x-sm justify-center full-width"
    style="overflow: hidden; white-space: nowrap"
  >
    <div style="width: 1000px" class="q-py-md">
      <q-input
        placeholder="Balneários, Atividades, Categorias, Pousadas..."
        rounded
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:append>
          <q-btn
            label="Pesquisar"
            rounded
            unelevated
            color="primary"
            style="height: 80%; right: -5px"
            class="q-ma-none"
          />
        </template>
      </q-input>
    </div>
    <q-carousel
      autoplay
      animated
      v-model="slide"
      arrows
      infinite
      style="width: 1200px; border-radius: 20px; max-height: 400px"
      :style="
        q.screen.sm
          ? 'max-height: 300px!important'
          : q.screen.xs
          ? 'max-height: 200px!important'
          : ''
      "
    >
      <q-carousel-slide
        :name="1"
        style="border-radius: 20px"
        img-src="https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?cs=srgb&dl=pexels-samandgos-709552.jpg&fm=jpg&w=3504&h=2336"
        class="carroussel"
      >
        <BannerTripComponent
          title="Viagens para Bonito!"
          description="Venha conhecer a natureza do estado."
          btn_text="Saiba mais"
        />
      </q-carousel-slide>
      <q-carousel-slide
        :name="2"
        style="border-radius: 20px"
        img-src="https://images.pexels.com/photos/20508731/pexels-photo-20508731.jpeg?cs=srgb&dl=pexels-md-marof-billa-1328942-20508731.jpg&fm=jpg&w=6000&h=4000"
        class="carroussel"
      >
        <BannerTripComponent
          title="Trilhas e mais!"
          description="Enriqueça o seu contato com a natureza."
          btn_text="Saiba mais"
        />
      </q-carousel-slide>
    </q-carousel>
    <div class="full-width flex justify-center">
      <div
        class="q-px-xs-sm q-px-md-none q-py-sm"
        style="width: 100%; max-width: 1200px"
      >
        <span class="q-pa-sm q-mt-sm" style="font-size: 1.2rem">Cards</span>
        <Carousel
          :breakpoints="breakpoints"
          style="max-width: 1200px"
          :mouseDrag="false"
          :touchDrag="false"
        >
          <Slide v-for="card in cards" :key="card.title">
            <div class="carousel__item">
              <CardTripComponent
                class="q-my-sm"
                style="white-space: normal"
                :img="card.img"
                :title="card.title"
                :price="card.price"
                :highlight_text="card.highlight_text"
                :rating="card.rating"
                :icons="card.icons"
              />
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
    <div class="full-width flex justify-center">
      <div
        class="q-px-xs-sm q-px-md-none q-py-sm"
        style="width: 100%; max-width: 1200px"
      >
        <span class="q-pa-sm q-mt-sm" style="font-size: 1.2rem"
          >Categorias</span
        >
        <Carousel
          :breakpoints="breakpoints"
          style="max-width: 1200px"
          :mouseDrag="false"
          :touchDrag="false"
        >
          <Slide
            v-for="category in categories"
            :key="category.title"
            style="display: block !important"
          >
            <div class="carousel__item">
              <TripCategoryComponent
                class="q-my-sm"
                style="white-space: normal"
                :img="category.img"
                :title="category.title"
              />
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>
<script setup>
import 'vue3-carousel/dist/carousel.css';
import CardTripComponent from 'src/components/CardTripComponent.vue';
import BannerTripComponent from 'src/components/BannerTripComponent.vue';
import TripCategoryComponent from 'src/components/TripCategoryComponent.vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const slide = ref(1);
const q = ref(useQuasar());

const cards = [
  {
    img: 'https://agenciaygarape.com.br/file/passeio/29/im_praia-da-figueira-balneario_14.jpg',
    title: 'Balneário em Bonito com trilha e tobogã.',
    price: '100,00',
    highlight_text: 'oferta',
    rating: 4,
    icons: ['ciclismo'],
  },
  {
    img: 'https://images.pexels.com/photos/2410577/pexels-photo-2410577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Pousada com café da manhã a natureza.',
    price: '130,00',
    rating: 3.5,
    icons: ['pousada', 'café da manhã'],
  },
  {
    img: 'https://images.pexels.com/photos/20547069/pexels-photo-20547069/free-photo-of-panorama-vista-paisagem-natureza.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Trilha ao ar livre com guia.',
    price: '54,99',
    rating: 5,
    icons: ['trilha'],
  },
  {
    img: 'https://images.pexels.com/photos/788200/pexels-photo-788200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Cachoeira do rio risadinha.',
    price: '40,00',
    highlight_text: 'popular',
    rating: 4,
    icons: ['piscina'],
  },
  {
    img: 'https://images.pexels.com/photos/20489100/pexels-photo-20489100/free-photo-of-floresta-selva-mata-arvores.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Trilha de ciclismo Bonito, MS.',
    price: '67,45',
    highlight_text: 'bem avaliado',
    rating: 5,
    icons: ['ciclismo'],
  },
  {
    img: 'https://images.pexels.com/photos/889042/pexels-photo-889042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Pousada desgraça pouca é comédia.',
    price: '15,99',
    highlight_text: 'oferta',
    rating: 1,
    icons: ['pousada'],
  },
  {
    img: 'https://images.pexels.com/photos/1752806/pexels-photo-1752806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Café fazenda ao ar livre tradicional.',
    price: '40,00',
    highlight_text: 'esgota rápido',
    rating: 5,
    icons: ['café da manhã'],
  },
  {
    img: 'https://images.pexels.com/photos/18079017/pexels-photo-18079017/free-photo-of-rojas-del-paraiso.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Visitação buraco das Araraas',
    price: '170,00',
    highlight_text: 'popular',
    rating: 4,
    icons: ['piscina', 'trilha'],
  },
];

const categories = [
  {
    img: 'https://images.pexels.com/photos/20489100/pexels-photo-20489100/free-photo-of-floresta-selva-mata-arvores.jpeg',
    title: 'Cliclismo',
  },
  {
    img: 'https://images.pexels.com/photos/2233391/pexels-photo-2233391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Visitações',
  },

  {
    img: 'https://images.pexels.com/photos/2323650/pexels-photo-2323650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Trilhas',
  },

  {
    img: 'https://images.pexels.com/photos/3099994/pexels-photo-3099994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Pousadas',
  },
  {
    img: 'https://images.pexels.com/photos/3216564/pexels-photo-3216564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Café da manhã',
  },
];

const breakpoints = {
  200: {
    itemsToShow: 2,
    itemsToScroll: 2,
    snapAlign: 'start',
  },
  // 700px and up
  800: {
    itemsToShow: 3,
    itemsToScroll: 3,
    snapAlign: 'start',
  },
  // 1024 and up
  1100: {
    itemsToShow: 4,
    itemsToScroll: 4,
    snapAlign: 'start',
  },
};
</script>
<style>
.carroussel {
  padding: 0px !important;
}

.carousel__prev,
.carousel__next {
  background: #fff;
  border-radius: 100%;
  box-shadow: rgba(17, 12, 60, 18.15) 0px 0px 10px 2px;
}
</style>
