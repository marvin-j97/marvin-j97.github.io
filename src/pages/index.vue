<template>
  <div class="container">
    <div class="mb-10">
      <div class="text-3xl mb-3">
        <h2>
          My <i><u>professional</u></i> github.io site
        </h2>
      </div>
      <div>
        <p><i>Lightweight. Minimal. Portable. Lightning-fast.</i></p>
      </div>
    </div>

    <div>
      <ul>
        <li class="mb-3" v-for="link in links" :key="link.name">
          <nuxt-link
            class="
              underline
              text-blue-600
              hover:text-blue-800
              visited:text-purple-600
            "
            :to="link.to"
            >{{ link.name }}</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      links: [
        // {
        //   name: 'Image dominant color extractor',
        //   to: '/color',
        // },
        {
          name: "Pizza Calculator",
          to: "/pizza",
        },
        // {
        //   name: 'Javascript & Typescript Editor',
        //   to: '/color',
        // },
      ],
    };
  },
});
</script>
