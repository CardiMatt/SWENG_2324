// src/models/GameSave.ts
export interface GameSave {
    id: string; // ID unico per il salvataggio
    userId: string; // ID dell'utente che ha fatto il salvataggio
    storyId: string; // ID della storia salvata
    state: string; //TODO enum (new, inProgress, Terminated)
    progress: string; // Stato di avanzamento/scenario corrente 
    inventory: string; //TODO crea tipo inventory
    saveDate: Date; // Data del salvataggio
  }