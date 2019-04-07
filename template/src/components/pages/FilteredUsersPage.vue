<template>
    <div>
        <div class="user-post" v-for="user in filteredUsers" :key="user.id">
            <div>{{user.name}}</div>
            <div>{{user.email}}</div>
        </div>
    </div>
</template>
<script lang="ts">
  import { User} from '@/types/dto';
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Getter, Mutation, State} from 'vuex-class';

  /**
   * List of posts
   */
  @Component
  export default class FilteredUsersPage extends Vue {

    @Getter
    private readonly filteredUsers!: User[];

    @Mutation
    private readonly setUsers!: Function;

    private async created(): Promise<void> {
      this.setUsers(await this.$api.getUsers());
    }
  }
</script>

<style lang="sass" scoped>
   .user-post
    padding: 10px
    border: 1px solid grey
    margin: 5px

</style>
