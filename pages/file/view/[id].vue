<template>
    <Head>
        <Meta :content="fileInfo.file_name" property="og:title"/>
        <Meta :content="description" property="og:description"/>
        <Meta content="@twitter_handle" name="twitter:site"></Meta>
        <Meta :content="fileInfo.file_name" name="twitter:title"></Meta>
        <Meta :content="description" name="twitter:description"></Meta>

        <template v-if="fileInfo.file_type === 'image'">
            <Meta :content="fetchedFileInfo.data.url" name="twitter:image:src"></Meta>
            <Meta :content="fetchedFileInfo.data.url" property="og:image"></Meta>
            <Meta content="summary_large_image" name="twitter:card"></Meta>
        </template>
    </Head>
    <div class="flex justify-center mt-10 p-5">
          <div class="flex flex-col text-center">
              <template v-if="fileInfo.file_type === 'image'">
                  <img :src="fetchedFileInfo.data.url" class="rounded-md">

              </template>

              <label class="font-bold">{{fileInfo.file_name}}</label>

              <template v-if="state.token && fileInfo.file_type === 'image'">
                  <div class="mt-10 bg-gray-800 p-5 rounded">
                      <label>Add to favorites</label>
                      <select class="select w-full max-w-xs mt-1" v-model="selected">
                          <option disabled selected>{{ selectString }}</option>
                          <option v-for="collection in collections">{{ collection.name }}</option>
                      </select>

                      <div class="flex flex-col mt-2">
                          <button @click="handleAdd">Add</button>
                      </div>
                  </div>
              </template>
          </div>
    </div>
</template>

<script lang="ts" setup>
import {useGlobalStore} from "~/stores/global";

const id = useRoute().params.id;
const config = useRuntimeConfig();
const state = useGlobalStore();

const selectString = `Select collection`;

const collections = ref([]);
const selected = ref(selectString);

const fetchedFileInfo: any = await $fetch(`/api/file/info/${id}`);
const fileInfo = fetchedFileInfo.data.file;

const description = new Date(fileInfo.createdAt).toDateString();

if(state.token) {
    collections.value = (await $fetch("/api/user/collection/list", {method: "POST", body: {token: state.token}}) as any).data.collections;
}

const handleAdd = async () => {
    if(selected.value === selectString) return;

    const res: any = await $fetch("/api/user/collection/add", {method: "POST", body: {token: state.token, collection: selected.value, file_id: fileInfo.file_id}});

    if(res.error) {
        alert(res.error.message);
    }else {
        alert("File has been added to collection");
    }
}

// const content = file.file_type === "image" ? await $fetch(fetchedFileInfo.data.url) : "";
</script>

<style scoped>

</style>