<template>
    <v-card class="pa-5">
      <v-card-title>Registrazione</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field v-model="email" label="Email" type="email" outlined></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" outlined></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            label="Conferma Password"
            type="password"
            outlined
          ></v-text-field>
          <v-btn class="mt-4" block color="primary" type="submit">Registrati</v-btn>
        </v-form>
        <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
        <v-alert v-if="success" type="success" class="mt-4">{{ success }}</v-alert>
      </v-card-text>
    </v-card>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase";
  import { UserRepository } from "../repositories/UserRepository";
  import { LogRepository } from "../repositories/LogRepository";
  
  export default defineComponent({
    name: "Register",
    setup() {
      const email = ref<string>("");
      const password = ref<string>("");
      const confirmPassword = ref<string>("");
      const error = ref<string | null>(null);
      const success = ref<string | null>(null);
  
      const register = async () => {
        error.value = null;
        success.value = null;
  
        if (password.value !== confirmPassword.value) {
          error.value = "Le password non corrispondono.";
          return;
        }
  
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
          const userId = userCredential.user.uid;
  
          // Salva lo user
          await UserRepository.saveUser({
            id: userId,
            email: email.value,
          });
  
          // Salva il log
          await LogRepository.saveLog({
            userId,
            timestamp: new Date(),
            action: "User registered",
          });
  
          success.value = "Registrazione avvenuta con successo!";
        } catch (err: any) {
          error.value = `Errore: ${err.message}`;
        }
      };
  
      return {
        email,
        password,
        confirmPassword,
        error,
        success,
        register,
      };
    },
  });
  </script>  
  