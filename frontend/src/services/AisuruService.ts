import memoriApiClient from '@memori.ai/memori-api-client';
import type { Memory } from '@memori.ai/memori-api-client/dist/types';
import axios from 'axios';

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

  /**public checkEnsureSession */
  public async checkEnsureSession(): Promise<void> {
    this.ensureSession();
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
      console.log("sessionId: ", this.sessionID, ", titolo ogg memory: ", memory.title, "risp:", memory.answers)
      const response = await this.client.postMemory(this.sessionID!, memory);
      console.log("Nuova memoria aggiunta con ID:", response.memoryID);
      return response.memoryID;
    } catch (error) {
      console.error("Errore durante l'aggiunta della memoria:", error);
      throw error;
    }
  }

  async filteredMemories(storyTitle: string) {
    await this.ensureSession();
    //NON posso usarlo perchè è statico
    try {
      console.log("Session ID:", this.sessionID, ", titolo storia:", storyTitle);
        const response = await fetch(`https://engine.memori.ai/memori/v2/FilterMemories/${this.sessionID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                memoryTags: [storyTitle],
            }),
        });

        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response Data:", data);

        if (!response.ok) {
          console.error(`HTTP Error ${response.status}:`, data);
          throw new Error(data?.resultMessage || `HTTP Error ${response.status}`);
        }

        if (data && data.matches) {
            return data.matches.map((match: any) => ({
                memoryID: match.memory.memoryID,
                title: match.memory.title,
                answers: match.memory.answers.map((answer: any) => answer.text),
            }));
        }

        return [];
    } catch (error) {
        console.error('Errore nel recupero delle memorie:', error);
        throw error;
    }
}


    /**
   * Ottiene memorie filtrate
   */
    /*public async filterMemories(sessionID: string, storyTitle: string): Promise<Memory> {
      //TODO serve? await this.ensureSession();
  
      try {
        const response = await axios.post(`/memori/v2/FilterMemories/${sessionID}`, {
          memoryTags: [storyTitle]
        });
        return response.data.matches.map((match: any) => match.memory);
      } catch (error) {
        console.error("Errore durante il recupero dei dettagli della memoria:", error);
        throw error;
      }
    }*/

      /*
      static async filteredMemories(sessionID: string, storyTitle: string) {
        try {
          const response = await axios.post(`/memori/v2/FilterMemories/${sessionID}`, {
            memoryTags: [storyTitle],
          });
    
          if (response.data && response.data.matches) {
            return response.data.matches.map((match: any) => ({
              memoryID: match.memory.memoryID,
              title: match.memory.title,
              answers: match.memory.answers.map((answer: any) => answer.text),
            }));
          }
          
          return [];
        } catch (error) {
          console.error('Errore nel recupero delle memorie:', error);
          throw error;
        }
      }
  */
      
    
   


}
