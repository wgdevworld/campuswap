<template>
  <div class="requests-container">
    <ItemDetailsModal
      :show="showItemDetailModal"
      :item="selectedItem"
      :message="requestMessage"
      @update:show="showItemDetailModal = $event"
    />
    <div
      v-if="result && result.fetchReceivedRequests.length"
      class="requests-list"
    >
      <div
        v-for="request in result.fetchReceivedRequests"
        :key="request.id"
        class="request-entry"
      >
        <div class="request-images">
          <img
            :src="request.wantItem.imageUrl"
            class="item-image"
            alt="Wanted Item Image"
          />
          <span class="double-arrow">⇔</span>
          <div
            v-for="offeredItem in request.offeredItems"
            :key="offeredItem.name"
            class="offered-item"
          >
            <img
              :src="offeredItem.imageUrl"
              class="offered-item-image"
              alt="Offered Item Image"
              @click="setSelectedItem(offeredItem, request.message)"
            />
          </div>
        </div>
        <b-button @click="handleAcceptRequest(request)" class="btn-accept"
          >Accept to see contact info</b-button
        >
      </div>
    </div>
    <div v-else class="no-requests">
      <p>No requests received.</p>
    </div>
  </div>
</template>

<style scoped>
.requests-container {
  padding: 2rem;
}

.requests-list {
  margin-top: 1rem;
}

.request-images {
  display: flex;
  flex-direction: row;
}

.double-arrow {
  align-self: center;
  margin-right: 1rem;
}

.request-entry {
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.item-image {
  width: 20%;
  height: auto;
  margin-right: 1rem;
}
.offered-item {
  width: 20%;
  align-self: center;
}
.offered-item-image {
  width: 100%;
  height: auto;
}
.offered-item-image:hover {
  cursor: pointer;
}

.offered-items {
  display: flex;
  flex-direction: row;
  /* flex-wrap: wrap; */
}

.offered-item-info {
  margin-left: 1rem;
}

.btn-container {
  width: 30%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-self: center;
}

.btn-details {
  width: 50%;
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  border-color: var(--blue);
  border-width: 0.2rem;
  background-color: white;
  color: var(--blue);
  cursor: pointer;
}
.btn-accept {
  width: 50%;
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: var(--blue);
  color: white;
  cursor: pointer;
  align-self: center;
}

.no-requests {
  text-align: center;
}
</style>

<script setup lang="ts">
import { useMutation, useQuery } from "@vue/apollo-composable";
import {
  ACCEPT_REQUEST_MUTATION,
  FETCH_RECEIVED_REQUESTS_QUERY,
} from "../control/RequestControl";
import ItemDetailsModal from "../components/ItemDetailsModal.vue";
import { ref } from "vue";

const { result } = useQuery(FETCH_RECEIVED_REQUESTS_QUERY, {
  userId: localStorage.getItem('userId')
});

const { mutate: acceptRequest } = useMutation(ACCEPT_REQUEST_MUTATION);

const selectedItem = ref({});
const requestMessage = ref("");

const setSelectedItem = (item: {}, message: "") => {
  requestMessage.value = message;
  selectedItem.value = item;
  showItemDetailModal.value = true;
};

const handleAcceptRequest = async (request) => {
  try {
    const result = await acceptRequest({
      requestId: request.id,
    });
    if (result && result.data) {
      console.log("Item created successfully", result.data);
      alert(`The contact information is: ${request.fromUser.contactInfo}`);
    }
  } catch (e) {
    console.log(e);
    console.log(JSON.stringify(e, null, 2));
  }

  // delete request
  // delete all items
  // show modal with contact information
};

const showItemDetailModal = ref(false);
</script>
