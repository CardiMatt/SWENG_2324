# UserRepository - Documentazione

## Descrizione
`UserRepository` è una classe per la gestione della collezione `users` nel database Firestore. Fornisce metodi per le operazioni CRUD e funzioni utili per eseguire query personalizzate.

### Funzionalità principali:
- **Crea e aggiorna** utenti nel database.
- **Recupera** un utente specifico o tutti gli utenti.
- **Aggiorna** campi parziali di un utente.
- **Elimina** un utente.
- **Cerca** utenti in base a criteri specifici.

---

## Struttura del modello `User`

Il modello `User` rappresenta un utente e segue questa struttura:

```typescript
export interface User {
  id: string; // UID generato da Firebase Authentication
  email: string;
}
```

---

## Metodi disponibili

### `saveUser(user: User): Promise<void>`
Crea o aggiorna un utente nella collezione `users`.

- **Parametri:**
  - `user: User` - Oggetto che rappresenta l'utente, che include:
    - `id: string` - UID univoco generato da Firebase Authentication.
    - `email: string` - Email dell'utente.
- **Esempio:**
  ```typescript
  const user = { id: '123', email: 'john.doe@example.com' };
  await UserRepository.saveUser(user);
  ```

---

### `getUserById(userId: string): Promise<User | null>`
Recupera un utente specifico utilizzando l'ID.

- **Parametri:**
  - `userId: string` - L'ID dell'utente da recuperare.
- **Ritorno:** L'oggetto `User` se trovato, altrimenti `null`.
- **Esempio:**
  ```typescript
  const user = await UserRepository.getUserById('123');
  if (user) {
    console.log('Utente trovato:', user);
  } else {
    console.log('Utente non trovato');
  }
  ```

---

### `getAllUsers(): Promise<User[]>`
Recupera tutti gli utenti presenti nella collezione.

- **Ritorno:** Una lista di oggetti `User`.
- **Esempio:**
  ```typescript
  const users = await UserRepository.getAllUsers();
  console.log('Tutti gli utenti:', users);
  ```

---

### `updateUser(userId: string, data: Partial<User>): Promise<void>`
Aggiorna specifici campi di un utente.

- **Parametri:**
  - `userId: string` - L'ID dell'utente da aggiornare.
  - `data: Partial<User>` - I campi da aggiornare. Ad esempio:
    - `email?: string`
- **Esempio:**
  ```typescript
  await UserRepository.updateUser('123', { email: 'jane.doe@example.com' });
  ```

---

### `deleteUser(userId: string): Promise<void>`
Elimina un utente dalla collezione.

- **Parametri:**
  - `userId: string` - L'ID dell'utente da eliminare.
- **Esempio:**
  ```typescript
  await UserRepository.deleteUser('123');
  console.log('Utente eliminato');
  ```

---

### `findUsersByField(fieldName: string, value: any): Promise<User[]>`
Esegue una query sulla collezione per trovare utenti in base a un campo specifico.

- **Parametri:**
  - `fieldName: string` - Il campo da confrontare (es. `email`).
  - `value: any` - Il valore da cercare.
- **Ritorno:** Una lista di oggetti `User` che soddisfano il criterio.
- **Esempio:**
  ```typescript
  const users = await UserRepository.findUsersByField('email', 'john.doe@example.com');
  console.log('Utenti trovati:', users);
  ```

---

## Dipendenze
`UserRepository` dipende dai seguenti moduli:
- Firebase Firestore:
  ```bash
  npm install firebase
  ```
- Modulo `db` (configurazione Firestore nel file `firebase.ts`).

---

## Errori comuni

### 1. **`user.id` mancante**
Se l'oggetto `User` passato a `saveUser` non include un campo `id`, il metodo fallirà.

### 2. **Query vuota in `findUsersByField`**
Se il campo specificato non esiste o non ci sono corrispondenze, il metodo ritornerà un array vuoto.

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

I test si trovano nel file `test/UserRepository.test.ts`.

---

## Conclusione
`UserRepository` semplifica la gestione della collezione `users` nel database Firestore, rispettando la struttura del modello `User`. Grazie ai metodi CRUD e alla ricerca avanzata, è possibile integrare facilmente il repository in applicazioni TypeScript.
