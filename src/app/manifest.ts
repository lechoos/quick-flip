import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QuickFlip',
    short_name: 'QuickFlip',
    description: 'Your best app to learn and practice Spanish. | La mejor aplicación para aprender y practicar español.',
    start_url: '/',
    display: 'standalone',
    background_color: '#e5e6c4e6',
    theme_color: '#000',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
