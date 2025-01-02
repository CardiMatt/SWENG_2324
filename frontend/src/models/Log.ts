// src/models/LogModel.ts
export interface Log {
    id: string; // ID generato automaticamente per ogni log
    userId: string; // Collegamento all'utente che ha generato il log
    timestamp: Date; // Timestamp del log
    action: string; // Descrizione dell'azione registrata
  }
  