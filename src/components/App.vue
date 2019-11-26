<template>
  <div :class="{mobile}">
    <div class="top">
      <img src="@/assets/images/logo.png" />
      <router-link to="/posts">
        Posts
      </router-link>
      <router-link to="/users">
        Users
      </router-link>
      <router-link to="/filtered-users">
        Filtered Users
      </router-link>
    </div>
    <router-view />
  </div>
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
    if (!sessionHolder.session) {
      sessionHolder.session = "test";
    }
    this.$logger.log("Variable in Js example {}", variablesJson.bodyHeight)();
    sessionHolder.session = null;
  }
}
</script>
<style lang="sass" scoped>
  // variable in css example
  $height: get('bodyHeight')

  img
    height: 20px

  .top *
    margin-right: 10px
</style>
