<template>
  <div id="app">
    <div class="mt-5 p-5 rounded overflow-hidden shadow-lg text-center content">
      <div style="display: flex; align-items: center; justify-content: center">
        <pizza-icon class="mr-3 pizza-icon" />
        <div class="text-5xl py-5 heading">Pizzarechner</div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import PizzaIcon from "@/components/Pizza.vue";

// @ts-ignore
@Component({
  components: { PizzaIcon }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Indie+Flower&display=swap");

.content {
  margin-left: auto !important;
  margin-right: auto !important;
  max-width: 500px;
}

.pizza-icon {
  width: 50px;
  height: 50px;
}

.sec--text {
  opacity: 0.6;
}

.heading {
  font-family: "Indie Flower", cursive;
}

body {
  font-family: "Roboto", sans-serif;
}
</style>
