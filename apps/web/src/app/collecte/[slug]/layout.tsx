import { Metadata } from 'next';
import { API_URL } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    // Next.js va dédupliquer les appels fetch similaires avec la page
    const res = await fetch(`${API_URL}/collectes/${slug}`);
    if (!res.ok) return { title: 'Collecte introuvable | Mbolo Pay' };
    
    const collecte = await res.json();
    const title = `${collecte.title} | Mbolo Pay`;
    const description = collecte.description.substring(0, 150) + (collecte.description.length > 150 ? '...' : '');
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mbolopay.sn';
    let imageUrl = 'https://raw.githubusercontent.com/mbollopay/assets/main/default-og-image.jpg'; // Fallback
    
    if (collecte.photoUrl) {
      if (collecte.photoUrl.startsWith('http')) {
        imageUrl = collecte.photoUrl;
      } else {
        imageUrl = `${API_URL}${collecte.photoUrl}`;
      }
    }
    const images = [imageUrl];

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${baseUrl}/collecte/${slug}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          }
        ],
        type: 'article',
        siteName: 'Mbolo Pay',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      }
    };
  } catch (error) {
    return { title: 'Mbolo Pay' };
  }
}

export default function CollecteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
