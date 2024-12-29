<script lang="ts">
import CounterComponent from '@/components/CounterComponent.vue';
import SalutoComponent from '@/components/SalutoComponent.vue';
import ThemeToggleComponent from '@/components/ThemeToggleComponent.vue';
import { defineComponent } from "vue";

export default defineComponent({
    name: "TestHomePage",
    components: {
        SalutoComponent,
        CounterComponent,
        ThemeToggleComponent
    }
});
</script>

<template>
  <main>
    <div class="test-home">
        <h1>Benvenuto nella Test Home Page!</h1>
        <SalutoComponent />
        <CounterComponent/>
        <ThemeToggleComponent/>
    </div>
  </main>
</template>

<style scoped>
.test-home {
  padding: 20px;
  text-align: center;
}
</style>

<!--????  <script setup lang="ts">   vs    <script lang="ts">    ????-->