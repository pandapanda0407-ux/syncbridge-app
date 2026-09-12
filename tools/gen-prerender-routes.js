// Writes the list of URLs for Angular to prerender, and keeps public/sitemap.xml
// in step with it. Both are derived from the route table and the data files, so
// adding a blog post or a service cannot leave either one stale.
//
// Pages behind the click-only guard are prerendered (harmless, and correct if
// the guard is ever lifted) but deliberately kept OUT of the sitemap: they
// redirect direct visitors to the homepage, so advertising them to Google
// produces redirect errors. See CLICK_ONLY_PATHS in src/app/shared/navigation-gate.ts.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const slugs = (file) => [...read(file).matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

const CLICK_ONLY = ['/features', '/how-it-works', '/marketplaces', '/security'];

const staticRoutes = [
  '/',
  '/features',
  '/how-it-works',
  '/marketplaces',
  '/security',
  '/contact',
  '/services',
  '/integrations/etsy',
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
const priority = (r) => (r === '/' ? '1.0' : r === '/blog' || r === '/services' ? '0.9' : '0.7');
const freq = (r) => (r === '/' || r === '/blog' ? 'weekly' : r === '/privacy-policy' ? 'yearly' : 'monthly');

const sitemapUrls = routes.filter((r) => !CLICK_ONLY.includes(r));
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
