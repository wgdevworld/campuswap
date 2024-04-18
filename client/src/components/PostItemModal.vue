<template>
  <b-modal
    v-model="props.show"
    title="Post An Item"
    hide-header-close
    @hide="handleClose"
    class="modal"
  >
    <b-form>
      <div class="form-container">
        <div>
          <b-form-group label="Name">
            <b-form-input v-model="form.name" required></b-form-input>
          </b-form-group>

          <b-form-group label="Description (optional)">
            <b-form-textarea
              v-model="form.description"
              placeholder="Enter description..."
            ></b-form-textarea>
          </b-form-group>

          <b-form-group label="Bought for">
            <b-form-input
              v-model="form.boughtFor"
              type="number"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Used for">
            <b-form-input
              v-model="form.usedFor"
              placeholder="e.g. 5 months"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <b-form-group
          style="width: 50%; display: flex; align-items: center; justify-content: center; margin-left: 4%;"
        >
          <div class="photo-upload" @click="onClickPhotoUpload">
            <div v-if="photoURL">
              <img
                :src="photoURL"
                alt="Uploaded photo"
                style="max-width: 100%"
              />
            </div>
            <div class="add-photo-button" v-else>Click to add photo</div>
            <input
              type="file"
              ref="photoInput"
              class="d-none"
              @change="onPhotoSelected"
              accept="image/*"
            />
          </div>
        </b-form-group>
      </div>
    </b-form>
    <template #modal-footer="{ Post, Cancel }">
      <b-button variant="secondary" @click="handleClose"> Cancel </b-button>
      <b-button variant="primary" @click="handlePost"> Post </b-button>
    </template>
  </b-modal>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  show: Boolean,
});

const emits = defineEmits(["update:show"]);

function handleClose() {
  form.value = {
    name: "",
    description: "",
    boughtFor: 0,
    usedFor: "",
    photo: null,
  };

  if (photoInput.value) {
    photoInput.value.value = "";
  }
  emits("update:show", false);
}

function handlePost() {}

const form = ref({
  name: "",
  description: "",
  boughtFor: 0,
  usedFor: "",
  photo: null,
});

const photoInput = ref(null);

const photoURL = computed(() => {
  return form.value.photo ? URL.createObjectURL(form.value.photo) : null;
});

const onClickPhotoUpload = () => {
  photoInput.value.click();
};

const onPhotoSelected = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    form.value.photo = files[0];
  }
};
</script>

<style scoped>
.modal {
  justify-content: space-between;
}
.form-container {
  display: flex;
  flex-direction: row;
}
.photo-upload {
  cursor: pointer;
  border: 2px solid #ccc;
  padding: 10px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 4px;
  transition: all 0.3s;
}
.photo-upload:hover {
  background-color: #e6e6e6;
  border-color: #aaa;
}
</style>
