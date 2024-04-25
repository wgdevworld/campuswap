<template>
  <b-modal
    v-model="props.show"
    title="Post An Item"
    hide-header-close
    @hide="handleClose"
    class="modal"
    body-class="position-static"
  >
    <b-overlay :show="isHandlePostLoading" no-wrap />
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
          style="
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 4%;
          "
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
import { CREATE_ITEM_MUTATION } from "../control/ItemControl";
import { useMutation } from "@vue/apollo-composable";

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

const isHandlePostLoading = ref(false);

async function handlePost() {
  //TODO: form validation
  isHandlePostLoading.value = true;

  //FIXME: change to current user after sessions
  try {
    const formData = new FormData();
    formData.append("file", form.value.photo);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const res = await response.json();
    const imageUrl = res.imageUrl;

    const { mutate: createItem } = useMutation(CREATE_ITEM_MUTATION);
    const result = await createItem({
      name: form.value.name,
      description: form.value.description,
      boughtFor: parseFloat(form.value.boughtFor),
      usedFor: form.value.usedFor,
      ownerId: "662aa37232948d2f771ce576",
      imageUrl: imageUrl,
    });

    if (result.data) {
      console.log("Item created successfully", result.data);
      handleClose();
    }
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
  } finally {
    isHandlePostLoading.value = false;
  }
}

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
