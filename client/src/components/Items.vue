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

    <RequestTradeModal
      :show="showRequestTradeModal"
      :item="selectedItem"
      @update:show="showRequestTradeModal = $event"
    />

    <b-row>
      <b-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="item in result?.fetchAllItems"
        :key="item._id"
      >
        <b-card class="card">
          <div class="text-center">
            <b-card-img alt="Item image" :src="item.imageUrl" />
          </div>
          <b-card-title class="item-title">{{ item.name }}</b-card-title>
          <div class="info-container">
            <div class="info">
              <div class="label">Bought for:</div>
              <div class="value">${{ item.boughtFor }}</div>
            </div>

            <div class="info">
              <div class="label">Used for:</div>
              <div class="value">{{ item.usedFor }}</div>
            </div>
          </div>
          <b-button @click="setSelectedItem(item)" class="button" block
            >Request trade</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
.button {
  background-color: var(--blue);
  width: 100%;
}
.card {
  border-color: transparent;
}
.info-container {
  display: flex;
  flex-direction: "row";
  justify-content: space-between;
  margin-bottom: 0.8rem;
}
.item-title {
  margin-top: 0.5rem;
}
.label {
  color: var(--blue);
  font-size: 0.9rem;
  font-weight: 600;
}
.info {
  width: 50%;
}
</style>
<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { FETCH_ALL_ITEMS_QUERY } from "../control/ItemControl";
import { ref } from "vue";
import RequestTradeModal from "../components/RequestTradeModal.vue";

const showRequestTradeModal = ref(false);

const selectedItem = ref({});

const setSelectedItem = (item: {}) => {
  selectedItem.value = item;
  showRequestTradeModal.value = true;
}

const { result } = useQuery(FETCH_ALL_ITEMS_QUERY);
</script>
