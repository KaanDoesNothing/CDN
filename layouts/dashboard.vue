<script setup lang="ts">
import { useGlobalStore } from "@/stores/global";

const config = useRuntimeConfig();

const layout = "dashboard";

const state = useGlobalStore();
const router = useRouter();
</script>

<template>
    <div v-if="state.token">
        <div class="drawer drawer-mobile">
            <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col">
                <slot></slot>
            </div>
            <div class="drawer-side h-screen overflow-y-hidden">
                <label for="my-drawer-3" class="drawer-overlay"></label>
                <label class="bg-base-200 p-4 w-80">
                    <label class="text-center normal-case text-xl">Dashboard</label>
                    <ul class="menu mt-2">
                        <li><RouterLink class="rounded" to="/dashboard/statistics">Statistics</RouterLink></li>
                        <li> <RouterLink class="rounded" to="/dashboard/settings">Settings</RouterLink></li>
                    </ul>
                </label>
            </div>
        </div>
    </div>
</template>