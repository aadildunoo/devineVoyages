import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '@/lib/constants';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: Record<string, unknown>;
}

export function SEOHead({
  title,
  description,
  canonical,
  image,
  type = 'website',
  schema,
}: SEOHeadProps) {
  const fullTitle = `${title} | ${SITE_CONFIG.name}`;
  const url = canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url;
  const ogImage = image || `${SITE_CONFIG.url}/og-image.jpg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
