<template>
    <div class="flex justify-center mt-10">
        <div class="card w-80 bg-base-100 shadow-xl m-1 text-primary-content">
            <div class="card-body">
                <h2 class="card-title text-white">Create shortened url</h2>
                <div class="alert alert-error shadow-lg" v-if="error">
                    <div>
                        <span>{{error}}</span>
                    </div>
                </div>
                <div class="alert alert-success shadow-lg" v-if="result.length > 0">
                    <div>
                        <span>{{result}}</span>
                    </div>
                </div>
                <form class="form-control" @submit.prevent="create">
                    <label class="label">
                        <span class="label-text">URL</span>
                    </label>
                    <input class="input input-bordered w-full max-w-xs" type="text" name="email" v-model="url"/>
                    <label class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input class="input input-bordered w-full max-w-xs" type="password" name="password" v-model="password"/>
                    <div class="card-actions text-center mt-2">
                        <button class="btn btn-ghost btn-block text-white" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

import {useGlobalStore} from "~/stores/global";
const router = useRouter();
const state = useGlobalStore();

const url = ref("");
const password = ref("");
const error = ref(undefined);
const result = ref("");

const create = async (e: Event) => {
    let body: any = {url: url.value};

    if(password.value.length > 0) body.password = password.value;

    if(state.token) body.token = state.token;

    const res: any = await $fetch("/api/upload/url", {method: "POST", body: body});

    if(res.data) {
        result.value = `${window.location.href}/${res.data.id}`;
    }

    //
    // if(res.data) {
    //     useCookie("token").value = res.data.token;
    //     await user.authenticate();
    // }else if(res.error) {
    //     error.value = res.error
    // }
}
</script>