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
        <div>
          <b-form-group label="Message (optional)">
            <b-form-textarea
              v-model="form.message"
              placeholder="Enter message..."
            ></b-form-textarea>
          </b-form-group>
        </div>
      </div>
    </b-form>
    <template #modal-footer="{ Request, Cancel }">
      <b-button variant="secondary" @click="handleClose"> Cancel </b-button>
      <b-button variant="primary" @click="handlePost"> Request </b-button>
    </template>
  </b-modal>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";
import { CREATE_ITEM_MUTATION } from "../control/ItemControl";
import { useMutation } from "@vue/apollo-composable";

const props = defineProps({
  show: Boolean,
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
  //TODO: form validation
  isHandleRequestLoading.value = true;
  isHandleRequestLoading.value = false;
}

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
  display: flex;
  width: 100%;
}
</style>
