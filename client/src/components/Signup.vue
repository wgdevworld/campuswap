<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-4">
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="email">Login</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Please enter your full duke.edu email (not netid)"
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
        <div class="form-group">
          <label for="password">Contact Info</label>
          <input
            v-model="contactInfo"
            type="text"
            placeholder="Please enter an email or phone number that users can contact you with"
            class="form-control"
            id="contactInfo"
            required
          />
        </div>
        <b-button type="submit" variant="primary" class="btn">Sign Up</b-button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.btn {
  margin-top: 0.5rem;
}
</style>

<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { CREATE_USER_MUTATION } from "../control/UserControl";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const contactInfo = ref("");
const router = useRouter();

const { mutate: createUser } = useMutation(CREATE_USER_MUTATION);
const handleSignup = async () => {
  try {
    const result = await createUser({
      email: email.value,
      password: password.value,
      contactInfo: contactInfo.value,
    });
    if (result && result.data) {
      console.log("User created successfully", result.data);
      alert("Please check your email to verify your email.");
      // router.push("/");
    }
  } catch (e) {
    console.log(e);
    console.log(JSON.stringify(e, null, 2));
  }
};
</script>
