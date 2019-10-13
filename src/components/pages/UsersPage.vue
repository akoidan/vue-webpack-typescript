<template>
  <div>
    <user-comp
      v-for="user in users"
      :key="user.id"
      class="user-post"
      :user="user"
    />
  </div>
</template>
<script lang="ts">


  import UserComp from '@/components/partials/UserComp';
  import {userModule, UserState} from '@/store/users';
  import {User} from '@/types/dto';
  import {Component, Vue} from 'vue-property-decorator';
  // This is a store module class defined using vuex-module-decorators

  /**
   * List of posts
   */
  @Component({components: {UserComp}})
  export default class UsersPage extends Vue {

    @UserState
    public users!: User[];

    private id: string = 'UserPage';

    private async created(): Promise<void> {
      userModule.setUsers(await this.$api.getUsers());
    }
  }
</script>

<style lang="sass" scoped>
  .user-post
    border: 1px solid #3c3c3c
    margin: 5px
    padding: 10px

</style>
