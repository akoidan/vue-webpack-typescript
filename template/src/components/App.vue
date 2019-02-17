<template>
    <div class="box" @click="add" >
        click me
        <num v-for="aa in a" :i="aa" :key="aa" :a="[]"></num>
    </div>
</template>

<script lang="ts">
  import Component from "vue-class-component";
  import Vue from 'vue';
  import Num from "./pages/Num";
  import variables from "../variables.json"

  @Component({
    components: {Num}
  })
  export default class Main extends Vue {
    i: number = 0;
    a: number[] = [];
    created() {
        this.logger.log("Variable in Js example {}", variables["bodyHeight"])();
    }
    add() {
      this.a.splice(1, 0 , this.i++)
    }
  }
</script>
<style lang="sass">
    // variable in css example
    $height: get("bodyHeight")
    div
        height: 1px * $height
</style>
