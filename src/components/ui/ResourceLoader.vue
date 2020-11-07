<template>
  <div class="resource-loader">
    <div v-if="loading" class="loading-wrapper">
      <v-progress-circular
        indeterminate
        color="primary"
      />
      {{ loadingTitle }}
    </div>
    <app-alert v-else-if="serverError" :alert="serverError"/>
    <slot v-else/>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import type {AlertModel} from "@/types/model";
import AppAlert from "@/components/ui/AppAlert.vue";
import {HandleLoading} from "vuex-module-decorators-state";

/**
 * Helper async operation handler that provides html form, button and handlers for doing async operation
 *
 * Example:
 * ```vue
 * <template>
 *   <resource-loader @load="load">
 *    {{ data }}
 *   </resource>
 * </template>
 * <script>
 *   import ResourceLoader from "@/components/layout/ResourceLoader.vue";
 *   import {ResolveHandler} from "@/utils/decorators";
 *
 *   @Component({components: {
 *       ResourceLoader,
 *   }})
 *   export default class ForgotPasswordPage extends Vue {
 *     private data: string = "";
 *
 *     @ResolveHandler
 *     private async load(): Promise<void> {
 *       this.data = await this.$api.someAsyncAction();
 *     }
 *   }
 * </ script>
 * ```
 */
@Component({
  components: {AppAlert},
})
export default class ResourceLoader extends Vue {
  @Prop({
    default: "Loading",
  })
  public readonly loadingTitle!: string;

  public serverError: AlertModel|null = null;

  public loading: boolean = false;

  @HandleLoading({
    errPropNameOrCB: "serverError",
    loadingPropName: "loading",
  })
  private async created(): Promise<void> {
    await new Promise((resolve: () => void, reject: () => void) => {
      this.$emit("load", {
        reject,
        resolve,
      });
    });
  }
}
</script>
<!-- eslint-disable -->
<style lang="sass" scoped>
  .resource-loader
    padding: 10px

  .loading-wrapper
    text-align: center
</style>
