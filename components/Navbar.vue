<script lang="ts" setup>
import {useGlobalStore} from "~/stores/global";

const state = useGlobalStore();
</script>

<template>
    <div class="navbar bg-base-200">
        <div class="navbar-start">
            <router-link class="btn btn-ghost normal-case text-xl" to="/">Content</router-link>
        </div>
        <div class="navbar-end">
            <router-link className="btn" v-if="state.token" to="/dashboard/statistics">Dashboard</router-link>
            <template v-if="!state.token">
                <div class="btn-group">
                    <router-link className="btn" to="/authentication/login">Login</router-link>
                    <router-link className="btn" to="/authentication/register">Register</router-link>
                </div>
            </template>
        </div>
    </div>
</template>