<template>
    <div class="flex justify-center mt-10">
        <div class="card w-80 bg-base-100 shadow-xl m-1 text-primary-content">
            <div class="card-body">
                <h2 class="card-title">Create A Collection</h2>
                <div class="alert alert-error shadow-lg" v-if="error">
                <div>
                    <span>{{error}}</span>
                </div>
                </div>
                <form class="form-control" @submit.prevent="create">
                    <label class="label">
                        <span class="label-text">Collection Name</span>
                    </label>
                    <input class="input input-bordered w-full max-w-xs" type="text" name="name" v-model="name"/>
                    <div class="card-actions text-center mt-2">
                        <button class="btn btn-ghost btn-block" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {ref} from "vue";
    import {useRouter} from "vue-router";
    import Axios from "axios";

    import {useUserStore} from "../../../store";

    export default {
        setup() {
            const router = useRouter();
            const user = useUserStore();

            const name = ref("");
            const error = ref(undefined);

            async function create(e: Event) {
                const body = {name: name.value};

                const res = await Axios.post("/dashboard/collections/create", body);

                if(res.data.success) {
                    await user.updateSession();
                    router.push("/dashboard/collections");
                }else if(res.data.error) {
                    error.value = res.data.error
                }
            }

            return {create, name, error};
        }
    }
</script>