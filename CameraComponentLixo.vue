<template>
  <div>
    <div class="row">
      <q-btn
        label="Tirar foto"
        @click="openCamera = true"
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
    <div class="row" style="height: 20px">
      <WebCamUI
        v-if="openCamera"
        ref="camera"
        @photoTaken="photoTaken"
        :fullscreenButton="{ display: true }"
        :constraints="{
          video: { width: { exact: 640 }, height: { exact: 480 } },
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { WebCamUI } from 'vue-camera-lib';
import { saveAs } from 'file-saver';
import { ref } from 'vue';
const openCamera = ref(false);
const camera = ref(null);
const photoFile = ref(null);

function photoTaken(data) {
  const file = new File([data.blob], 'photo.jpg', {
    type: 'image/jpeg',
    lastModified: new Date().getTime(),
  });
  photoFile.value = file;
  //saveAs(file, 'photo.jpg');
}
</script>
