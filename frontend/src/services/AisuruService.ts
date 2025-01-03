import axios, { type AxiosInstance } from "axios";

export class AisuruService {
  private apiClient: AxiosInstance;
  private sessionID: string | null = null;

  // Configurazione predefinita
  private static readonly config = {
    baseURL: import.meta.env.VITE_BASE_URL,
    memoriID: import.meta.env.VITE_MEMORI_ID,
    tag: import.meta.env.VITE_TAG,
    pin: import.meta.env.VITE_PIN,
  };

  constructor() {
    this.apiClient = axios.create({
      baseURL: AisuruService.config.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Apre una sessione e memorizza il sessionID
   */
  private async openSession(): Promise<void> {
    try {
      const { memoriID, tag, pin } = AisuruService.config;

      const response = await this.apiClient.post("/memori/v2/Session", {
        memoriID,
        tag,
        pin,
      });

      if (response.data?.sessionID) {
        this.sessionID = response.data.sessionID;
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
      await this.apiClient.delete(`/memori/v2/Session/${this.sessionID}`);
      console.log("Sessione chiusa con successo.");
      this.sessionID = null;
    } catch (error) {
      console.error("Errore durante la chiusura della sessione:", error);
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

    try {
      const response = await this.apiClient.get(`/memori/v2/Session/${this.sessionID}`);
      console.log("Dettagli della sessione ricevuti:", response.data);
      return response.data;
    } catch (error) {
      console.error("Errore durante il recupero dei dettagli della sessione:", error);
      throw error;
    }
  }
}
