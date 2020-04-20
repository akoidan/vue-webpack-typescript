<template>
  <div>
    <img src="@/assets/images/vue.png"/>
    <h1>Welcome to vue-webpack-typescript!</h1>
    <p>
      For a guide how to get started with this project,<br/> check out the <a href="https://github.com/akoidan/vue-webpack-typescript">documentation</a>
    </p>
  </div>
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
export default class HomePage extends Vue {
  @UserState
  public readonly users!: User[];

  @ResolveHandler
  private async load(): Promise<void> {
    userModule.setUsers(await this.$api.getUsers());
  }
}
</script>

<style lang="sass" scoped>
  div
    margin: auto
    text-align: center
  img
    height: 100px

  p
    margin-top: 16px

</style>
