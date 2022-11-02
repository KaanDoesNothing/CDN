<template>
    <div v-if="uploadInfo">
        <div class="p-5">
            <img class="rounded" :src="`/${uploadInfo.file_name}`" />
            <div class="text-center">
                <label class="text-xl">{{uploadInfo.file_name}} - {{formatBytes(uploadInfo.file_size)}}</label>
            </div>

            <div class="p-5 text-center">Add to collection</div>

            <div class="flex justify-center">
                <div class="p-1" v-for="collection in state.user.collections">
                    <button class="btn border-none">{{collection.name}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { useUserStore } from "../../../store";
    import {formatBytes} from "../../../utils";

    import {ref} from "vue";
    import { useRoute } from "vue-router";

    export default {
        setup() {
            const state = useUserStore();
            const route = useRoute();
            const uploadInfo = ref();

            console.log(route.params.id)
            uploadInfo.value = state.user.uploads.filter((upload: any) => upload.id === parseInt(route.params.id as string))[0];

            console.log(uploadInfo.value);

            return {state, formatBytes, uploadInfo};
        }
    }
</script>