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
import AppCheckbox from "@/components/ui/AppCheckbox";
import {mobile} from "@/utils/singletons";
import variablesJson from "@/variables.json";

const start = 0;

/**
 * App comp
 */
@Component({
  components: {AppCheckbox},
})
export default class App extends Vue {
  private i = start;

  private readonly a: number[] = [];

  private readonly id: string = "App";

  private readonly mobile: boolean = mobile;

  private created(): void {
    this.$logger.log("Variable in Js example {}", variablesJson.bodyHeight)();
  }

  private add(): void {
    const items: number = this.i++;
    const starI = 1;
    const end = 0;
    this.a.splice(starI, end, items);
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
