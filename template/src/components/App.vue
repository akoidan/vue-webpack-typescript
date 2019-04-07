<template>
    <div class="box" @click="add">
        click me
        <num v-for="aa in a" :i="aa" :key="aa" :a="[]"></num>
    </div>
</template>

<script lang="ts">
  import Num from '../components/pages/Num';
  import variables from '@/variables.json';
  import vue from 'vue';
  import {Component} from 'vue-property-decorator';

  /**
   * App comp
   */
  @Component({
    components: {Num}
  })
  export default class App extends vue {
    private i: number = 0;
    private a: number[] = [];

    private created(): void {
      // this.logger.log("Variable in Js example {}", variables.bodyHeight)();
    }

    private add(): void {
      const items: number = this.i++;
      this.a.splice(1, 0, items);
    }
  }
</script>
<style lang="sass">
    // variable in css example
    $height: get("bodyHeight")
    div
        height: 1px * $height
</style>
