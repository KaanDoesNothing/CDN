<script setup lang="ts">
const config = useRuntimeConfig();

const layout = "default";
</script>

<template>
    <Head>
        <Title>{{ config.public.TITLE }}</Title>
    </Head>
    <slot></slot>
</template>