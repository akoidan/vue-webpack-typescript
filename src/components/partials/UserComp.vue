<template>
  <div>
    <div>
      {{ user.name }}
    </div>
    <div>
      {{ user.email }}
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {User} from "@/types/dto";

/**
 *  Renders single user
 */
@Component
export default class UserComp extends Vue {
  private id = "UserComp";

  @Prop()
  private readonly user!: User;
}
</script>
<style lang="sass" scoped>


</style>

