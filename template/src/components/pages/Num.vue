<template>
    <div>
        <img :src="t8"/>
        <span :class="{a: a.indexOf(i) > 0}">{{i}}</span>
    </div>
</template>
<script lang="ts">
  import {State, Action, Mutation} from "vuex-class";
  import {Component, Prop, Vue} from "vue-property-decorator";
  import t8 from "../../assets/images/t8.svg";

  @Component
  export default class Num extends Vue {
    @Prop() i!: number;
    @Prop() a!: number[];

    get t8() {
      return t8;
    }

    updated() {
      this.logger.log("updated")();
    }

    created() {
      this.logger.log("created")();
    }
  }
</script>

<style lang="sass" scoped>
</style>
