import memoriApiClient from '@memori.ai/memori-api-client';
import type { Memory } from '@memori.ai/memori-api-client/dist/types';

export class AisuruService {
  private client: ReturnType<typeof memoriApiClient>;
  private sessionID: string | null = null;

  constructor() {
    // Inizializza il client con i parametri predefiniti
    this.client = memoriApiClient(
      import.meta.env.VITE_BACKEND_URL || "https://backend.memori.ai", // URL backend
      import.meta.env.VITE_ENGINE_URL || "https://engine.memori.ai"   // URL engine
    );
  }

  /**
   * Apre una sessione e memorizza il sessionID
   */
  private async openSession(): Promise<void> {
    try {
      const response = await this.client.initSession({
        memoriID: import.meta.env.VITE_MEMORI_ID,
        tag: import.meta.env.VITE_TAG,
        pin: import.meta.env.VITE_PIN,
      });

      if (response.sessionID) {
        this.sessionID = response.sessionID;
        console.log("Sessione aperta con successo:", this.sessionID);
      } else {
        throw new Error("Impossibile ottenere il sessionID.");
      }
    } catch (error) {
      console.error("Errore durante l'apertura della sessione:", error);
      throw error;
    }
  }

  /**
   * Assicura che una sessione sia attiva
   */
  private async ensureSession(): Promise<void> {
    if (!this.sessionID) {
      console.warn("Nessuna sessione attiva. Apertura di una nuova sessione...");
      await this.openSession();
    }
  }

  /**
   * Chiude la sessione corrente
   */
  public async closeSession(): Promise<void> {
    if (!this.sessionID) {
      console.warn("Nessuna sessione attiva da chiudere.");
      return;
    }

    try {
      await this.client.deleteSession(this.sessionID);
      console.log("Sessione chiusa con successo.");
      this.sessionID = null;
    } catch (error) {
      console.error("Errore durante la chiusura della sessione:", error);
      throw error;
    }
  }

  public async getMemory(memoryID: string): Promise<any> {
    if (!this.sessionID) {
      console.warn("Nessuna sessione attiva. Apertura di una nuova sessione...");
      await this.openSession();
    }
  
    // Assicura che sessionID non sia null dopo openSession
    if (!this.sessionID) {
      throw new Error("Impossibile ottenere un sessionID valido.");
    }
  
    try {
      const memory = await this.client.getMemory(this.sessionID, memoryID);
      console.log("Memory: ", memory);
      return memory;
    } catch (error) {
      console.error("Errore durante il recupero di Memory:", error);
      throw error;
    }
  }

  /**
   * Ottiene i dettagli della sessione corrente
   */
  public async getSessionDetails(): Promise<any> {
    if (!this.sessionID) {
      console.warn("Nessuna sessione attiva. Apertura di una nuova sessione...");
      await this.openSession();
    }

    // Assicura che sessionID non sia null dopo openSession
    if (!this.sessionID) {
      throw new Error("Impossibile ottenere un sessionID valido.");
    }

    try {
      const sessionDetails = await this.client.getSession(this.sessionID);
      console.log("Dettagli della sessione ricevuti:", sessionDetails);
      return sessionDetails;
    } catch (error) {
      console.error("Errore durante il recupero dei dettagli della sessione:", error);
      throw error;
    }
  }

    /**
   * Verifica se la sessione corrente è una sessione da "giver".
   */
/** 
    public async isGiverSession(): Promise<boolean> {
      if (!this.sessionID) {
        console.warn("Nessuna sessione attiva. Apertura di una nuova sessione...");
        await this.openSession();
      }
  
      // Assicura che sessionID non sia null dopo openSession
      if (!this.sessionID) {
        throw new Error("Impossibile ottenere un sessionID valido.");
      }
  
      try {
        const sessionDetails = await this.client.getSession(this.sessionID);
  
        // Controllo basato su "stateName" 
        
        const isGiver = sessionDetails.currentState.stateName === "WaitingForGiverActivityChoice";
        console.log("La sessione è una sessione da giver:", isGiver);
        return isGiver;
      } catch (error) {
        console.error("Errore durante il controllo della sessione da giver:", error);
        throw error;
      }
    }
**/

    /**
 * Verifica se la sessione corrente è una sessione da "giver".
 * Se non lo è, prova ad aprire una nuova sessione fino a un massimo di 3 tentativi.
 */
public async isGiverSession(): Promise<boolean> {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Verifica se la sessione è attiva
      if (!this.sessionID) {
        console.warn("Nessuna sessione attiva. Apertura di una nuova sessione...");
        await this.openSession();
      }

      // Recupera i dettagli della sessione corrente
      const sessionDetails = await this.client.getSession(this.sessionID!);

      // Controlla se la sessione è una sessione da "giver"
      if (sessionDetails.currentState.stateName === "WaitingForGiverActivityChoice") {
        console.log("La sessione è una sessione da giver.");
        return true;
      } else {
        console.warn(
          `Sessione non valida per un giver. Tentativo ${attempt} di ${maxAttempts}.`
        );
        await this.openSession(); // Prova a riaprire una nuova sessione
      }
    } catch (error) {
      console.error(
        `Errore durante il controllo della sessione al tentativo ${attempt}:`,
        error
      );
    }
  }

  // Se raggiungiamo qui, significa che tutti i tentativi sono falliti
  throw new Error("Impossibile creare una sessione valida da giver dopo 3 tentativi.");
}




/**   Memories   */
/**
   * Lista tutte le memorie
   */
public async listMemories(type?: 'ALL' | 'CONTENTS' | 'DEFAULTS' | 'DRAFTS' | 'EXPERT_REFERENCES'): Promise<Memory[]> {
  await this.ensureSession();

  try {
    const response = await this.client.getMemories(this.sessionID!, type);
    console.log("Memorie recuperate:", response.memories);
    return response.memories;
  } catch (error) {
    console.error("Errore durante il recupero delle memorie:", error);
    throw error;
  }
}

/**
 * Ottiene i dettagli di una memoria specifica
 */
public async getMemoryDetails(memoryID: string): Promise<Memory> {
  await this.ensureSession();

  try {
    const response = await this.client.getMemory(this.sessionID!, memoryID);
    console.log("Dettagli della memoria:", response.memory);
    return response.memory;
  } catch (error) {
    console.error("Errore durante il recupero dei dettagli della memoria:", error);
    throw error;
  }
}

/**
 * Aggiorna una memoria esistente
 */
public async updateMemory(memory: Memory): Promise<void> {
  await this.ensureSession();

  try {
    await this.client.patchMemory(this.sessionID!, memory);
    console.log("Memoria aggiornata con successo:", memory.memoryID);
  } catch (error) {
    console.error("Errore durante l'aggiornamento della memoria:", error);
    throw error;
  }
}

/**
 * Elimina una memoria
 */
public async deleteMemory(memoryID: string): Promise<void> {
  await this.ensureSession();

  try {
    await this.client.deleteMemory(this.sessionID!, memoryID);
    console.log("Memoria eliminata con successo:", memoryID);
  } catch (error) {
    console.error("Errore durante l'eliminazione della memoria:", error);
    throw error;
  }
}

/**
 * Aggiunge una nuova memoria
 */
public async addMemory(memory: Omit<Memory, 'memoryID'>): Promise<string> {
  await this.ensureSession();

  try {
    const response = await this.client.postMemory(this.sessionID!, memory);
    console.log("Nuova memoria aggiunta con ID:", response.memoryID);
    return response.memoryID;
  } catch (error) {
    console.error("Errore durante l'aggiunta della memoria:", error);
    throw error;
  }
}


}
