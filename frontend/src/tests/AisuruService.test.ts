import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { AisuruService } from "../services/AisuruService";

describe("AisuruService", () => {
  let service: AisuruService;

  beforeEach(() => {
    // Inizializza il servizio prima di ogni test
    service = new AisuruService();
  });

  afterEach(async () => {
    // Chiudi la sessione al termine di ogni test
    await service.closeSession();
  });

  it("should open a session successfully", async () => {
    await service.getSessionDetails(); // Questo metodo aprirà automaticamente una sessione
    const sessionID = service["sessionID"]; // Accedi al sessionID

    // Verifica che la sessione sia stata aperta e che il sessionID sia valido
    expect(sessionID).not.toBeNull();
    console.log("Sessione aperta con sessionID:", sessionID);
  });

  it("should retrieve session details successfully", async () => {
    const sessionDetails = await service.getSessionDetails(); // Ottieni i dettagli della sessione

    // Verifica che la risposta abbia la struttura attesa
    expect(sessionDetails).toHaveProperty("currentState");
    expect(sessionDetails).toHaveProperty("requestID");
    expect(sessionDetails).toHaveProperty("resultCode");
    expect(sessionDetails.currentState).toHaveProperty("state");
    console.log("Dettagli della sessione ricevuti:", sessionDetails);
  });

  it("should close a session successfully", async () => {
    await service.getSessionDetails(); // Apri una sessione
    const sessionIDBefore = service["sessionID"]; // Recupera il sessionID

    // Verifica che la sessione sia aperta
    expect(sessionIDBefore).not.toBeNull();

    await service.closeSession(); // Chiudi la sessione
    const sessionIDAfter = service["sessionID"]; // Recupera il sessionID dopo la chiusura

    // Verifica che la sessione sia stata chiusa
    expect(sessionIDAfter).toBeNull();
    console.log("Sessione chiusa con successo.");
  });
});
