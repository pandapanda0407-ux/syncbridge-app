import { Routes } from '@angular/router';
import { inAppNavigationGuard } from './shared/navigation-gate';

// Inside the site, navigation goes through the menu or a link. Arriving cold
// from a search result or a shared link stays open, so every page can rank.
// See NavigationGate.
const menuOnly = [inAppNavigationGuard];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'features',
    canActivate: menuOnly,
    loadComponent: () =>
      import('./pages/features/features-page.component').then(m => m.FeaturesPageComponent)
  },
  {
    path: 'how-it-works',
    canActivate: menuOnly,
    loadComponent: () =>
      import('./pages/how-it-works/how-it-works-page.component').then(m => m.HowItWorksPageComponent)
  },
  {
    path: 'marketplaces',
    canActivate: menuOnly,
    loadComponent: () =>
      import('./pages/marketplaces/marketplaces-page.component').then(m => m.MarketplacesPageComponent)
  },
  {
    path: 'security',
    canActivate: menuOnly,
    loadComponent: () =>
      import('./pages/security/security-page.component').then(m => m.SecurityPageComponent)
  },
  {
    path: 'contact',
    canActivate: menuOnly,
    loadComponent: () =>
      import('./pages/contact/contact-page.component').then(m => m.ContactPageComponent)
  },
  {
    path: 'services',
    canActivate: menuOnly,
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'services/:slug',
    canActivate: menuOnly,
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(m => m.ServiceDetailComponent)
  },
  {
    path: 'integrations/ebay',
    canActivate: menuOnly,
    loadComponent: () => import('./pages/ebay/ebay.component').then(m => m.EbayComponent)
  },
  {
    path: 'integrations/etsy',
    canActivate: menuOnly,
    loadComponent: () => import('./pages/etsy/etsy.component').then(m => m.EtsyComponent)
  },
  {
    path: 'blog',
    canActivate: menuOnly,
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:slug',
    canActivate: menuOnly,
    loadComponent: () => import('./pages/blog-post/blog-post.component').then(m => m.BlogPostComponent)
  },
  {
    path: 'privacy-policy',
    canActivate: menuOnly,
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
