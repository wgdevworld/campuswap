<template>
  <div class="container mt-4">
    <!-- TODO: Search and sorting options -->
    <!-- <div class="d-flex justify-content-between mb-4">
      <b-input-group>
        <b-form-input placeholder="Search for an item"></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-primary">Search</b-button>
        </b-input-group-append>
      </b-input-group>

      <div>
        <b-button variant="outline-secondary" class="mr-2">Sort by</b-button>
        <b-button variant="outline-secondary">Category</b-button>
      </div>
    </div> -->

    <b-row>
      <b-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="item in items"
        :key="item._id"
      >
        <b-card>
          <div class="text-center">
            <b-card-img alt="Item image"></b-card-img>
          </div>
          <b-card-title>{{ item.name }}</b-card-title>
          <b-card-text>
            <p>Bought for: {{ item.boughtFor }}</p>
            <p>Used for: {{ item.usedFor }}</p>
          </b-card-text>
          <b-button variant="primary" block>Request trade</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { IItem } from "../../../server/src/models/Item";
import { useQuery } from "@vue/apollo-composable";
import { FETCH_ALL_ITEMS_QUERY } from "../control/ItemControl";

const items = ref<IItem[]>([]);

onMounted(async () => {
  const { result } = useQuery(FETCH_ALL_ITEMS_QUERY);
  items.value = result.value.fetchAllItems;
});
</script>
