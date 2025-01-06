<template>
  <div class="card p-4">
    <h5 class="card-title">Login</h5>
    <div class="card-body">
      <form @submit.prevent="login">
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
        <button type="submit" class="btn btn-primary w-100">Accedi</button>
      </form>
      <button @click="inviaPulsantePersonalizzato">
        Invia Messaggio
      </button>
      <div v-if="error" class="alert alert-danger mt-3" role="alert">
        {{ error }}
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { LogRepository } from "../repositories/LogRepository";

declare global {
  interface Window {
    typeMessage?: (message: string) => void;
  }
}

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


    // funzione inviaPulsantePersonalizzato
    const inviaPulsantePersonalizzato = () => {
      if (window.typeMessage) {
        window.typeMessage("Ciao dal pulsante personalizzato!");
      } else {
        console.error("La funzione typeMessage non è disponibile.");
      }
    };

    // Assicurati che typeMessage sia definito
    onMounted(() => {
      window.typeMessage = window.typeMessage || function (message: string) {
        console.log(`Messaggio inviato: ${message}`);
      };
    });


    return {
      email,
      password,
      error,
      login,
      inviaPulsantePersonalizzato,
    };
  },
});



import { onMounted } from 'vue';

onMounted(() => {
  // Assicurati che la funzione window.typeMessage sia definita
  window.typeMessage = window.typeMessage || function (message: string) {
    console.log(`Messaggio inviato: ${message}`);
  };
});

function inviaPulsantePersonalizzato() {
  if (window.typeMessage) {
    window.typeMessage("Ciao dal pulsante personalizzato!");
  } else {
    console.error("La funzione typeMessage non è disponibile.");
  }
}
 

</script>
