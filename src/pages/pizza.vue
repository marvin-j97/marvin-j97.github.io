<template>
  <div class="container">
    <div class="flex justify-center flex-col">
      <div class="flex justify-center">
        <pizza-icon class="mr-3 pizza-icon" />
      </div>
      <div class="title text-5xl py-5">Pizzarechner</div>
      <div class="calculator mt-10 text-left">
        <div class="mb-4">
          <div class="mb-1 text-sm sec--text">Pizzen (ganz)</div>
          <input
            min="1"
            step="0.25"
            class="
              shadow
              appearance-none
              border
              focus:border-blue-500
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            type="number"
            v-model.number="pizzaCount"
          />
        </div>

        <hr class="mt-5 mb-4 border-0 bg-gray-300 text-gray-500 h-px" />

        <readonly-input class="mb-4" :value="truncate(mehl)" title="Mehl (g)" />

        <readonly-input class="mb-4" :value="water" title="Wasser (ml)">
          <div class="mt-1 text-sm text-gray-500">
            Nicht jede Mehlsorte kann 65% Wasser halten!
          </div>
        </readonly-input>

        <readonly-input class="mb-4" :value="yeast" title="Trockenhefe (g)">
          <div class="mt-1 text-sm text-gray-500">1 Packung = 7g</div>
        </readonly-input>

        <readonly-input class="mb-4" :value="salt" title="Salz (g)">
          <div class="mt-1 text-sm text-gray-500">
            ca. {{ truncate(salt / 20) }} EL (gehäuft)
          </div>
        </readonly-input>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import PizzaIcon from "~/components/pizza.vue";
import ReadonlyInput from "~/components/readonly_input.vue";

export default Vue.extend({
  head() {
    return {
      title: "Pizzarechner",
    };
  },
  components: {
    PizzaIcon,
    ReadonlyInput,
  },
  data() {
    return {
      pizzaCount: 1,
      mehlPerPizza: 140,

      waterRatio: 0.65,
      yeastRatio: 0.015,
      saltRatio: 0.02,
    };
  },
  computed: {
    mehl() {
      return this.pizzaCount * this.mehlPerPizza;
    },
    water() {
      return this.truncate(this.mehl * this.waterRatio);
    },
    salt() {
      return this.truncate(this.mehl * this.saltRatio);
    },
    yeast() {
      return this.truncate(this.mehl * this.yeastRatio);
    },
  },
  methods: {
    truncate(num) {
      return num.toFixed(2);
    },
  },
});
</script>

<style scoped>
.title {
  font-family: "Indie Flower", cursive;
}

.pizza-icon {
  width: 50px;
  height: 50px;
}
</style>
