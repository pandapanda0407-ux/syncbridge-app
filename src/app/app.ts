import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

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

    // index.html ships a single hard-coded canonical pointing at the homepage.
    // Left alone, every route tells Google it is a duplicate of "/" and the
    // blog and service pages drop out of the index, so rewrite it per route.
    router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.setCanonical(e.urlAfterRedirects));
  }

  private setCanonical(url: string) {
    // Query strings and fragments are not distinct pages for indexing.
    const path = url.split(/[?#]/)[0];
    const href = path === '/' ? `${ORIGIN}/` : `${ORIGIN}${path}`;

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
  }
}
