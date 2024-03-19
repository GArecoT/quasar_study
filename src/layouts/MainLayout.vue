<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="navbar bg-grey-3 text-black">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="lt-md"
        />

        <q-toolbar-title @click="route.push('/')" class="cursor-pointer">
          Study App
        </q-toolbar-title>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          class="gt-sm"
        />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered class="lt-md">
      <q-list class="q-mt-md">
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Card',
    link: '/card',
  },
  {
    title: 'Camera',
    link: '/camera',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const route = useRouter();

    return {
      route,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style lang="scss">
.navbar {
  height: 70px;
}
</style>
