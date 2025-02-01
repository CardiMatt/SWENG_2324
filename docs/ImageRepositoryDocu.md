# Documentazione ImageRepository

## Panoramica
`ImageRepository` è una classe di utilità per gestire file immagine su Firebase Storage. Fornisce metodi per eseguire operazioni CRUD (Create, Read, Update, Delete) sulle immagini archiviate in una cartella specificata.

---

## Funzionalità
- **Caricare immagini** su Firebase Storage e recuperare i relativi URL pubblici.
- **Recuperare tutte le immagini** da una cartella specifica.
- **Ottenere un'immagine specifica** tramite il suo nome.
- **Aggiornare immagini** sostituendo file esistenti con nuovi.
- **Eliminare immagini** da Firebase Storage.

---

## Metodi

### `uploadImage`
Carica un'immagine su Firebase Storage.

#### Parametri:
- `file: File` - Il file immagine da caricare.
- `folder: string` *(opzionale, predefinito: "images")* - La cartella in cui salvare l'immagine.

#### Restituisce:
- `Promise<string>` - L'URL pubblico dell'immagine caricata.

#### Esempio:
```javascript
const url = await ImageRepository.uploadImage(file, "fotoProfilo");
console.log("URL immagine caricata:", url);
```

---

### `fetchImages`
Recupera tutte le immagini da una specifica cartella su Firebase Storage.

#### Parametri:
- `folder: string` *(opzionale, predefinito: "images")* - La cartella da cui recuperare le immagini.

#### Restituisce:
- `Promise<string[]>` - Una lista di URL pubblici delle immagini nella cartella.

#### Esempio:
```javascript
const urls = await ImageRepository.fetchImages("fotoProfilo");
console.log("Immagini recuperate:", urls);
```

---

### `getImage`
Recupera l'URL pubblico di un'immagine specifica tramite il suo nome.

#### Parametri:
- `fileName: string` - Il nome del file immagine.
- `folder: string` *(opzionale, predefinito: "images")* - La cartella che contiene l'immagine.

#### Restituisce:
- `Promise<string>` - L'URL pubblico dell'immagine.

#### Esempio:
```javascript
const url = await ImageRepository.getImage("profilo.jpg", "fotoProfilo");
console.log("URL immagine:", url);
```

---

### `updateImage`
Aggiorna un'immagine esistente sostituendola con un nuovo file.

#### Parametri:
- `file: File` - Il nuovo file immagine da caricare.
- `fileName: string` - Il nome del file immagine esistente da sostituire.
- `folder: string` *(opzionale, predefinito: "images")* - La cartella che contiene l'immagine.

#### Restituisce:
- `Promise<string>` - L'URL pubblico dell'immagine aggiornata.

#### Esempio:
```javascript
const newUrl = await ImageRepository.updateImage(newFile, "profilo.jpg", "fotoProfilo");
console.log("URL immagine aggiornata:", newUrl);
```

---

### `deleteImage`
Elimina un'immagine specifica da Firebase Storage.

#### Parametri:
- `fileName: string` - Il nome del file immagine da eliminare.
- `folder: string` *(opzionale, predefinito: "images")* - La cartella che contiene l'immagine.

#### Restituisce:
- `Promise<void>`

#### Esempio:
```javascript
await ImageRepository.deleteImage("profilo.jpg", "fotoProfilo");
console.log("Immagine eliminata con successo.");
```

---

## Gestione degli errori
- Viene generato un errore se i parametri richiesti (es. `file`, `fileName`) non sono forniti.
- Gli errori delle operazioni Firebase vengono registrati nella console.

---

## Test
Il repository è stato testato utilizzando connessioni reali a Firebase. Vedi il file `image_repository_tests` per i test di integrazione.

---

## Configurazione di Firebase
Assicurati che i seguenti servizi siano inizializzati nella tua configurazione Firebase:
- Firebase Storage

Esempio:
```javascript
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "LA_TUA_API_KEY",
  authDomain: "IL_TUO_AUTH_DOMAIN",
  projectId: "IL_TUO_PROJECT_ID",
  storageBucket: "IL_TUO_STORAGE_BUCKET",
  messagingSenderId: "IL_TUO_MESSAGING_SENDER_ID",
  appId: "IL_TUO_APP_ID",
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
```

## Note
- Tutte le operazioni sulle immagini sono specifiche per cartella. Assicurati che il percorso della cartella corrisponda alla struttura della tua applicazione.
- Utilizza nomi file univoci per evitare sovrascritture accidentali durante i caricamenti o gli aggiornamenti.


