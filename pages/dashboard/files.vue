<template>
    <div class="grid lg:grid-cols-4 gap-4 p-4">
        <div v-for="file in files" :key="file._id">
            <div class="card w-96 bg-base-100 shadow-xl">
                <figure><VLazyImage :src="`/file/${file.file_name}`" /></figure>
                <div class="card-body">
                    <h2 class="card-title">{{file.file_name}}</h2>
                    <p>Created on {{file.createdAt}}</p>
                    <div class="card-actions justify-end">
                        <router-link class="btn btn-primary" :to="`/dashboard/uploads/${file.id}`">Manage</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useGlobalStore} from "~/stores/global";
//@ts-ignore
import VLazyImage from "v-lazy-image";

definePageMeta({
    layout: "dashboard"
});

const state = useGlobalStore();
const files = (await $fetch("/api/user/files", {method: "POST", body: {token: state.token}}) as any).data.files;
</script>

<style scoped>

</style>