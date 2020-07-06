<template>
  <div id="app">
    <div class="heading">
      Get image dominant colors
    </div>
    <div style="text-align: center; opacity: 0.66; font-size: 18px;">
      (Drop an image file somewhere)
    </div>

    <div style="margin-top: 40px; display: flex; justify-content: center">
      <div>
        <img id="image" v-if="imgSource" width="360" :src="imgSource" />
      </div>
    </div>
    <div class="swatch-container">
      <swatch
        v-for="(swatch, key) in swatches"
        :key="key"
        :value="{ hex: swatch, name: key }"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vibrant from "node-vibrant";

import Swatch from "./components/Swatch.vue";

import { getImageBase64 } from "./util/image";

export default {
  name: "App",
  components: { Swatch },
  data() {
    return {
      imgSource: null,
      swatches: {},
    };
  },
  mounted() {
    function allowDrag(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    }

    document.addEventListener("dragenter", allowDrag);
    document.addEventListener("dragover", allowDrag);
    document.addEventListener("dragend", allowDrag);

    document.addEventListener("drop", (event) => {
      event.preventDefault();
      this.dropHandler(event);
    });
  },
  methods: {
    dropHandler(event) {
      let droppedFiles = event.dataTransfer.files;
      if (!droppedFiles) return;

      const file = droppedFiles[0];
      if (!file) return;

      this.displayImage(file);
    },
    async displayImage(file) {
      try {
        const base64 = await getImageBase64(file);
        this.imgSource = base64;
        this.$nextTick(() => {
          this.getSwatches();
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getSwatches() {
      const el = document.getElementById("image");
      try {
        const palette = await Vibrant.from(el).getPalette();
        for (const key in palette) {
          const value = palette[key];
          Vue.set(this.swatches, key, value.hex);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");

* {
  font-family: "Lato", sans-serif;
}

#image {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.33),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.pointer {
  cursor: pointer;
}

.heading {
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 25px;
}

.swatch-container {
  margin-top: 25px;
  display: flex;
  justify-content: center;
}

.drop-zone {
  border: 2px solid grey;
  border-radius: 10px;
  width: 300px;
  max-width: 100vw;
  height: 150px;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;

  span {
    font-size: 18px;
  }
}

.drop-zone-container {
  display: flex;
  justify-content: center;
}
</style>
