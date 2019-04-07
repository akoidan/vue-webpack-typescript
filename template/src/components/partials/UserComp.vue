<template>
    <div>
        <div>{{user.name}}</div>
        <div>{{user.email}}</div>
    </div>
</template>

<script lang="ts">
  import {User} from '@/types/dto';
  import {Component, Prop, Vue} from 'vue-property-decorator';

  /**
   *  Renders single user
   */
  @Component
  export default class UserComp extends Vue {
    @Prop()
    private readonly user!: User;

  }
</script>
<style lang="sass" scoped>


</style>

