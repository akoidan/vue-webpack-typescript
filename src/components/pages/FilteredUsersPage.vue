<template>
  <div>
    <div
      v-for="user in filteredUsers"
      :key="user.id"
      class="user-post"
    >
      <div>
        {{ user.name }}
      </div>
      <div>
        {{ user.email }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {UserState, userModule} from "@/store/users";
import {User} from "@/types/dto";
// This is a store module class defined using vuex-module-decorators

/**
 * List of posts
 */
@Component
export default class FilteredUsersPage extends Vue {
  @UserState
  public readonly filteredUsers!: User[];

  private id = "FilteredUsersPage";

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
