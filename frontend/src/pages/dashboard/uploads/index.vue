<template>
    <div class="grid lg:grid-cols-4 gap-4 p-4">
        <div v-for="upload in state.user.uploads" :key="upload.id">
            <div class="card w-96 bg-base-100 shadow-xl">
            <figure><VLazyImage :src="`/${upload.file_name}`" /></figure>
                <div class="card-body">
                    <h2 class="card-title">{{upload.file_name}}</h2>
                    <p>Created on {{upload.created}}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Manage</button>
                    </div>
                </div>
            </div>
            <!-- <font-awesome-icon icon="fa-solid fa-file"/>
            <router-link :to="`/dashboard/uploads/${upload.id}`">{{upload.file_name}}</router-link> -->
        </div>
    </div>
    <!-- <div class="p-5">
        <table class="table w-full -z-40">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                <router-link :to="'/'" v-for="upload in state.user.uploads" :key="upload.file_id" tag="tr">
                    <th>{{upload.file_name}}</th>
                    <th>{{upload.file_type}}</th>
                    <th>{{formatBytes(upload.file_size)}}</th>
                    <th>{{upload.created}}</th>
                </router-link>
            </tbody>
        </table>
    </div> -->
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