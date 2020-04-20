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
import {AlertModel} from "@/types/model";
import {HandleLoading} from "@/utils/decorators";
import AppAlert from "@/components/ui/AppAlert.vue";

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
  public serverError: AlertModel|null = null;

  public loading: boolean = false;

  public valid: boolean = false;

  @Prop()
  public readonly value!: boolean;

  @Prop()
  public readonly buttonTitle!: string;

  @Ref()
  private readonly form!: HTMLFormElement;

  @Emit()
  public input(valid: boolean): boolean {
    this.valid = valid;
    return valid;
  }

  @HandleLoading({
    errPropName: "serverError",
    loadingPropName: "loading",
  })
  private async handleClick(event: Event): Promise<void> {
    event.preventDefault();
    if (!this.form.validate()) {
      return;
    }
    await new Promise((resolve: Function, reject: Function) => {
      this.$emit("submit", {
        reject,
        resolve,
      });
    });
  }
}
</script>
