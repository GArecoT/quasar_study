<template>
  <div>
    <div class="row">
      <q-btn
        label="Tirar foto"
        @click="
          () => {
            openCamera = true;
          }
        "
        class="q-mx-xs"
      ></q-btn>
      <q-file
        color="teal"
        filled
        v-model="photoFile"
        label="Foto"
        class="q-mx-xs"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" />
        </template>
      </q-file>
    </div>
    <q-dialog
      v-model="openCamera"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <div v-if="!openSavedImage">
          <WebCamUI
            ref="camera"
            @photoTaken="photoTaken"
            :fullscreenButton="{ display: false }"
            style="padding-bottom: 80px"
          />
          <div
            class="full-width bg-grey-2 absolute-bottom flex justify-between items-center q-px-sm"
            style="height: 80px; border-radius: 15px"
          >
            <q-btn
              round
              icon="close"
              color="negative"
              size="lg"
              @click="
                () => {
                  photoFile = null;
                  openCamera = false;
                }
              "
            />
            <q-btn
              round
              icon="camera"
              color="positive"
              @click="test"
              size="lg"
            />

            <q-btn
              round
              color="warning"
              size="lg"
              icon="autorenew"
              @click="rotacionar"
            />
          </div>
        </div>
        <div v-show="openSavedImage" class="flex justify-center q-pa-sm">
          <img
            src=""
            ref="imageTemp"
            style="max-width: 90vw; max-height: 70vh"
          />
          <div
            class="full-width bg-grey-2 absolute-bottom flex justify-center items-center"
            style="height: 80px; border-radius: 15px"
          >
            <q-btn
              label="Tirar outra"
              padding="20px"
              class="q-mx-xs"
              color="negative"
              @click="openSavedImage = false"
            />
            <q-btn
              label="Salvar"
              padding="20px"
              class="q-mx-xs"
              color="positive"
              @click="
                () => {
                  openCamera = false;
                  openSavedImage = false;
                }
              "
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { WebCamUI } from 'vue-camera-lib';
import { saveAs } from 'file-saver';
import { ref } from 'vue';
const openCamera = ref(false);
const openSavedImage = ref(false);
const camera = ref(null);
const photoFile = ref(null);
const imageTemp = ref();

async function test() {
  await camera.value.takePhoto();
  //openCamera.value = false;
}

function rotacionar() {
  camera.value.flipCamera();
}

function photoTaken(data) {
  const file = new File([data.blob], 'photo.jpg', {
    type: 'image/jpeg',
    lastModified: new Date().getTime(),
  });
  photoFile.value = file;
  openSavedImage.value = true;
  imageTemp.value.src = data.image_data_url;
  //openCamera.value = false;
}
</script>
