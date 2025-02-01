import ImageRepository from "../repositories/ImageRepository";
import { storage } from "../firebase";

/**
 * Test per il repository ImageRepository utilizzando Firebase reale
 */
describe("ImageRepository - Firebase Integration", () => {
  const mockFile = new File(["content"], "test.jpg", { type: "image/jpeg" });
  const folder = "testFolder";

  afterAll(async () => {
    // Cleanup delle immagini create durante i test
    try {
      const urls = await ImageRepository.fetchImages(folder);
      for (const url of urls) {
        const fileName = url.split("/").pop()?.split("?")[0];
        if (fileName) {
          await ImageRepository.deleteImage(fileName, folder);
        }
      }
    } catch (error) {
      console.error("Errore durante il cleanup delle immagini:", error);
    }
  });

  test("uploadImage should upload an image and return its URL", async () => {
    const url = await ImageRepository.uploadImage(mockFile, folder);
    expect(typeof url).toBe("string");
    expect(url).toContain(folder);
    console.log("URL immagine caricata:", url);
  });

  test("fetchImages should fetch and return URLs of all images in a folder", async () => {
    const urls = await ImageRepository.fetchImages(folder);
    expect(Array.isArray(urls)).toBe(true);
    console.log("URLs delle immagini recuperate:", urls);
  });

  test("getImage should fetch and return the URL of a specific image", async () => {
    const url = await ImageRepository.uploadImage(mockFile, folder);
    const fileName = url.split("/").pop()?.split("?")[0];
    if (fileName) {
      const fetchedUrl = await ImageRepository.getImage(fileName, folder);
      expect(fetchedUrl).toBe(url);
    } else {
      throw new Error("Impossibile determinare il nome del file dall'URL");
    }
  });

  test("deleteImage should delete a specific image", async () => {
    const url = await ImageRepository.uploadImage(mockFile, folder);
    const fileName = url.split("/").pop()?.split("?")[0];
    if (fileName) {
      await ImageRepository.deleteImage(fileName, folder);
      const urls = await ImageRepository.fetchImages(folder);
      expect(urls).not.toContain(url);
    } else {
      throw new Error("Impossibile determinare il nome del file dall'URL");
    }
  });

  test("updateImage should replace an image and return its new URL", async () => {
    const url = await ImageRepository.uploadImage(mockFile, folder);
    const fileName = url.split("/").pop()?.split("?")[0];
    const newFile = new File(["new content"], "test.jpg", { type: "image/jpeg" });

    if (fileName) {
      const newUrl = await ImageRepository.updateImage(newFile, fileName, folder);
      expect(newUrl).not.toBe(url);
      console.log("URL immagine aggiornata:", newUrl);
    } else {
      throw new Error("Impossibile determinare il nome del file dall'URL");
    }
  });
});
