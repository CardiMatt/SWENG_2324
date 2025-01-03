<template>
  <div class="card p-4">
    <h5 class="card-title">Registrazione</h5>
    <div class="card-body">
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            placeholder="Inserisci la tua email"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
            placeholder="Inserisci la tua password"
          />
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Conferma Password</label>
          <input
            type="password"
            id="confirmPassword"
            class="form-control"
            v-model="confirmPassword"
            placeholder="Conferma la tua password"
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Registrati</button>
      </form>
      <div v-if="error" class="alert alert-danger mt-3" role="alert">
        {{ error }}
      </div>
      <div v-if="success" class="alert alert-success mt-3" role="alert">
        {{ success }}
      </div>
    </div>
  </div>
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
