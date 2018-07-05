<template>
    <span :class="{a: a.indexOf(i) > 0}">{{i}}</span>
</template>
<script lang="ts">
  import {State, Action, Mutation} from "vuex-class";
  import {Component, Prop, Vue} from "vue-property-decorator";

  @Component
  export default class Num extends Vue {
    @Prop() i: number;
    @Prop() a: number[];

      updated() {
        console.log('updated');
      }
      created() {
        console.log('created');
      }
  }
</script>

<style lang="sass" scoped>
</style>