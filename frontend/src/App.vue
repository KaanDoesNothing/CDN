<script lang="ts">
import { defineComponent, computed } from "vue";
import Navbar from "./components/navbar.vue";
import {useUserStore} from "./store";
import {useRoute} from "vue-router";

export default defineComponent({
  components: {Navbar},
  setup() {
    const user = useUserStore();
    const route = useRoute();

    user.updateSession();

    return {state: user, path: computed(() => route.path)};
  }
});
</script>

<template>
  <Navbar></Navbar>
  <div class="drawer drawer-mobile" v-if="path.startsWith('/dashboard') && state.user">
      <input class="drawer-toggle" id="my-drawer-2" type="checkbox">
      <div class="drawer-content">
        <router-view></router-view>
      </div>
      <div class="drawer-side p-4 w-80 bg-base-200 h-screen overflow-y-hidden">
        <label>
          <label class="text-center normal-case text-xl">General</label>
            <ul class="menu mt-2">
              <li><router-link class="rounded" to="/dashboard/statistics">Statistics</router-link></li>
              <li> <router-link class="rounded" to="/dashboard/uploads">Uploads</router-link></li>
              <li> <router-link class="rounded" to="/dashboard/collections">Collections</router-link></li>
              <li> <router-link class="rounded" to="/dashboard/settings">Settings</router-link></li>
            </ul>
        </label>
      </div>
  </div>

  <template v-if="!path.startsWith('/dashboard')">
    <router-view></router-view>
  </template>
</template>