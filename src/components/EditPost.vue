<template>
  <div class="posts">
    <h1>Edit Post</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="Title" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="Description" v-model="description"></textarea>
        </div>
        <div>
          <button class="app_post_btn" @click="updatePost">Update</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'EditPost',
  data () {
    return {
      title: this.$route.params.title,
      description: this.$route.params.description
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    updatePost () {
      this.$store.dispatch('editPost', {
        id: this.$route.params.id,
        title: this.title,
        description: this.description
      }).then(() => {
        this.$router.push({ name: 'Posts' })
      })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
