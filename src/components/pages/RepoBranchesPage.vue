<template>
  <div>
    <h1>Repository Branches:</h1>
    <resource-loader class="layout-wrapper" @load="load">
      <template v-for="(branch, index) in branches">
        <v-list-item :key="branch.name">
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="`/commit/${branch.commit.sha}`">
                {{ branch.name }}
              </router-link>
            </v-list-item-title>
            <v-list-item-subtitle v-text="branch.commit.sha"/>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon v-if="!branch.protected">
              mdi-account-group
            </v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-divider v-if="index + 1 < branches.length" :key="index"/>
      </template>
    </resource-loader>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {GithubState, githubModule} from "@/store/modules/github";
import {Branch} from "@/types/model";
import {ResolveHandler} from "@/utils/decorators";
import ResourceLoader from "@/components/ui/ResourceLoader.vue";

/**
 * Represent list of github repositories
 */
@Component({components: {ResourceLoader}})
export default class RepoBranches extends Vue {
  @GithubState
  public readonly branches!: Branch[]|null;

  @ResolveHandler
  private async load(): Promise<void> {
    if (this.branches === null) {
      githubModule.setBranches(await this.$api.getBranches());
    }
  }
}
</script>

<style lang="sass" scoped>
  h1
    text-align: center
    padding: 10px
</style>
