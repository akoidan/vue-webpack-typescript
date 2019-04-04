<template>
    <div>
        <img :src="t8"/>
        <span :class="{a: a.indexOf(i) > 0}">{{i}}</span>
    </div>
</template>
<script lang="ts">
  import logoPng from '@/assets/images/logo.png';
  import {Component, Prop, Vue} from 'vue-property-decorator';

  /**
   * Num comp
   */
  @Component
  export default class Num extends Vue {
    @Prop()
    private i!: number;
    @Prop()
    private a!: number[];

    get t8(): unknown {
      return logoPng;
    }

    private updated(): void {
      this.logger.log('updated')();
    }

    private created(): void {
      this.logger.log('created')();
    }
  }
</script>

<style lang="sass" scoped>
</style>
