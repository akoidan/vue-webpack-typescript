<template>
  <v-app id="inspire">
    <app-alert
      v-for="alert in alerts"
      :key="alert.id"
      :alert="alert"
      dismissible
      @close="close(alert)"
    />
    <router-view/>
  </v-app>
</template>
<script lang="ts">
import {AlertsState, alertsModule} from "@/store/modules/alerts";
import {Component, Vue} from "vue-property-decorator";
import {AlertModel} from "@/types/model";
import AppAlert from "@/components/ui/AppAlert.vue";
@Component({
  components: {AppAlert},
})
export default class App extends Vue {
  @AlertsState
  public alerts!: AlertModel[];

  private close(alert: AlertModel): void {
    alertsModule.removeAlert(alert);
  }
}
</script>
<style lang="sass" scoped>
  .alerts
    left: 50%
    padding: 5px
    position: fixed
    top: 50%
    transform: translate(-50%, -50%)
    z-index: 2
</style>
