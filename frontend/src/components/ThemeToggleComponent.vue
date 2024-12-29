<template>
    <div :class="themeClass" class="theme-container">
      <button @click="toggleTheme" class="button">Cambia Tema</button>
      <p>Il tema attuale è: {{ theme }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ThemeToggleComponent",
  setup() {
    const theme = ref<string>("light"); // tema iniziale: chiaro
    const themeClass = ref<string>("light-theme"); // classe per il tema

    const toggleTheme = () => {
      if (theme.value === "light") {
        theme.value = "dark";
        themeClass.value = "dark-theme";
      } else {
        theme.value = "light";
        themeClass.value = "light-theme";
      }
    };

    return { theme, themeClass, toggleTheme };
  }
});
</script>

<style scoped>
.light-theme {
  background-color: #fff;
  color: #333;
}

.dark-theme {
  background-color: #333;
  color: #fff;
}

.theme-container {
  padding: 20px;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
}

.button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>