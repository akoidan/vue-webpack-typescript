<template>
  <div>
    <user-comp class="user-post" :user="user" v-for="user in users"
               :key="user.id"/>
  </div>
</template>
<script lang="ts">
  import UserComp from '@/components/partials/UserComp';
  import {User} from '@/types/dto';
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Mutation, State} from 'vuex-class';

  /**
   * List of posts
   */
  @Component({components: {UserComp}})
  export default class UsersPage extends Vue {

    private id: string = 'UserPage';

    @State
    private readonly users!: User[];

    @Mutation
    private readonly setUsers!: Function;

    private async created(): Promise<void> {
      this.setUsers(await this.$api.getUsers());
    }
  }
</script>

<style lang="sass" scoped>
  .user-post
    border: 1px solid #3c3c3c
    margin: 5px
    padding: 10px

</style>
