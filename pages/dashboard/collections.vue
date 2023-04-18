<template>
    <div class="grid lg:grid-cols-4 gap-4 p-4">
        <div v-for="collection in collections" :key="collection._id">
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{{collection.name}}</h2>
                    <p>Created on {{collection.createdAt}}</p>
                    <div class="card-actions justify-end">
                        <router-link class="btn btn-primary" :to="`/dashboard/collection/${collection.name}`">Manage</router-link>
                    </div>
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

<style scoped>

</style>