<template>
    <Html data-theme="night"></Html>
    <NuxtLoadingIndicator />
    <NuxtLayout>
        <Navbar></Navbar>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    import {useGlobalStore} from "~/stores/global";

    const state = useGlobalStore();
    state.authenticate();
</script>