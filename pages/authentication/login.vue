<template>
    <div class="flex justify-center mt-10">
        <div class="card w-80 bg-base-100 shadow-xl m-1 text-primary-content">
            <div class="card-body">
                <h2 class="card-title">Login</h2>
                <div class="alert alert-error shadow-lg" v-if="error">
                    <div>
                        <span>{{error}}</span>
                    </div>
                </div>
                <form class="form-control" @submit.prevent="authenticate">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input class="input input-bordered w-full max-w-xs" type="text" name="email" v-model="email"/>
                    <label class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input class="input input-bordered w-full max-w-xs" type="password" name="password" v-model="password"/>
                    <div class="card-actions text-center mt-2">
                        <button class="btn btn-ghost btn-block" type="submit">Login</button>
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
const user = useGlobalStore();

const email = ref("");
const password = ref("");
const error = ref(undefined);

async function authenticate(e: Event) {
    const body = {email: email.value, password: password.value};

    const res: any = await $fetch("/api/user/login", {method: "POST", body: {email: email.value, password: password.value}});

    if(res.data) {
        useCookie("token").value = res.data.token;
        await user.authenticate();
    }else if(res.error) {
        error.value = res.error
    }
}
</script>