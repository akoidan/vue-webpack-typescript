<template>
  <v-alert
    v-if="alert"
    :key="alert.id"
    :type="alert.type"
    :dismissible="dismissible"
    @input="close"
  >
    {{ alert.text }}
  </v-alert>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator";
import {AlertModel} from "@/types/model";

@Component
export default class AppAlert extends Vue {
  @Prop({default: false})
  public readonly dismissible!: boolean;

  @Prop()
  public readonly alert!: AlertModel;

  @Emit()
  private close(): AlertModel {
    return this.alert;
  }
}
</script>
<!-- eslint-disable -->
<style lang="sass" scoped>

</style>
