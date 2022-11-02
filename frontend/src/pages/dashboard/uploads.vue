<template>
    <div class="p-5">
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
                <tr v-for="upload in state.user.uploads" :key="upload.file_id">
                    <th>{{upload.file_name}}</th>
                    <th>{{upload.file_type}}</th>
                    <th>{{formatBytes(upload.file_size)}}</th>
                    <th>{{upload.created}}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
    import { useUserStore } from "../../store";
    import {formatBytes} from "../../utils";

    export default {
        setup() {
            const state = useUserStore();

            return {state, formatBytes};
        }
    }
</script>