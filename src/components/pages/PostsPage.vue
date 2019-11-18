<template>
  <div data-cy="posts-container">
    <div
      v-for="post in posts"
      :key="post.id"
    >
      <h4>
        {{ post.title }}
      </h4>
      <pre>
        {{ post.body }}
      </pre>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Post} from "@/types/dto";

@Component
export default class PostsPage extends Vue {
  private posts: Post[] = [];

  private async created(): Promise<void> {
    this.posts = await this.$api.getPosts();
  }
}
</script>

<style lang="sass" scoped>
  pre,
  code
    direction: ltr
    text-align: left

  pre
    background: #ffffb3
    border: solid 1px #00f
    font-size: 1.3em
    margin: 10px
    padding: 10px

  code
    color: #008099
    font-size: 1.2em

</style>
