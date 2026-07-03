import { MetadataRoute } from 'next';
import { API_URL } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Base routes
  const routes = [
    '',
    '/connexion',
    '/creer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch active collectes from the API
  try {
    const res = await fetch(`${API_URL}/collectes?limit=1000`);
    if (res.ok) {
      const data = await res.json();
      const collectes = data.collectes || [];
      const collecteRoutes = collectes.map((collecte: any) => ({
        url: `${baseUrl}/collecte/${collecte.slug}`,
        lastModified: new Date(collecte.updatedAt || collecte.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));
      return [...routes, ...collecteRoutes];
    }
  } catch (error) {
    console.error("Erreur lors de la génération du sitemap:", error);
  }

  return routes;
}
