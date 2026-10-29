import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export const ORIGIN = 'https://syncebridge.com';

export interface SeoPage {
  title: string;
  description: string;
  /** Route path, leading slash, no origin. Used for canonical and og:url. */
  path: string;
  /** Overrides the default social image for pages that have their own. */
  image?: string;
  /** Visible breadcrumb trail, excluding Home, which is added here. */
  breadcrumbs?: { name: string; path: string }[];
  /** Questions a seller actually types, answered on the page itself. */
  faq?: { q: string; a: string }[];
  /** Extra JSON-LD for the page, emitted alongside the breadcrumb and FAQ. */
  schema?: Record<string, unknown>;
}

/**
 * One place that sets everything a crawler reads off a page.
 *
 * Each page component was setting a title and a description and nothing else,
 * so every route shipped the homepage's og:title and twitter:description —
 * which is what a social card and several crawlers read rather than the
 * <title>. The JSON-LD in index.html has the same problem in reverse: it is
 * one block describing the whole product, repeated identically on all 37
 * prerendered routes, so no individual page carries its own price, breadcrumb
 * or question.
 *
 * Tags are set rather than appended: `updateTag` matches on the selector, so
 * a second route's values replace the first's instead of stacking. JSON-LD is
 * removed and re-added per navigation for the same reason.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  /** Marks the blocks this service owns, so it never deletes index.html's. */
  private static readonly OWNED = 'data-seo-page';

  apply(page: SeoPage): void {
    const url = page.path === '/' ? `${ORIGIN}/` : `${ORIGIN}${page.path}`;
    const image = page.image ?? `${ORIGIN}/og-image.png`;

    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });

    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });

    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.clearSchema();

    const blocks: Record<string, unknown>[] = [this.breadcrumb(page, url)];
    if (page.faq?.length) blocks.push(this.faqPage(page.faq));
    if (page.schema) blocks.push(page.schema);

    for (const block of blocks) this.addSchema(block);
  }

  /**
   * Home first, then the trail, then the page itself. A single-item crumb is
   * pointless, so the homepage gets none.
   */
  private breadcrumb(page: SeoPage, url: string): Record<string, unknown> {
    const trail = [
      { name: 'Home', path: '/' },
      ...(page.breadcrumbs ?? []),
      { name: this.shortName(page.title), path: page.path },
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: crumb.path === '/' ? `${ORIGIN}/` : `${ORIGIN}${crumb.path}`,
      })),
    };
  }

  /** The part of a title before the first separator — "Home › eBay Integration". */
  private shortName(title: string): string {
    return title.split(/\s[—|]\s/)[0].trim();
  }

  private faqPage(faq: { q: string; a: string }[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    };
  }

  private addSchema(data: Record<string, unknown>): void {
    const script = this.doc.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute(SeoService.OWNED, '');
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }

  private clearSchema(): void {
    this.doc.head.querySelectorAll(`script[${SeoService.OWNED}]`).forEach((node) => node.remove());
  }
}
