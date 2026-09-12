import { Routes } from '@angular/router';
import { inAppNavigationGuard } from './shared/navigation-gate';

// Every route below the homepage is click-only: see NavigationGate.
const clickOnly = [inAppNavigationGuard];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'features',
    canActivate: clickOnly,
    loadComponent: () =>
      import('./pages/features/features-page.component').then(m => m.FeaturesPageComponent)
  },
  {
    path: 'how-it-works',
    canActivate: clickOnly,
    loadComponent: () =>
      import('./pages/how-it-works/how-it-works-page.component').then(m => m.HowItWorksPageComponent)
  },
  {
    path: 'marketplaces',
    canActivate: clickOnly,
    loadComponent: () =>
      import('./pages/marketplaces/marketplaces-page.component').then(m => m.MarketplacesPageComponent)
  },
  {
    path: 'security',
    canActivate: clickOnly,
    loadComponent: () =>
      import('./pages/security/security-page.component').then(m => m.SecurityPageComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact-page.component').then(m => m.ContactPageComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'services/:slug',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(m => m.ServiceDetailComponent)
  },
  {
    path: 'integrations/etsy',
    loadComponent: () => import('./pages/etsy/etsy.component').then(m => m.EtsyComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog-post/blog-post.component').then(m => m.BlogPostComponent)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
