// Writes the list of URLs for Angular to prerender, and keeps public/sitemap.xml
// in step with it. Both are derived from the route table and the data files, so
// adding a blog post or a service cannot leave either one stale.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const slugs = (file) => [...read(file).matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

const staticRoutes = [
  '/',
  '/features',
  '/how-it-works',
  '/marketplaces',
  '/security',
  '/contact',
  '/services',
  '/integrations/etsy',
  '/integrations/ebay',
  '/integrations/amazon',
  '/integrations/tiktok-shop',
  '/blog',
  '/privacy-policy'
];

const routes = [
  ...staticRoutes,
  ...slugs('src/app/data/services.ts').map((s) => `/services/${s}`),
  ...slugs('src/app/data/blog-posts.ts').map((s) => `/blog/${s}`)
];

fs.writeFileSync(path.join(root, 'prerender-routes.txt'), routes.join('\n') + '\n');

const today = new Date().toISOString().slice(0, 10);
// This file is the only author of public/sitemap.xml — it is rewritten on
// every build, so a priority edited by hand in the XML is gone by the next
// `npm run build`. Change it here.
//
// The integration pages are the commercial pages and carry the pricing, so
// they rank above a policy page rather than level with one.
const COMMERCIAL = [
  '/integrations/ebay',
  '/integrations/etsy',
  '/integrations/amazon',
  '/integrations/tiktok-shop'
];

const priority = (r) =>
  r === '/' ? '1.0'
  : COMMERCIAL.includes(r) ? '0.9'
  : r === '/blog' || r === '/services' ? '0.9'
  : r === '/marketplaces' ? '0.8'
  : r === '/privacy-policy' ? '0.3'
  : '0.7';

const freq = (r) =>
  r === '/' || r === '/blog' ? 'weekly'
  : COMMERCIAL.includes(r) || r === '/marketplaces' ? 'weekly'
  : r === '/privacy-policy' ? 'yearly'
  : 'monthly';

const sitemapUrls = routes;
const body = sitemapUrls
  .map(
    (r) =>
      `  <url>\n    <loc>https://syncebridge.com${r === '/' ? '/' : r}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n    <changefreq>${freq(r)}</changefreq>\n` +
      `    <priority>${priority(r)}</priority>\n  </url>`
  )
  .join('\n');

fs.writeFileSync(
  path.join(root, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
);

console.log(`prerender routes: ${routes.length}  |  sitemap urls: ${sitemapUrls.length}`);
