<template>
  <div>
    <input
      :id="uniqueId"
      ref="checkbox"
      type="checkbox"
      :checked="value"
      @change="input"
    />
    <label :for="uniqueId" />
  </div>
</template>
<script lang="ts">
import {Component, Emit, Prop, Ref, Vue} from "vue-property-decorator";
import {getUniqueId} from "@/utils/getUniqueId";

/**
 * Custom checkbox element
 */
@Component
export default class AppCheckbox extends Vue {
  @Prop()
  public readonly value!: boolean;

  @Ref
  checkbox: HTMLInputElement;

  private uniqueId!: string;

  @Emit
  private input(event: Event): boolean {
    return this.checkbox.checked;
  }

  private created(): void {
    this.uniqueId = `checkboxN${getUniqueId()}`;
  }
}
</script>

<style lang="sass" scoped>
  @import "~@/assets/sass/mixins"
  @import "~@/assets/sass/variables"

  input
    display: none

  label
    background-position: 0 0, 15px 0
    background-size: 100% 100%, 200% 100%
    border-radius: 25px
    box-shadow: inset 0 1px 4px hsla(0, 0%, 0%, 0.5), inset 0 0 10px hsla(0, 0%, 0%, 0.5), 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 -1px 2px 2px hsla(0, 0%, 0%, 0.25), 0 2px 2px 2px hsla(0, 0%, 100%, 0.15)
    cursor: pointer
    display: block
    height: 25px
    position: relative
    width: 75px
    @include linear-double-gradient(rgba(0, 0, 0, .1), rgba(255, 255, 255, .1), #{'gleft, #2f4e2d 50%'}, #812626 50%)
    @include transition(.25s)

    &::before
      background-color: #eee
      border-radius: 25px
      box-shadow: inset 0 1px 1px 1px hsla(0, 0%, 100%, 0.1), inset 0 -1px 1px 1px hsla(0, 0%, 0%, 0.25), 0 1px 3px 1px hsla(0, 0%, 0%, 0.5), 0 0 2px hsla(0, 0%, 0%, 0.25)
      content: ''
      display: block
      @include linear-gradient(#4B4E45, #33352F)
      height: 25px
      left: 0
      top: 0
      width: 50px

    &:checked + label
      background-position: 0 0, 35px 0 !important
      padding-left: 25px
      padding-right: 0
      width: 50px

</style>
