<template>
  <v-app id="inspire">
    <div class="alerts">
      <app-alert
        v-for="alert in alerts"
        :key="alert.id"
        :alert="alert"
        dismissible
        @close="close(alert)"
      />
    </div>
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
    padding: 5px
    position: fixed
    right: 5px
    top: 5px
    z-index: 10
</style>
