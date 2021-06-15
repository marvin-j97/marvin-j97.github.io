<template>
  <div>
    <div class="mb-1 text-sm font-semibold sec--text">{{ title }}</div>
    <input
      readonly
      class="
        cursor-not-allowed
        shadow
        appearance-none
        border
        rounded
        w-full
        py-2
        px-3
        text-gray-700
        leading-tight
        focus:outline-none focus:shadow-outline
      "
      type="number"
      :value="value"
    />
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      type: [String, Number],
    },
    title: {
      type: [String, Number],
    },
  },
});
</script>
