<template>
  <b-modal
    v-model="props.show"
    :title="props.item.name"
    hide-footer
    @hide="handleClose"
    class="modal"
    body-class="position-static"
  >
    <div class="item-details">
      <p>Description: {{ props.item.description }}</p>
      <p>Bought for: ${{ props.item.boughtFor }}</p>
      <p>Used for: {{ props.item.usedFor }}</p>
    </div>
  </b-modal>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  show: Boolean,
  item: Object,
});

const emits = defineEmits(["update:show"]);

function handleClose() {
  emits("update:show", false);
}
</script>

<style scoped>
.modal {
  justify-content: space-between;
  align-items: center;
}
</style>
