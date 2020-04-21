<template>
  <resource-loader @load="load">
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Value</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(v,k) in commit" :key="k">
            <td>{{ k }}</td>
            <td>{{ v }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
  </resource-loader>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {CommitResponse} from "@/types/gitCommit";
import {ResolveHandler} from "@/utils/decorators";
import ResourceLoader from "@/components/ui/ResourceLoader.vue";
@Component({
  components: {ResourceLoader},
})
export default class RepoCommitPage extends Vue {
  @Prop()
  public readonly id!: string;

  private commit: CommitResponse|null = null;

  @ResolveHandler
  public async load(): Promise<void> {
    this.commit = await this.$api.getCommit(this.id);
  }
}
</script>
<!-- eslint-disable -->
<style lang="sass" scoped>

</style>
