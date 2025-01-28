# StoryRepository - Documentazione

## Descrizione
`StoryRepository` è una classe per la gestione della collezione `stories` nel database Firestore. Fornisce metodi per le operazioni CRUD (Create, Read, Update, Delete) e funzionalità di query avanzate per filtrare le storie in base a genere o autore.

### Funzionalità principali:
- **Crea e aggiorna** storie nel database.
- **Recupera** una storia specifica o tutte le storie.
- **Aggiorna** campi parziali di una storia.
- **Elimina** una storia.
- **Cerca** storie in base al genere o all'autore.

---

## Struttura del modello `Story`

Il modello `Story` rappresenta una storia e segue questa struttura:

```typescript
export interface Story {
  id: string; // ID univoco della storia
  title: string; // Titolo della storia
  description: string; // Descrizione della storia
  image: string; // URL dell'immagine associata
  author: string; // Nome dell'autore
  genre: string; // Genere della storia
}
```

---

## Metodi disponibili

### `saveStory(story: Story): Promise<void>`
Crea o aggiorna una storia nella collezione `stories`.

- **Parametri:**
  - `story: Story` - Oggetto che rappresenta la storia, che include:
    - `id: string` - ID univoco della storia.
    - `title: string` - Titolo della storia.
    - `description: string` - Descrizione della storia.
    - `image: string` - URL dell'immagine associata.
    - `author: string` - Nome dell'autore.
    - `genre: string` - Genere della storia.
- **Esempio:**
  ```typescript
  const story = {
    id: 'story123',
    title: 'A Great Story',
    description: 'This is a test story',
    image: 'image_url',
    author: 'John Doe',
    genre: 'Adventure',
  };
  await StoryRepository.saveStory(story);
  ```

---

### `getStoryById(storyId: string): Promise<Story | null>`
Recupera una storia specifica utilizzando l'ID.

- **Parametri:**
  - `storyId: string` - L'ID della storia da recuperare.
- **Ritorno:** L'oggetto `Story` se trovato, altrimenti `null`.
- **Esempio:**
  ```typescript
  const story = await StoryRepository.getStoryById('story123');
  if (story) {
    console.log('Storia trovata:', story);
  } else {
    console.log('Storia non trovata');
  }
  ```

---

### `getAllStories(): Promise<Story[]>`
Recupera tutte le storie presenti nella collezione.

- **Ritorno:** Una lista di oggetti `Story`.
- **Esempio:**
  ```typescript
  const stories = await StoryRepository.getAllStories();
  console.log('Tutte le storie:', stories);
  ```

---

### `updateStory(storyId: string, updatedFields: Partial<Story>): Promise<void>`
Aggiorna specifici campi di una storia.

- **Parametri:**
  - `storyId: string` - L'ID della storia da aggiornare.
  - `updatedFields: Partial<Story>` - I campi da aggiornare.
- **Esempio:**
  ```typescript
  await StoryRepository.updateStory('story123', { title: 'Updated Title' });
  ```

---

### `deleteStory(storyId: string): Promise<void>`
Elimina una storia dalla collezione.

- **Parametri:**
  - `storyId: string` - L'ID della storia da eliminare.
- **Esempio:**
  ```typescript
  await StoryRepository.deleteStory('story123');
  console.log('Storia eliminata');
  ```

---

### `getStoriesByGenre(genre: string): Promise<Story[]>`
Recupera storie filtrate per genere.

- **Parametri:**
  - `genre: string` - Genere da filtrare (es. `Adventure`).
- **Ritorno:** Una lista di oggetti `Story` corrispondenti al genere.
- **Esempio:**
  ```typescript
  const stories = await StoryRepository.getStoriesByGenre('Adventure');
  console.log('Storie nel genere Adventure:', stories);
  ```

---

### `getStoriesByAuthor(author: string): Promise<Story[]>`
Recupera storie filtrate per autore.

- **Parametri:**
  - `author: string` - Autore da filtrare (es. `John Doe`).
- **Ritorno:** Una lista di oggetti `Story` corrispondenti all'autore.
- **Esempio:**
  ```typescript
  const stories = await StoryRepository.getStoriesByAuthor('John Doe');
  console.log('Storie scritte da John Doe:', stories);
  ```

---

## Dipendenze
`StoryRepository` dipende dai seguenti moduli:
- Firebase Firestore:
  ```bash
  npm install firebase
  ```
- Modulo `db` (configurazione Firestore nel file `firebase.ts`).

---

## Errori comuni

### 1. **ID mancante**
Se l'oggetto `Story` passato a `saveStory` non include un campo `id`, il metodo fallirà.

### 2. **Query vuota**
Se il filtro per `getStoriesByGenre` o `getStoriesByAuthor` non produce risultati, il metodo ritornerà un array vuoto (`[]`).

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

I test coprono tutte le operazioni CRUD e le query personalizzate. Il file di test si trova in `test/StoryRepository.test.ts`.

---