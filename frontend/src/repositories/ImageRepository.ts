import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";

/**
 * Repository per gestire immagini con Firebase Storage
 */
class ImageRepository {
  /**
   * Carica un'immagine su Firebase Storage
   * @param file - Il file immagine da caricare
   * @param folder - La cartella dove salvare l'immagine (default: "images")
   * @returns Una Promise con l'URL pubblico dell'immagine caricata
   */
  static async uploadImage(
    file: File,
    folder: string = "images"
  ): Promise<string> {
    if (!file) {
      throw new Error("Nessun file fornito per il caricamento");
    }

    // Crea un riferimento al file nel bucket
    const fileRef = ref(storage, `${folder}/${file.name}`);

    try {
      // Carica il file
      await uploadBytes(fileRef, file);

      // Recupera l'URL di download
      const downloadUrl = await getDownloadURL(fileRef);
      return downloadUrl;
    } catch (error) {
      console.error("Errore durante il caricamento dell'immagine:", error);
      throw error;
    }
  }

  /**
   * Recupera tutte le immagini da una specifica cartella su Firebase Storage
   * @param folder - La cartella da cui recuperare le immagini (default: "images")
   * @returns Una Promise con una lista di URL delle immagini
   */
  static async fetchImages(folder: string = "images"): Promise<string[]> {
    // Crea un riferimento alla cartella
    const folderRef = ref(storage, `${folder}/`);

    try {
      // Elenca tutti i file nella cartella
      const result = await listAll(folderRef);

      // Recupera gli URL di download per ogni file
      const urls = await Promise.all(
        result.items.map((item) => getDownloadURL(item))
      );

      return urls;
    } catch (error) {
      console.error("Errore durante il recupero delle immagini:", error);
      throw error;
    }
  }
}

export default ImageRepository;
