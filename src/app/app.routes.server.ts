import { RenderMode, ServerRoute } from '@angular/ssr';
import { BLOG_POSTS } from './data/blog-posts';
import { ALL_SERVICES } from './data/services';

/**
 * Prerendering needs the concrete values behind every :slug, so they are read
 * from the same data the pages render from. A new post or service is picked up
 * automatically — there is no second list to keep in step.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      BLOG_POSTS.filter((post) => !post.draft).map((post) => ({ slug: post.slug }))
  },
  {
    path: 'services/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => ALL_SERVICES.map((service) => ({ slug: service.slug }))
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
