<script lang="ts">
import { defineComponent } from "vue";
import {useUserStore} from "../store";

export default defineComponent({
  setup() {
    const state = useUserStore();
    
    return {state};
  }
});
</script>

<template>
    <div class="navbar bg-base-200">
        <div class="navbar-start">
            <router-link class="btn btn-ghost normal-case text-xl" to="/">CDN</router-link>
        </div>
        <div class="navbar-end">
            <router-link class="btn" v-if="state.user" to="/dashboard/statistics">Dashboard</router-link>
            <template v-if="!state.user">
                <div class="btn-group">
                    <router-link class="btn" to="/auth/login">Login</router-link>
                    <router-link class="btn" to="/auth/register">Register</router-link>
                </div>
            </template>
        </div>
    </div>
</template>