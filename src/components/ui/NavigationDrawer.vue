<template>
  <v-navigation-drawer app :value="value" @input="input">
    <v-list dense>
      <v-list-item link to="/">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/branches">
        <v-list-item-action>
          <v-icon>mdi-github-face</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Branches</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator";

@Component
export default class NavigationDrawer extends Vue {
  @Prop()
  public readonly value!: boolean;

  @Emit()
  public input(value: boolean): boolean {
    return value;
  }
}
</script>
<!-- eslint-disable -->
<style lang="sass" scoped>

</style>
