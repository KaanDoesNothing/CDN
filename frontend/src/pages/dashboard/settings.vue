<template>
    <div class="flex justify-center mt-10">
        <div class="card w-100 bg-base-100 shadow-xl m-1 text-primary-content">
            <div class="card-body">
                <h2 class="card-title">Settings</h2>
                <a class="btn" :href="download.href" download="config.sxcu">Download Config File</a>
                <div class="card-actions text-center">
                    <p><b>Do not share your token with anyone!</b></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {useUserStore} from "../../store";

export default defineComponent({
  setup() {
    const state = useUserStore();

    const configFile = JSON.stringify({
        Version: "14.1.0",
        Name: "Localhost",
        DestinationType: "ImageUploader, FileUploader",
        RequestMethod: "POST",
        RequestURL: "https://cdn.kaanlikescoding.me/upload",
        Parameters: {
            key: state.user.token
        },
        Body: "MultipartFormData",
        FileFormName: "file",
        URL: "{json:file.url}",
        DeletionURL: "{json:file.delete_url}"
    });

    return {
        state,
        download: {
            href: `data:'text/json;charset=utf-8, ${encodeURIComponent(configFile)}`
        }
    }
  }
});
</script>
