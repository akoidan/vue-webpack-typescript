<template>
  <div data-cy="users-container">
    <user-comp
      v-for="user in users"
      :key="user.id"
      class="user-post"
      :user="user"
    />
  </div>
</template>
<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {UserState, userModule} from "@/store/users";
import {User} from "@/types/dto";
import UserComp from "@/components/partials/UserComp.vue";
// This is a store module class defined using vuex-module-decorators

/**
 * List of posts
 */
@Component({components: {UserComp}})
export default class UsersPage extends Vue {
  @UserState
  public users!: User[];

  private async created(): Promise<void> {
    if (false) {
      console.log("asd");
    }
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
