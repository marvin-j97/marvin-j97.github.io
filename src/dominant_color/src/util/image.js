export function getImageBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.addEventListener("error", reject);

    reader.readAsDataURL(file);
  });
}
