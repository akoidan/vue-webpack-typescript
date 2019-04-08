<template>
  <div>
    <div class="user-post" v-for="user in filteredUsers" :key="user.id">
      <div>{{user.name}}</div>
      <div>{{user.email}}</div>
    </div>
  </div>
</template>
<script lang="ts">
  import {User} from '@/types/dto';
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Getter, Mutation, State} from 'vuex-class';

  /**
   * List of posts
   */
  @Component
  export default class FilteredUsersPage extends Vue {

    private id: string = 'FilteredUsersPage';

    @Getter
    private readonly filteredUsers!: User[];

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
