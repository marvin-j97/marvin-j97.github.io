<template>
  <div class="container pt-10">
    <div class="flex justify-center">
      <pizza-icon class="mr-3 pizza-icon" />
    </div>
    <div class="title text-center text-5xl py-5">Pizzarechner</div>

    <div>
      <div class="mb-4" v-for="warning in warnings" :key="warning">
        <div
          class="
            border border-yellow-400
            rounded
            bg-yellow-100
            px-4
            py-3
            text-yellow-700
          "
        >
          <p>{{ warning }}</p>
        </div>
      </div>
    </div>

    <div class="calculator mt-5 text-left">
      <div class="mb-4">
        <writable-input
          title="Pizzen (ganz)"
          :attr="{
            min: 1,
            type: 'number',
          }"
          v-model.number="pizzaCount"
        />
      </div>

      <hr class="mt-5 mb-4 border-0 bg-gray-300 text-gray-500 h-px" />

      <readonly-input class="mb-4" :value="truncate(farina)" title="Mehl (g)" />

      <readonly-input class="mb-4" :value="water" title="Wasser (ml)" />

      <readonly-input class="mb-4" :value="yeast" title="Trockenhefe (g)">
        <div class="mt-1 text-sm text-gray-500">1 Packung = 7g</div>
      </readonly-input>

      <readonly-input class="mb-4" :value="salt" title="Salz (g)">
        <div class="mt-1 text-sm text-gray-500">
          ca. {{ truncate(salt / 20) }} EL (gehäuft)
        </div>
      </readonly-input>

      <hr />

      <div
        @click="showAdvancedSettings = !showAdvancedSettings"
        class="flex cursor-pointer items-center mt-2 mb-5 text-sm text-gray-500"
      >
        <div>
          <svg
            v-if="showAdvancedSettings"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="font-semibold">Erweitert</div>
      </div>

      <div class="pb-10" v-if="showAdvancedSettings">
        <div class="mb-4">
          <writable-input
            title="Mehl pro Pizza"
            :attr="{
              min: 1,
              type: 'number',
            }"
            v-model.number="farinaPerPizza"
          >
            <div class="mt-1 text-sm text-gray-500">
              100g = Klein, 140g = Medium, 180g = Groß
            </div>
          </writable-input>
        </div>

        <div class="mb-4">
          <writable-input
            title="Hydration (%)"
            :attr="{
              min: 50,
              type: 'number',
              step: 0.5,
            }"
            v-model.number="waterPercent"
          >
            <div class="mt-1 text-sm text-gray-500">
              Nicht jede Mehlsorte kann 65+% Wasser halten!
            </div>
          </writable-input>
        </div>

        <div class="mb-4">
          <writable-input
            title="Hefeanteil (%)"
            :attr="{
              type: 'number',
              step: 0.1,
            }"
            v-model.number="yeastPercent"
          />
        </div>

        <div class="mb-4">
          <writable-input
            title="Salzanteil (%)"
            :attr="{
              type: 'number',
              step: 0.1,
            }"
            v-model.number="saltPercent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import WritableInput from "~/components/pizza/input.vue";
import PizzaIcon from "~/components/pizza/icon.vue";
import ReadonlyInput from "~/components/pizza/readonly_input.vue";

function toPercent(num) {
  return num * 100;
}

function toRatio(num) {
  return num / 100;
}

export default Vue.extend({
  head() {
    return {
      title: "Pizzarechner",
    };
  },
  components: {
    PizzaIcon,
    ReadonlyInput,
    WritableInput,
  },
  data() {
    return {
      showAdvancedSettings: false,

      pizzaCount: 1,

      farinaPerPizza: 140,
      waterRatio: toRatio(65),
      yeastRatio: toRatio(1),
      saltRatio: toRatio(2),
    };
  },
  computed: {
    warnings() {
      const warnings = [];

      if (this.waterPercent < 55) {
        warnings.push(`Niedrige Hydration: ${this.waterPercent}%!`);
      } else if (this.waterPercent >= 65) {
        warnings.push(`Hohe Hydration: ${this.waterPercent}%!`);
      }

      return warnings;
    },

    saltPercent: {
      get() {
        return toPercent(this.saltRatio);
      },

      set(percent) {
        this.saltRatio = toRatio(percent);
      },
    },

    yeastPercent: {
      get() {
        return toPercent(this.yeastRatio);
      },

      set(percent) {
        this.yeastRatio = toRatio(percent);
      },
    },

    waterPercent: {
      get() {
        return toPercent(this.waterRatio);
      },

      set(percent) {
        this.waterRatio = toRatio(percent);
      },
    },

    farina() {
      return this.pizzaCount * this.farinaPerPizza;
    },
    water() {
      return this.truncate(this.farina * this.waterRatio);
    },
    salt() {
      return this.truncate(this.farina * this.saltRatio);
    },
    yeast() {
      return this.truncate(this.farina * this.yeastRatio);
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
