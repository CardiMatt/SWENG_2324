<template>
    <v-card class="pa-5">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" type="email" outlined></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" outlined></v-text-field>
          <v-btn class="mt-4" block color="primary" type="submit">Accedi</v-btn>
        </v-form>
        <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
      </v-card-text>
    </v-card>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase";
  import { LogRepository } from "../repositories/LogRepository";
  
  export default defineComponent({
    name: "Login",
    setup() {
      const email = ref<string>("");
      const password = ref<string>("");
      const error = ref<string | null>(null);
  
      const login = async () => {
        error.value = null;
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
          const userId = userCredential.user.uid;
  
          // Salva il log
          await LogRepository.saveLog({
            userId,
            timestamp: new Date(),
            action: "User logged in",
          });
  
          alert("Accesso avvenuto con successo!");
        } catch (err: any) {
          error.value = `Errore: ${err.message}`;
        }
      };
  
      return {
        email,
        password,
        error,
        login,
      };
    },
  });
  </script>  
  