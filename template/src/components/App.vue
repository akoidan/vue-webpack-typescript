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

  @Component({
    components: {Num}
  })
  export default class Main extends Vue {
    i: number = 0;
    a: number[] = [];
    add() {
      this.a.splice(1, 0 , this.i++)
    }
  }
</script>
