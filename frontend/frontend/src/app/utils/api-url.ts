import { environment } from '../../environments/environment';

// Construye la URL completa ajustada a subcarpetas (como /landing)
export function buildApiUrl(path: string): string {
  const base = environment.apiUrl;

  // Si empieza por /, lo quitamos para evitar doble slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base}/${cleanPath}`;
}
