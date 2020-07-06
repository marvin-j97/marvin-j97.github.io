export function copyToClipboard(str) {
  return new Promise((resolve, reject) => {
    navigator.clipboard.writeText(str).then(resolve, reject);
  });
}
