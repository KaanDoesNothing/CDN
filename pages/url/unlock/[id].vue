<template>
  <div class="text-center mt-5">
      <label class="text-4xl">This URL is protected</label>
  </div>

  <div class="flex justify-center mt-5">
      <form class="flex flex-col text-center" @submit.prevent="handleUnlock">
          <label>Enter password</label>
          <input class="p-1 rounded-md" v-model="password">
          <button>Unlock</button>
      </form>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const id = route.params.id;

const password = ref("");
const handleUnlock = async () => {
    const res: any = await $fetch(`/api/url/unlock/${id}`, {method: "POST", body: {password: password.value}});

    if(res.error) return alert(res.error.message);

    window.location.href = res.data.url;
}
</script>

<style scoped>

</style>