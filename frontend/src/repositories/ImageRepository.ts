import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
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

    const fileRef = ref(storage, `${folder}/${file.name}`);

    try {
      await uploadBytes(fileRef, file);
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
    const folderRef = ref(storage, `${folder}/`);

    try {
      const result = await listAll(folderRef);
      const urls = await Promise.all(
        result.items.map((item) => getDownloadURL(item))
      );

      return urls;
    } catch (error) {
      console.error("Errore durante il recupero delle immagini:", error);
      throw error;
    }
  }

  /**
   * Recupera i metadati di un'immagine specifica su Firebase Storage
   * @param fileName - Il nome del file da recuperare
   * @param folder - La cartella in cui si trova il file (default: "images")
   * @returns Una Promise con l'URL dell'immagine
   */
  static async getImage(fileName: string, folder: string = "images"): Promise<string> {
    if (!fileName) {
      throw new Error("Nome del file non fornito");
    }

    const fileRef = ref(storage, `${folder}/${fileName}`);

    try {
      const downloadUrl = await getDownloadURL(fileRef);
      return downloadUrl;
    } catch (error) {
      console.error("Errore durante il recupero dell'immagine:", error);
      throw error;
    }
  }

  /**
   * Elimina un'immagine specifica da Firebase Storage
   * @param fileName - Il nome del file da eliminare
   * @param folder - La cartella in cui si trova il file (default: "images")
   * @returns Una Promise void
   */
  static async deleteImage(fileName: string, folder: string = "images"): Promise<void> {
    if (!fileName) {
      throw new Error("Nome del file non fornito");
    }

    const fileRef = ref(storage, `${folder}/${fileName}`);

    try {
      await deleteObject(fileRef);
      console.log(`Immagine ${fileName} eliminata con successo`);
    } catch (error) {
      console.error("Errore durante l'eliminazione dell'immagine:", error);
      throw error;
    }
  }

  /**
   * Aggiorna un'immagine esistente su Firebase Storage
   * @param file - Il nuovo file immagine da caricare
   * @param fileName - Il nome del file esistente da sovrascrivere
   * @param folder - La cartella in cui si trova il file (default: "images")
   * @returns Una Promise con l'URL pubblico dell'immagine aggiornata
   */
  static async updateImage(
    file: File,
    fileName: string,
    folder: string = "images"
  ): Promise<string> {
    if (!file || !fileName) {
      throw new Error("File o nome del file non forniti per l'aggiornamento");
    }

    const fileRef = ref(storage, `${folder}/${fileName}`);

    try {
      await deleteObject(fileRef);
      console.log(`Immagine ${fileName} eliminata per aggiornamento`);
      return await this.uploadImage(file, folder);
    } catch (error) {
      console.error("Errore durante l'aggiornamento dell'immagine:", error);
      throw error;
    }
  }
}

export default ImageRepository;
