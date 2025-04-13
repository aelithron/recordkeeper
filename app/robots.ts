import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/edit/', '/edit/*', '/editor-login/', '/healthz/', '/api/', '/api/*', '/_next/', '/_next/*'],
      },
    ],
  }
}