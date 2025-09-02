import type { APIRoute } from 'astro';

const pages = [
  // Main pages
  { url: '', priority: 1.0 },
  { url: 'about', priority: 0.8 },
  { url: 'contact', priority: 0.9 },
  { url: 'services', priority: 0.9 },
  { url: 'packages', priority: 0.8 },
  { url: 'industries', priority: 0.8 },
  { url: 'resources', priority: 0.8 },
  { url: 'webinars', priority: 0.7 },
  
  // Service pages
  { url: 'services/iso-27001', priority: 0.8 },
  { url: 'services/nis2', priority: 0.8 },
  { url: 'services/gdpr', priority: 0.8 },
  { url: 'services/dora', priority: 0.8 },
  { url: 'services/soc-2', priority: 0.8 },
  
  // Package pages
  { url: 'packages/iso-27001-fast-track', priority: 0.7 },
  { url: 'packages/nis2-sprint', priority: 0.7 },
  { url: 'packages/soc2-readiness-12-weeks', priority: 0.7 },
  { url: 'packages/dora-program-in-a-box', priority: 0.7 },
  { url: 'packages/gdpr-accelerator', priority: 0.7 },
  { url: 'packages/ciso-as-a-service', priority: 0.7 },
  
  // Industry pages
  { url: 'industries/financial-services-fintech', priority: 0.7 },
  { url: 'industries/saas-technology', priority: 0.7 },
  { url: 'industries/healthcare-life-sciences', priority: 0.7 },
  { url: 'industries/critical-infrastructure-energy', priority: 0.7 },
  { url: 'industries/public-sector-finland', priority: 0.7 },
  { url: 'industries/manufacturing-industrial', priority: 0.7 },
  
  // Framework pages
  { url: 'frameworks/iso-27001', priority: 0.7 },
  { url: 'frameworks/nis2', priority: 0.7 },
  { url: 'frameworks/gdpr', priority: 0.7 },
  { url: 'frameworks/dora', priority: 0.7 },
  { url: 'frameworks/soc-2', priority: 0.7 },
  
  // Resource pages
  { url: 'resources/guides/iso-27001-quick-start', priority: 0.6 },
  { url: 'resources/guides/nis2-compliance-checklist', priority: 0.6 },
  { url: 'resources/guides/gdpr-pia-template', priority: 0.6 },
  
  // Webinar pages
  { url: 'webinars/nis2-implementation', priority: 0.6 },
  { url: 'webinars/dora-financial', priority: 0.6 },
  { url: 'webinars/iso27001-updates', priority: 0.6 },
];

const baseUrl = 'https://cybersecurity.fi';

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${pages.map(page => `  <url>
    <loc>${baseUrl}/fi/${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
