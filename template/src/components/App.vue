<template>
    <div class="box" @click="add">
        click me
    </div>
</template>

<script lang="ts">
  import variablesJson from '@/variables.json';
  import {Component, Vue} from 'vue-property-decorator';

  /**
   * App comp
   */
  @Component
  export default class App extends Vue {
    private i: number = 0;
    private a: number[] = [];

    private created(): void {
       this.$logger.log('Variable in Js example {}', variablesJson.bodyHeight)();
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
