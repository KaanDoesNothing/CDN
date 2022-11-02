<template>
    <router-link class="btn" to="/dashboard/collections/create">Create a collection</router-link>
    <div class="p-10 flex justify-center">
        <div class="grid lg:grid-cols-4 gap-4">
            <div v-for="collection in state.user.collections" :key="collection.id">
                <font-awesome-icon icon="fa-solid fa-folder fa-xl"/>
                <router-link :to="`/dashboard/collections/${collection.id}`">{{collection.name}}</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { useUserStore } from "../../../store";
    import {formatBytes} from "../../../utils";

    export default {
        setup() {
            const state = useUserStore();

            return {state, formatBytes};
        }
    }
</script>