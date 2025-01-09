<template>
    <div class="card mx-auto" style="width: 18rem;">
      <!-- Immagine della card -->
      <img :src="imageSrc" class="card-img-top" alt="Cuore di Luce" />
      <div class="card-body text-center">
        <!-- Bottone -->
        <button class="btn btn-danger btn-block" @click="playGame">Gioca ora</button>
      </div>
    </div>
  </template>
  
  <script>
  import CuoreDiLuce from "@/assets/CuoreDiLuce.png"; // Importa l'immagine
  
  export default {
    name: "GameCard",
    data() {
      return {
        imageSrc: CuoreDiLuce, // Associa l'immagine al componente
      };
    },
    methods: {
      playGame() {
        alert("Inizia la storia!");
        window.typeMessage({message: "00001", hidden: true });

      },
    },
  };
  </script>
  
  <style scoped>
  /* Stile personalizzato */
  .card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .card-img-top {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
    height: 250px;
  }
  
  .btn-danger {
    font-weight: bold;
    text-transform: uppercase;
  }
  
  .btn-danger:hover {
    background-color: #cc0000;
  }
  </style>
  