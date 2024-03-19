<template>
  <div>
    <div class="row full-width justify-center">
      <q-file
        outlined
        color="teal"
        v-model="photoFile"
        @update:model-value="emitFile"
        :label="props.name"
        class="col-8"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" />
        </template>
      </q-file>
      <div class="col-4 flex justify-center items-center">
        <q-btn
          flat
          label="Tirar foto"
          @click="openCamera = true"
          class="bg-blue-4"
          style="height: 100%; width: 90%"
        />
      </div>
    </div>
    <!-- <div class="row max-width justify-center"> -->
    <!--   <q-btn label="Enviar" color="primary" class="q-ma-sm full-width" /> -->
    <!-- </div> -->
    <q-dialog
      v-model="openCamera"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <div
          class="full-width bg-primary items-center flex"
          style="height: 60px"
        >
          <span class="text-white q-ml-md" style="font-size: 1.5rem">
            {{ props.cabecalho }}
          </span>
        </div>
        <div v-show="!openSavedImage">
          <WebCam ref="camera" @photoTaken="photoTaken" />
          <div
            class="full-width bg-grey-2 flex justify-between items-center q-px-sm"
            style="
              height: 80px;
              border-radius: 15px 15px 0 0;
              position: fixed;
              bottom: 0;
            "
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
import { WebCam } from 'vue-camera-lib';
import { ref } from 'vue';
const openCamera = ref(false);
const openSavedImage = ref(false);
const camera = ref(null);
const photoFile = ref(null);
const imageTemp = ref();

const props = defineProps({
  name: String,
  cabecalho: String,
  modo: String,
});
const emits = defineEmits(['foto']);
async function test() {
  await camera.value.takePhoto();
}

async function rotacionar() {
  let deviceId = camera.value.deviceId;
  camera.value.loadCameras();
  if (camera.value.cameras.length > 1) {
    let currentIndex = camera.value.cameras.findIndex(
      (el) => el.deviceId === deviceId
    );
    let newIndex = currentIndex + 1;
    if (newIndex >= camera.value.cameras.length) {
      newIndex = 0;
    }
    deviceId = camera.value.cameras[newIndex].deviceId;
    camera.value.changeCamera(camera.value.cameras[newIndex].deviceId);
  } else {
    camera.value.loadCamera(camera.value.cameras[0].deviceId);
  }
}

function emitFile() {
  emits('foto', photoFile);
}

function log(msg) {
  console.log(msg);
}

function photoTaken(data) {
  const file = new File([data.blob], 'photo.jpg', {
    type: 'image/jpeg',
    lastModified: new Date().getTime(),
  });
  photoFile.value = file;
  emitFile();
  openSavedImage.value = true;
  imageTemp.value.src = data.image_data_url;
}
</script>
