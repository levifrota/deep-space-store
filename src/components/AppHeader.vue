<template>
  <v-app-bar color="teal-darken-4" scroll-behavior="elevate">
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img
    ></template>
    <v-btn @click="toggleTheme" style="z-index: 10" class="position-absolute"
      ><v-icon :icon="mdiThemeLightDark" size="large"></v-icon
    ></v-btn>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from "vuetify";
import { mdiThemeLightDark } from "@mdi/js";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
