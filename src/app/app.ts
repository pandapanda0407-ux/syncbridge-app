import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CLICK_ONLY_PATHS } from './shared/navigation-gate';

// Height of the fixed navbar, plus a little breathing room. ViewportScroller
// scrolls to the element's raw offset and ignores CSS scroll-margin, so
// without this every anchor target lands underneath the navbar.
const NAV_OFFSET = 90;

const ORIGIN = 'https://syncebridge.com';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly doc = inject(DOCUMENT);

  constructor(viewportScroller: ViewportScroller, router: Router) {
    viewportScroller.setOffset([0, NAV_OFFSET]);

    router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.applyRouteMeta(e.urlAfterRedirects));
  }

  private applyRouteMeta(url: string) {
    // Query strings and fragments are not distinct pages for indexing.
    const path = url.split(/[?#]/)[0];
    const href = path === '/' ? `${ORIGIN}/` : `${ORIGIN}${path}`;

    // index.html ships a single hard-coded canonical pointing at the homepage.
    // Left alone, every route tells Google it is a duplicate of "/" and the
    // blog and service pages drop out of the index, so rewrite it per route.
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);

    this.doc
      .querySelector<HTMLMetaElement>('meta[property="og:url"]')
      ?.setAttribute('content', href);

    // A click-only page cannot be opened from a search result, so it must not
    // be offered as one — otherwise Google indexes it, every visitor from that
    // listing is bounced to the homepage, and Search Console fills with
    // redirect errors. "follow" still lets link equity flow to the open pages.
    // Tags are rewritten on every navigation because this is a single document:
    // a noindex left behind would silently deindex whatever is visited next.
    const robots = this.doc.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (robots) {
      robots.setAttribute(
        'content',
        CLICK_ONLY_PATHS.includes(path) ? 'noindex, follow' : 'index, follow'
      );
    }
  }
}
