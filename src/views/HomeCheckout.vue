<template>
  <div>
    <AppHeader />
    <MainForm />
  </div>
</template>

<script>
import { defineComponent } from "vue";

import AppHeader from "../components/AppHeader.vue";
import MainForm from "../components/MainForm.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    AppHeader,
    MainForm,
  },
});
</script>

<style></style>
