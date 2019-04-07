<template>
    <div>
        <div v-for="post in posts" :key="post.id">
            <h4>{{post.title}}</h4>
            <pre>{{post.body}}</pre>
        </div>
    </div>
</template>
<script lang="ts">
  import {Post} from '@/types/dto';
  import {Component, Prop, Vue} from 'vue-property-decorator';

  /**
   * List of posts
   */
  @Component
  export default class PostsPage extends Vue {

    private id: string = 'PostsPage';

    private posts: Post[] = [];

    private async created(): Promise<void> {
      this.posts = await this.$api.getPosts();
    }
  }
</script>

<style lang="sass" scoped>
    pre, code
        direction: ltr
        text-align: left
    pre
        border: solid 1px blue
        font-size: 1.3em
        color: blue
        margin: 10px
        padding: 10px;
        background: #FFFFB3

    code
        font-size: 1.2em
        color: #008099

</style>
