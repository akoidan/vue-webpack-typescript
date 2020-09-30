<template>
  <div>
    <navigation-drawer v-model="drawer"/>
    <v-app-bar
      app
      color="#35495d"
      dark
    >
      <v-app-bar-nav-icon data-cy="hamburger-icon" @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Vue-webpack-typescript boilerplate</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-footer color="#35495d" app>
      <span class="white--text">&copy; Andrew Koidan</span>
    </v-footer>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import NavigationDrawer from "@/components/ui/NavigationDrawer.vue";

@Component({
  components: {NavigationDrawer},
})
export default class BasePage extends Vue {
  private drawer: boolean = false;
}
</script>
<!-- eslint-disable -->
<style lang="sass" scoped>

</style>
