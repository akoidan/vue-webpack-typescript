<template>
  <v-form
    ref="form"
    lazy-validation
    @submit="handleClick"
    @input="input"
  >
    <app-alert :alert="serverError"/>
    <slot/>
    <v-btn
      type="submit"
      :disabled="!valid"
      :loading="loading"
      color="primary"
      block
    >
      {{ buttonTitle }}
    </v-btn>
    <slot name="after"/>
  </v-form>
</template>
<script lang="ts">
import {Component, Emit, Prop, Ref, Vue} from "vue-property-decorator";
import type {AlertModel} from "@/types/model";
import AppAlert from "@/components/ui/AppAlert.vue";
import {HandleLoading} from "vuex-module-decorators-state";

/**
 * Helper async operation handler that provides html form, button and handlers for doing async operation
 *
 * Example:
 * ```vue
 * <template>
 *   <submit-form v-model="valid" button-title="Submit" @submit="handleAction">
 *     <v-text v-model="username"/>
 *   </submit-form>
 * </template>
 * <script>
 *   import SubmitForm from "@/components/layout/SubmitForm.vue";
 *   import {ResolveHandler} from "@/utils/decorators";
 *
 *   @Component({components: {
 *       SubmitForm,
 *   }})
 *   export default class ForgotPasswordPage extends Vue {
 *     private readonly valid: boolean = true;
 *     private username: string = "";
 *
 *     @ResolveHandler
 *     private async handleAction(): Promise<void> {
 *       await this.$api.({username: this.username}); // any async action
 *     }
 *   }
 * </ script>
 * ```
 */
@Component({
  components: {AppAlert},
})
export default class SubmitForm extends Vue {
  @Prop()
  public readonly value!: boolean;

  @Prop()
  public readonly buttonTitle!: string;

  @Ref()
  private readonly form!: HTMLFormElement;

  public serverError: AlertModel|null = null;

  public loading: boolean = false;

  public valid: boolean = false;

  @Emit()
  public input(valid: boolean): boolean {
    this.valid = valid;
    return valid;
  }

  @HandleLoading({
    errPropNameOrCB: "serverError",
    loadingPropName: "loading",
  })
  private async handleClick(event: Readonly<Event>): Promise<void> {
    event.preventDefault();
    // TODO eslint rule
    if (!this.form.validate()) { // eslint-disable-line @typescript-eslint/no-unsafe-call
      return;
    }
    await new Promise((resolve: () => void, reject: () => void) => {
      this.$emit("submit", {
        reject,
        resolve,
      });
    });
  }
}
</script>
