<template>
  <div>
    <b-navbar class="nav-bar" type="dark">
      <b-navbar-brand href="/" class="nav-bar-text">CampuSwap</b-navbar-brand>
      <b-navbar-nav class="nav-bar-button-container">
        <b-button
          href="#"
          class="nav-bar-button"
          @click="showPostItemModal = true"
          >Post Items</b-button
        >
        <b-button href="/requests" class="nav-bar-button"
          >View Requests</b-button
        >
      </b-navbar-nav>
    </b-navbar>

    <router-view />
    <PostItemModal
      :show="showPostItemModal"
      @update:show="showPostItemModal = $event"
    />
  </div>
</template>

<style scoped>
.nav-bar {
  background-color: var(--blue);
}
.nav-bar-text {
  margin-left: 1rem;
  font-size: 2rem;
}
.nav-bar-button-container {
  margin-left: auto;
}
.nav-bar-button {
  margin-right: 1rem;
  background-color: var(--blue);
  border-color: var(--blue);
  font-size: 1.2rem;
}
</style>

<script setup lang="ts">
import { provide, ref } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import PostItemModal from "./components/PostItemModal.vue";

const showPostItemModal = ref(false);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

provide(DefaultApolloClient, apolloClient);
</script>
