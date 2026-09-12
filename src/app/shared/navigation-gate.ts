import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Routes that can only be reached by clicking a link or button inside the
 * running app. A typed, pasted, bookmarked or search-result URL is refused and
 * sent to the homepage.
 *
 * Deliberately narrow. Anything that has to survive being opened cold stays
 * off this list: the blog and service pages are the whole organic-search
 * strategy, /integrations/etsy and /privacy-policy are fetched directly by
 * Shopify and Etsy app review, and /contact is where every CTA and shared
 * "get in touch" link lands. Gating those breaks real traffic for no gain.
 *
 * This list is also the single source of truth for which pages are marked
 * noindex — see App.applyRouteMeta. A page that cannot be opened from a search
 * result must not be advertised in a search result, or Google reports it as a
 * redirect error and the sitemap slowly rots.
 */
export const CLICK_ONLY_PATHS: readonly string[] = [
  '/features',
  '/how-it-works',
  '/marketplaces',
  '/security'
];

@Injectable({ providedIn: 'root' })
export class NavigationGate {
  private readonly router = inject(Router);

  /**
   * Paths already opened by an in-app click this session. Back/forward to one
   * of these is allowed, because the visitor did click their way there once and
   * breaking the browser's own buttons would read as the site being broken.
   */
  private readonly reached = new Set<string>();

  private readonly isServer = isPlatformServer(inject(PLATFORM_ID));

  allows(url: string): boolean {
    // Prerendering has no visitor and no clicks, so the gate would refuse every
    // guarded route and bake the homepage into each of their files. Let the
    // build render the real page; the gate still runs in the browser, which is
    // where it does its work.
    if (this.isServer) return true;

    const path = url.split(/[?#]/)[0];

    // The homepage is the entry point and the redirect target, so it is always
    // open — gating it would trap every visitor in a redirect loop.
    if (path === '/') return true;

    const nav = this.router.getCurrentNavigation();

    // Angular runs exactly one navigation at bootstrap, always id 1, aimed at
    // whatever URL the browser was pointed at. Reaching a guard on that
    // navigation means the app was not running yet, so nothing can have been
    // clicked: this is direct URL entry.
    if (!nav || nav.id === 1) return false;

    // Back/forward buttons. Allowed only for somewhere already clicked into.
    if (nav.trigger === 'popstate') return this.reached.has(path);

    // An imperative navigation after bootstrap is a routerLink or an explicit
    // router.navigate() call, both of which originate from the menu or a button.
    this.reached.add(path);
    return true;
  }
}

export const inAppNavigationGuard: CanActivateFn = (_route, state) => {
  const gate = inject(NavigationGate);
  const router = inject(Router);
  return gate.allows(state.url) ? true : router.parseUrl('/');
};
