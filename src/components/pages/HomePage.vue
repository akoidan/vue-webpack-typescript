<template>
  <div class="home-page">
    <img src="@/assets/images/vue.png"/>
    <h1>Welcome to vue-webpack-typescript!</h1>
    <p>
      For a guide how to get started with this project,<br/> check out the <a href="https://github.com/akoidan/vue-webpack-typescript">documentation</a>
    </p>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import ResourceLoader from "@/components/ui/ResourceLoader.vue";

// This is a store module class defined using vuex-module-decorators

/**
 * List of posts
 */
@Component({components: {ResourceLoader}})
export default class HomePage extends Vue {
}
</script>
<style lang="sass">
  .home-page
    margin: auto
    text-align: center

  img
    height: 100px

  p
    margin-top: 16px

</style>
