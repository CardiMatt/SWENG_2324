<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input
                type="email"
                id="email"
                v-model="email"
                required
                />
            </div>
            <div>
                <label for="password">Password:</label>
                <input
                type="password"
                id="password"
                v-model="password"
                required
                />
            </div>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <button type="submit">Login</button>
        </form>
        <p>
            Non hai un account? 
            <!--<router-link to="/register">Registrati qui</router-link>-->
        </p>
    </div>
</template>
  
  
<script setup lang="ts">
    import { ref } from "vue";
    //import { useRouter } from "vue-router";

    // Definizione degli stati
    const email = ref("");
    const password = ref("");
    const errorMessage = ref<string | null>(null);
    //const router = useRouter();

    // Funzione login
    const login = () => {
    if (email.value === "email@email.com" && password.value === "password") {
        errorMessage.value = null; // Resetta eventuali errori
       // router.push("/homeUtente"); // Reindirizza a Home
    } else {
        errorMessage.value = "Credenziali errate. Riprova.";
    }
};
</script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    font-size: 14px;
  }
  </style>
  