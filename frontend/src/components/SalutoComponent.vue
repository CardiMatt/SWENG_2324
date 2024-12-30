<template>
    <div class="saluto">
      <input 
        v-model="nome" 
        type="text" 
        placeholder="Inserisci il tuo nome"
        class="input"
      />
      <button @click="saluta" class="button">Saluta</button>
      <p v-if="messaggio" class="message">{{ messaggio }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  // Variabili reattive
  const nome = ref<string>(""); // variabile reattiva per il nome
  const messaggio = ref<string>(""); // messaggio da visualizzare
  
  // Funzione per generare il messaggio di saluto
  const saluta = () => {
    if (nome.value.trim()) {
      messaggio.value = `Ciao, ${nome.value}!`; // Saluto personalizzato
    } else {
      messaggio.value = "Per favore, inserisci un nome.";
    }
  };
  </script>
  
  <style scoped>
  .saluto {
    text-align: center;
    padding: 20px;
  }
  
  .input {
    margin-bottom: 10px;
    padding: 5px;
    width: 150px;
  }
  
  .button {
    padding: 5px 10px;
    margin-left: 5px;
    cursor: pointer;
  }
  
  .message {
    margin-top: 10px;
    font-weight: bold;
  }
  </style>

<!--  v-model 
    sincronizza il valore di un campo del modulo con una variabile nel tuo codice Vue, 
    rendendo facile gestire gli stati degli input. -->
<!--  v-if 
    è una direttiva di Vue utilizzata per il rendering condizionale. 
    Mostra o nasconde un elemento HTML a seconda del valore di una condizione booleana.-->

<!--  defineComponent 
    è una funzione introdotta in Vue 3 per scrivere i componenti in modo più tipizzato e
    dichiarativo, particolarmente utile quando usi TypeScript. Prima di Vue 3, i componenti venivano creati
    tramite un oggetto export default. Ora, con Vue 3 e TypeScript, possiamo usare defineComponent per avere
    migliori capacità di tipo e autocompletamento.-->

<!--  ref 
    è una funzione di Vue 3 che crea una variabile reattiva. Questa funzione viene utilizzata per definire
    variabili reattive che possono essere utilizzate all'interno della funzione setup()
    Quando usi ref, accedi alla variabile reattiva tramite la proprietà .value (in Vue 3).
    Vue si assicura che queste variabili siano reattive, cioè che ogni cambiamento del loro valore aggiorni automaticamente la vista. -->

<!--  setup() 
    è il cuore della Composition API in Vue 3. Viene chiamata una sola volta quando il componente viene creato 
    (prima che venga montato) e viene eseguita prima del ciclo di vita del componente. In altre parole, setup()
    è un posto dove definisci tutta la logica del componente in modo dichiarativo e organizzato.
    
    Nel contesto di setup(), si utilizzano variabili reattive (ad esempio, ref), funzioni (come computed), 
    effetti collaterali (come watch), e tutte le altre funzionalità necessarie per la logica del componente. 
    Questi sono poi restituiti da setup() in modo che possano essere usati nel template del componente.-->    