<template>
  <div class="flex justify-center mt-10 flex-col">
      <div class="flex flex-col text-center">
          <label class="text-4xl">Woah you found my file server</label>
          <label>Anyway now that you're here try my url shortener <RouterLink class="text-blue-400" to="/url">here</RouterLink></label>
          <label>You can check the public API <RouterLink class="text-blue-400" to="/docs/api">here</RouterLink> </label>
      </div>

      <div class="mt-5 text-center">
          <label>Files served: {{servedFiles}}</label>
      </div>
  </div>
</template>

<script lang="ts" setup>
  const servedFiles = ref("Loading...");

  (async () => {
      servedFiles.value = (await $fetch("/api/stats/files") as any).data.files;
  })();
</script>