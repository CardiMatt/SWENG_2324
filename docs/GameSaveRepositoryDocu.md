# GameSaveRepository - Documentazione

## Descrizione
`GameSaveRepository` è una classe per la gestione dei salvataggi di gioco nella collezione `gameSaves` di Firestore. Fornisce metodi per creare, recuperare, aggiornare, eliminare e ottenere salvataggi fittizi per il debug o il testing.

---

## Struttura del modello `GameSave`

Il modello `GameSave` rappresenta un salvataggio di gioco e include le seguenti proprietà:

```typescript
export interface MemoriConfig {
  context: string; // Contesto della configurazione
  initialQuestion: string; // Domanda iniziale
}

export interface GameSave {
  id: string; // ID univoco del salvataggio
  userId: string; // ID dell'utente associato
  storyId: string; // ID della storia associata
  progress: string; // Stato di avanzamento del gioco
  inventory: string; // Inventario attuale
  saveDate: Date; // Data del salvataggio
  memoriConfig: MemoriConfig; // Configurazione di Memori
}
```

---

## Metodi disponibili

### `saveGameSave(gameSave: GameSave): Promise<string>`
Crea un nuovo salvataggio o aggiorna un salvataggio esistente nella collezione `gameSaves`.

- **Parametri:**
  - `gameSave: GameSave` - Un oggetto `GameSave` completo.
- **Ritorno:** Una `string` contenente l'ID del salvataggio salvato.
- **Esempio:**
  ```typescript
  const gameSave = {
    id: 'save123',
    userId: 'user-123',
    storyId: 'CUOREDILUCE',
    progress: '50%',
    inventory: 'sword, shield',
    saveDate: new Date(),
    memoriConfig: {
      context: 'AUTH:AUTENTICATO,STORIA:CUOREDILUCE',
      initialQuestion: '00001',
    },
  };
  const saveId = await GameSaveRepository.saveGameSave(gameSave);
  console.log('Salvataggio salvato con ID:', saveId);
  ```

---

### `getGameSaveById(saveId: string): Promise<GameSave | null>`
Recupera un salvataggio specifico tramite il suo ID.

- **Parametri:**
  - `saveId: string` - L'ID del salvataggio da recuperare.
- **Ritorno:** L'oggetto `GameSave` se trovato, altrimenti `null`.
- **Esempio:**
  ```typescript
  const gameSave = await GameSaveRepository.getGameSaveById('save123');
  if (gameSave) {
    console.log('Salvataggio trovato:', gameSave);
  } else {
    console.log('Salvataggio non trovato.');
  }
  ```

---

### `getGameSavesByUserId(userId: string): Promise<GameSave[]>`
Recupera tutti i salvataggi di un determinato utente.

- **Parametri:**
  - `userId: string` - L'ID dell'utente.
- **Ritorno:** Una lista di oggetti `GameSave`.
- **Esempio:**
  ```typescript
  const userSaves = await GameSaveRepository.getGameSavesByUserId('user-123');
  console.log('Salvataggi dell’utente:', userSaves);
  ```

---

### `updateGameSave(saveId: string, updatedFields: Partial<GameSave>): Promise<void>`
Aggiorna un salvataggio esistente con i campi specificati.

- **Parametri:**
  - `saveId: string` - L'ID del salvataggio da aggiornare.
  - `updatedFields: Partial<GameSave>` - I campi da aggiornare.
- **Esempio:**
  ```typescript
  await GameSaveRepository.updateGameSave('save123', { progress: '60%' });
  console.log('Salvataggio aggiornato.');
  ```

---

### `deleteGameSaveById(saveId: string): Promise<void>`
Elimina un salvataggio tramite il suo ID.

- **Parametri:**
  - `saveId: string` - L'ID del salvataggio da eliminare.
- **Esempio:**
  ```typescript
  await GameSaveRepository.deleteGameSaveById('save123');
  console.log('Salvataggio eliminato.');
  ```

---

### `getFakeGameSave(): Promise<GameSave[]>`
Restituisce un array di salvataggi fittizi per scopi di test o debug.

- **Ritorno:** Una lista di oggetti `GameSave` simulati.
- **Esempio:**
  ```typescript
  const fakeSaves = await GameSaveRepository.getFakeGameSave();
  console.log('Salvataggi fittizi:', fakeSaves);
  ```

---

## Dipendenze

`GameSaveRepository` dipende dai seguenti moduli:
- Firebase Firestore:
  ```bash
  npm install firebase
  ```
- Modulo `db` (configurazione Firestore nel file `firebase.ts`).

---

## Errori comuni

### 1. **Errore durante la creazione o l'aggiornamento**
Se i dati forniti a `saveGameSave` sono incompleti o non validi, il metodo fallirà. Assicurarsi che tutti i campi obbligatori siano forniti.

### 2. **ID non trovato**
Se l'ID passato a `getGameSaveById` non corrisponde a nessun documento, il metodo ritornerà `null`.

### 3. **Query vuota**
Se l'utente non ha salvataggi associati, `getGameSavesByUserId` ritornerà un array vuoto (`[]`).

---

## Test

Il repository è stato testato utilizzando **Vitest**. Per eseguire i test:
1. Installa Vitest:
   ```bash
   npm install -D vitest
   ```
2. Esegui i test:
   ```bash
   npx vitest
   ```

I test coprono le seguenti aree:
- Creazione e aggiornamento di un salvataggio.
- Recupero di un salvataggio tramite ID.
- Recupero di tutti i salvataggi di un utente.
- Aggiornamento parziale di un salvataggio.
- Eliminazione di un salvataggio.
- Generazione di salvataggi fittizi.
