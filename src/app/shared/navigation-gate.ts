import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Every route except the homepage is reachable only by clicking a link or
 * button inside the running app. A typed, pasted, bookmarked or search-result
 * URL is refused and sent to the homepage.
 */
@Injectable({ providedIn: 'root' })
export class NavigationGate {
  private readonly router = inject(Router);

  /**
   * Paths already opened by an in-app click this session. Back/forward to one
   * of these is allowed, because the visitor did click their way there once and
   * breaking the browser's own buttons would read as the site being broken.
   */
  private readonly reached = new Set<string>();

  allows(url: string): boolean {
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
