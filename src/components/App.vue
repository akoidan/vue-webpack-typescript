<template>
  <v-app>
    <v-content>
    <v-btn>asda asdf as fasdf asdf sd fsdf sasd</v-btn>

      <v-alert type="info">
        I'm an info alert.
      </v-alert>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {mobile, sessionHolder} from "@/utils/singletons";
import variablesJson from "@/variables.json";

/**
 * App comp
 */
@Component({
  components: {},
})
export default class App extends Vue {
  private readonly mobile: boolean = mobile;

  private created(): void {
    // istanbul ignore else
    if (!sessionHolder.session) {
      sessionHolder.session = "test";
    }
    this.$logger.log("Variable in Js example {}", variablesJson.bodyHeight)();
    sessionHolder.session = null;
  }
}
</script>
<style lang="sass" scoped>

  img
    height: 20px

  .top *
    margin-right: 10px
</style>
