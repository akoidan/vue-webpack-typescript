<template>
    <div>
        <div class="user-post" v-for="user in users" :key="user.id">
            <div>{{user.name}}</div>
            <div>{{user.email}}</div>
        </div>
    </div>
</template>
<script lang="ts">
  import { User} from '@/types/dto';
  import {Component, Prop, Vue} from 'vue-property-decorator';

  /**
   * List of posts
   */
  @Component
  export default class PostsPage extends Vue {

    private users: User[] = [];

    private async created(): Promise<void> {
      this.users = await this.$api.getUsers();
    }
  }
</script>

<style lang="sass" scoped>
   .user-post
    padding: 10px
    border: 1px solid grey
    margin: 5px

</style>
