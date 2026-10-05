// Shared by the browser (query keys) and the API proxy (Spoonacular params) so
// that "Pasta " and "pasta" hit the same client cache entry and CDN cache entry.
// Keep this file dependency-free: it's bundled into the serverless function.
export function normalizeQuery(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 100);
}
