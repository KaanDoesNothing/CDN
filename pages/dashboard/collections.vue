<template>
    <div class="flex flex-col p-20">
        <div v-for="collection in collections" :key="collection._id" class="bg-gray-800 m-5 p-5 rounded-md">
            <div>
                <label class="text-2xl font-bold"><RouterLink :to="`/dashboard/collection/${collection.name}`">{{collection.name}}</RouterLink></label>

                <div class="flex flex-row mt-2">
                    <img v-for="file in collection.files" :src="`/file/${file.file_name}`" class="w-80 mx-1 bg-gray-800 rounded">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useGlobalStore} from "~/stores/global";

definePageMeta({
    layout: "dashboard"
});

const state = useGlobalStore();
const collections = (await $fetch("/api/user/collection/list", {method: "POST", body: {token: state.token}}) as any).data.collections;
</script>