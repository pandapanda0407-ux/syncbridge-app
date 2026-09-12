import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Stops a visitor who is already on the site from moving around by editing the
 * address bar. Inside the app, navigation has to go through a link or a button.
 *
 * It deliberately does NOT block arriving cold. A search result, a shared link
 * or a bookmark is how people reach the site in the first place, and refusing
 * those would make every indexed page bounce its visitor to the homepage —
 * which Google reads as a broken result and demotes. So the question this asks
 * is not "was this a direct load" but "did this person change the URL after
 * they were already here".
 *
 * The difference is a per-tab marker: the path the app was last on. A full page
 * load with no marker is a fresh arrival. A load whose marker matches the path
 * is a refresh. A load whose marker names a *different* path is someone who
 * typed over the URL, and only that case is refused.
 */
const LAST_PATH_KEY = 'sb:last-path';

@Injectable({ providedIn: 'root' })
export class NavigationGate {
  private readonly router = inject(Router);
  private readonly isServer = isPlatformServer(inject(PLATFORM_ID));

  /** Whether this browsing context has already handled its first navigation. */
  private booted = false;

  allows(url: string): boolean {
    // Prerendering has no visitor and no storage; render the real page.
    if (this.isServer) return true;

    const path = url.split(/[?#]/)[0];

    if (path === '/') {
      this.remember(path);
      return true;
    }

    const nav = this.router.getCurrentNavigation();
    const isFirstNavigation = !this.booted && (!nav || nav.id === 1);
    this.booted = true;

    if (isFirstNavigation) {
      const last = this.read();

      // Nothing stored: the tab has just opened on this URL. Search result,
      // shared link, bookmark or first visit — all legitimate ways in.
      // Same path stored: a refresh, which must not throw the reader out.
      if (last === null || last === path) {
        this.remember(path);
        return true;
      }

      // A different path was stored, so the app was already running here and
      // the URL was edited by hand. That is the case this gate exists for.
      return false;
    }

    // Anything after the first navigation is the router acting on a link or a
    // button click inside the app.
    this.remember(path);
    return true;
  }

  private read(): string | null {
    // Private browsing and blocked storage both throw rather than return null.
    try {
      return sessionStorage.getItem(LAST_PATH_KEY);
    } catch {
      return null;
    }
  }

  private remember(path: string) {
    try {
      sessionStorage.setItem(LAST_PATH_KEY, path);
    } catch {
      // Storage unavailable: the gate simply lets navigation through rather
      // than trapping the visitor.
    }
  }
}

export const inAppNavigationGuard: CanActivateFn = (_route, state) => {
  const gate = inject(NavigationGate);
  const router = inject(Router);
  return gate.allows(state.url) ? true : router.parseUrl('/');
};
