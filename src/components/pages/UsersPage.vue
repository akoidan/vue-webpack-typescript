<template>
  <resource-loader class="layout-wrapper" @load="load">
    <template v-for="(user, index) in users">
      <v-list-item :key="user.title">
        <v-list-item-content>
          <v-list-item-title v-text="user.name"></v-list-item-title>
          <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider
          v-if="index + 1 < users.length"
          :key="index"
      ></v-divider>
    </template>
  </resource-loader>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {UserState, userModule} from "@/store/modules/user";
import ResourceLoader from "@/components/ui/ResourceLoader.vue";
import {ResolveHandler} from "@/utils/decorators";
import {User} from "@/types/model";

// This is a store module class defined using vuex-module-decorators

/**
 * List of posts
 */
@Component({components: {ResourceLoader}})
export default class UsersPage extends Vue {
  @UserState
  public readonly users!: User[];

  @ResolveHandler
  private async load(): Promise<void> {
    userModule.setUsers(await this.$api.getUsers());
  }
}
</script>

<style lang="sass" scoped>
  .user-post
    margin: 5px
    padding: 10px


</style>
