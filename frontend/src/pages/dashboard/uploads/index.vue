<template>
    <div class="grid lg:grid-cols-4 gap-4 p-4">
        <div v-for="upload in state.user.uploads" :key="upload.id">
            <div class="card w-96 bg-base-100 shadow-xl">
            <figure><VLazyImage :src="`/${upload.file_name}`" /></figure>
                <div class="card-body">
                    <h2 class="card-title">{{upload.file_name}}</h2>
                    <p>Created on {{upload.created}}</p>
                    <div class="card-actions justify-end">
                        <router-link class="btn btn-primary" :to="`/dashboard/uploads/${upload.id}`">Manage</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    //@ts-ignore
    import VLazyImage from "v-lazy-image";
    import { useUserStore } from "../../../store";
    import {formatBytes} from "../../../utils";

    import { useRouter } from "vue-router";

    export default {
        components: {
            VLazyImage
        },
        setup() {
            const state = useUserStore();

            const router = useRouter()

            function click(id: string) {
                console.log(id)
            }

            return {state, formatBytes, router, click};
        }
    }
</script>