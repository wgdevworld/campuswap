<template>
  <b-modal
    v-model="props.show"
    title="Request A Trade"
    hide-header-close
    @hide="handleClose"
    class="modal"
    body-class="position-static"
  >
    <b-overlay :show="isHandleRequestLoading" no-wrap />
    <b-form>
      <div class="form-container">
        <b-form-group label="Message (optional)" class="form-label">
          <b-form-textarea
            v-model="form.message"
            placeholder="Enter message..."
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Select Items to Offer" class="form-label">
          <div v-for="item in items" :key="item.id" class="item-checkbox">
            <label class="d-flex align-items-center">
            <input
              :value="item.id"
              v-model="form.offeredItemIds"
              type="checkbox"
              style="display: flex; flex-direction: row"
            >
          
              <img :src="item.imageUrl" alt="item.name" class="item-image" />
              <span style="font-weight: normal">{{ item.name }}</span>
          </input>
        </label>
          </div>
        </b-form-group>
      </div>
    </b-form>
    <template #modal-footer="{ Request, Cancel }">
      <b-button variant="secondary" @click="handleClose"> Cancel </b-button>
      <b-button variant="primary" @click="handlePost"> Request </b-button>
    </template>
  </b-modal>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, watch } from "vue";
import {
  CREATE_ITEM_MUTATION,
  FETCH_ITEMS_BY_USERID_QUERY,
} from "../control/ItemControl";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { CREATE_REQUEST_MUTATION } from "../control/RequestControl";

const props = defineProps({
  show: Boolean,
  item: Object,
});

const emits = defineEmits(["update:show"]);

function handleClose() {
  form.value = {
    message: "",
    offeredItemIds: [],
  };
  emits("update:show", false);
}

const isHandleRequestLoading = ref(false);

async function handlePost() {
  if (form.value.offeredItemIds.length === 0) {
    alert("Please select at least one item to trade.");
    return;
  }
  isHandleRequestLoading.value = true;
  try {
    const { mutate: createRequest } = useMutation(CREATE_REQUEST_MUTATION);
    const result = await createRequest({
      fromUserId: localStorage.getItem('userId'),
      toUserId: props.item.owner.id,
      message: form.value.message ? form.value.message : null,
      wantItemId: props.item.id,
      offeredItemIds: form.value.offeredItemIds,
    });

    if (result.data) {
      console.log("Request created successfully", result.data);
      handleClose();
    }
  } catch (e) {
    console.log(e);
    console.log(JSON.stringify(e, null, 2));
  } finally {
    isHandleRequestLoading.value = false;
  }
}

//TODO: change to current user
const { result, loading, error } = useQuery(FETCH_ITEMS_BY_USERID_QUERY, {
  userId: localStorage.getItem('userId')
});

const items = computed(() => result.value?.fetchItemsByUserId || []);

const form = ref({
  message: "",
  offeredItemIds: [],
});
</script>

<style scoped>
.modal {
  justify-content: space-between;
  align-items: center;
}
.form-container {
  width: 100%;
}
.item-checkbox {
  display: flex;
  align-items: center;
}
.item-image {
  width: 20%;
  margin-right: 2%;
  margin-left: 2%;
}
.form-label {
  font-weight: bold;
}
</style>
