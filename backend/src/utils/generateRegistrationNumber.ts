export function generateRegistrationNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(100 + Math.random() * 900).toString();
  return `PPDB-${timestamp}-${random}`;
}
