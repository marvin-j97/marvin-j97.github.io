<template>
  <div class="text-left">
    <div class="mb-4">
      <div class="mb-1 text-sm sec--text">
        Pizzen (ganz)
      </div>
      <input
        min="0"
        step="0.25"
        class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        v-model.number="pizzaCount"
      />
    </div>

    <hr class="mt-5 mb-4 border-0 bg-gray-300 text-gray-500 h-px" />

    <div class="mb-4">
      <div class="mb-1 text-sm sec--text">
        Mehl (g)
      </div>
      <input
        readonly
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        :value="mehl | truncate"
      />
    </div>

    <div class="mb-4">
      <div class="mb-1 text-sm sec--text">
        Wasser (ml)
      </div>
      <input
        readonly
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        :value="(mehl * mwv) | truncate"
      />
    </div>

    <div class="mb-4">
      <div class="mb-1 text-sm sec--text">
        Hefe (TL)
      </div>
      <input
        readonly
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        :value="(mehl * mhv) | truncate"
      />
    </div>

    <div class="mb-4">
      <div class="mb-1 text-sm sec--text">
        Salz (TL)
      </div>
      <input
        readonly
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        :value="(mehl * msv) | truncate"
      />
    </div>

    <div class="mb-4">
      <div class="mb-1 text-sm sec--text">
        Zucker (TL)
      </div>
      <input
        readonly
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        :value="(mehl * mzv) | truncate"
      />
    </div>

    <div class="mb-4">
      <div class="mb-1 text-sm sec--text">
        Olivenöl (EL)
      </div>
      <input
        readonly
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        :value="(mehl * mov) | truncate"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";

@Component({
  components: {},
  filters: {
    truncate(num: number) {
      return num.toFixed(2);
    }
  }
})
export default class HomeView extends Vue {
  pizzaCount = 1;

  get mehl() {
    return this.pizzaCount * this.mehlPerPizza;
  }

  mehlPerPizza = 225;
  mwv = 0.5994; // Mehl-Wasser-Verhältnis
  mhv = 0.0017; // Mehl-Hefe-Verhältnis
  msv = 0.0026; // Mehl-Salz-Verhältnis
  mzv = 0.0027; // Mehl-Zucker-Verhältnis
  mov = 0.0046; // Mehl-Olivenöl-Verhältnis
}
</script>
<style lang="scss" scoped></style>
