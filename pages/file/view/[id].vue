<template>
    <Head>
        <Meta :content="fileInfo.file_name" property="og:title"/>
        <Meta :content="description" property="og:description"/>
        <Meta :content="fetchedFileInfo.data.url" property="og:image"></Meta>
        <Meta content="summary_large_image" name="twitter:card"></Meta>
        <Meta content="@twitter_handle" name="twitter:site"></Meta>
        <Meta :content="fileInfo.file_name" name="twitter:title"></Meta>
        <Meta :content="description" name="twitter:description"></Meta>
        <Meta :content="fetchedFileInfo.data.url" name="twitter:image:src"></Meta>
    </Head>
  <div class="flex justify-center mt-10 p-5">
      <div class="flex flex-col text-center">
          <template v-if="fileInfo.file_type === 'image'">
              <img :src="fetchedFileInfo.data.url" class="rounded-md">
          </template>

          <label class="font-bold">{{fileInfo.file_name}}</label>
      </div>
  </div>
</template>

<script lang="ts" setup>
const id = useRoute().params.id;

const fetchedFileInfo: any = await $fetch(`/api/file/info/${id}`);
const fileInfo = fetchedFileInfo.data.file;

const description = new Date(fileInfo.createdAt).toDateString();

</script>

<style scoped>

</style>