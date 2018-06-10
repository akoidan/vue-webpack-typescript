<template>
    <div class="box" @click="incVersion" v-bind:title="version">
    </div>
</template>

<script lang="ts">
  import Component from "vue-class-component";
  import {mapMutations, mapState} from "vuex";
  import Vue from 'vue';

  @Component({
    computed: {...mapState(['version'])},
    methods: {...mapMutations(['incVersion'])}
  })
  export default class Main extends Vue {

  }
</script>
<style lang="sass">


</style>
