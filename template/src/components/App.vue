<template>
    <div class="box">
        <router-link to="/version" >Vue-Router Test</router-link>
        <router-link to="/">Home Page</router-link>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
  import Component from "vue-class-component";
  import Vue from 'vue';

  @Component
  export default class Main extends Vue {

  }
</script>
<style lang="sass">
    .hover:not(:hover)
        text-decoration: none
</style>
