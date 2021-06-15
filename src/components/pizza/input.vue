<template>
  <div>
    <div class="mb-1 text-sm font-semibold sec--text">{{ title }}</div>
    <input
      v-bind="attr"
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
      v-model="innerValue"
      @change="emitChange"
    />
    <slot />
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      type: [Number, String],
    },
    attr: {
      type: Object,
      default: {},
    },
    title: {
      type: [String, Number],
    },
  },
  data() {
    return {
      innerValue: this.value.toString(),
    };
  },
  methods: {
    emitChange() {
      this.$emit("input", this.innerValue);
    },
  },
});
</script>
