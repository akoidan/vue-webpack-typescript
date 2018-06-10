<template>
    <div class="box">
        <router-link to="/version" class="hover">Version</router-link>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
  import Component from "vue-class-component";
  import {mapState} from "vuex";
  import Vue from 'vue';

  @Component({
    computed: mapState(['growls']),
  })
  export default class Main extends Vue {

  }
</script>
<style lang="sass">
    .hover:not(:hover)
        text-decoration: none
</style>
