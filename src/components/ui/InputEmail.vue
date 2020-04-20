<template>
  <v-text-field
    label="Email"
    outlined
    data-cy="email"
    required
    :value="value"
    :rules="emailRules"
    @input="input"
  />
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator";

// https://stackoverflow.com/a/201336/3872976
const EMAIL_REGEX = /^\w+(?:[-+.']\w+)*@\w+(?:[-.]\w+)*\.\w+(?:[-.]\w+)*$/u;

@Component
export default class InputEmail extends Vue {
  @Prop()
  private readonly value!: string;

  private readonly emailRules: unknown = [
    (val: string): string|boolean => val === "" ? "E-mail is required" : true,
    (val: string): string|boolean => EMAIL_REGEX.test(val) ? true : "Enter a valid email address.",
  ];

  @Emit()
  private input(value: string): string {
    return value;
  }
}
</script>
