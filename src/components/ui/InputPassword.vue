<template>
  <v-text-field
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :value="value"
    :label="label"
    outlined
    :type="showPassword ? 'text' : 'password'"
    :rules="rules"
    @input="input"
    @click:append="showPassword = !showPassword"
  />
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator";

@Component
export default class InputPassword extends Vue {
  @Prop()
  public readonly rules!: unknown;

  @Prop()
  public readonly value!: string;

  @Prop()
  public readonly label!: string;

  private readonly showPassword: boolean = false;

  @Emit()
  private input(value: string): string {
    return value;
  }
}
</script>
