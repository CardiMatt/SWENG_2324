<template>
    <div class="counter">
      <h2>Contatore: {{ counter }}</h2>
      <button @click="incrementa" class="button">Incrementa</button>
      <button @click="decrementa" class="button">Decrementa</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CounterComponent",
  setup() {
    const counter = ref<number>(0); // variabile reattiva per il contatore

    const incrementa = () => {
      counter.value += 1;  // incrementa il contatore
    };

    const decrementa = () => {
      counter.value -= 1;  // decrementa il contatore
    };

    return { counter, incrementa, decrementa };
  }
});
</script>

<style scoped>
.button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #008CBA;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 5px;
}
</style>