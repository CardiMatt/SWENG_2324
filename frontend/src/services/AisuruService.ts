import memoriApiClient from '@memori.ai/memori-api-client';

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
}
