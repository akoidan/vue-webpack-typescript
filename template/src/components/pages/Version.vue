<template>
    <div class="box" @click="incVersion" v-html="divData">
        <div v-bind:html="version" @click></div>
    </div>
</template>

<script lang="ts">
  import vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {Mutation, State} from 'vuex-class';

  /**
   * Version comp
   */
  @Component
  export default class Version extends vue {
      @State
      private version!: number;
      @Mutation
      private incVersion!: () => void ;
      get divData(): string {
        return `Vuex mapped state sample: ${this.version}. Click to mutate`;
      }
  }
</script>
<style lang="sass">


</style>
