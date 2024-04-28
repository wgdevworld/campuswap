<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-4">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            required
          />
        </div>
        <b-button type="submit" variant="primary" class="btn">Log In</b-button>
        <b-button
          type="button"
          href="/signup"
          variant="outline-primary"
          class="btn"
        >
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
import { ref } from "vue";

const email = ref("");
const password = ref("");

const login = async () => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.user._id);
      localStorage.setItem("userId", data.user._id);
      window.location.href = "/";
    } else {
      console.error("Login failed:", await response.text());
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};
</script>
