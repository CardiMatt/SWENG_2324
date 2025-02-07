import ImageRepository from "../repositories/ImageRepository";

/**
 * Test per il repository ImageRepository utilizzando Firebase reale.
 */
describe("ImageRepository - Firebase Integration", () => {
  const mockFile = new File(["content"], "test.jpg", { type: "image/jpeg" });
  const folder = "testFolder";

  afterAll(async () => {
    console.log("Pulizia immagini di test...");
    try {
      const urls = await ImageRepository.fetchImages(folder);
      for (const url of urls) {
        const fileName = url.split("/").pop()?.split("?")[0];
        if (fileName) {
          console.log(`Eliminando immagine: ${fileName}`);
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
    // Attendere un po' prima di recuperare per evitare problemi di propagazione
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const urls = await ImageRepository.fetchImages(folder);
    expect(Array.isArray(urls)).toBe(true);
    expect(urls.length).toBeGreaterThan(0);
    console.log("URLs delle immagini recuperate:", urls);
  });
});
