<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-4">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" required />
        </div>
        <b-button type="submit" variant="primary" class="btn">Log In</b-button>
        <b-button type="button" href="/signup" variant="outline-primary" class="btn">
          Sign Up
        </b-button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.btn {
    margin-top: 0.5rem;
    margin-right: 0.5rem;
}
</style>

<script setup lang="ts">
const login = async () => {
  //do nothing
};
</script>
