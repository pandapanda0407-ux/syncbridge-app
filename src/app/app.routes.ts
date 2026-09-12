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
    path: 'services',
    canActivate: clickOnly,
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'services/:slug',
    canActivate: clickOnly,
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(m => m.ServiceDetailComponent)
  },
  {
    path: 'integrations/etsy',
    canActivate: clickOnly,
    loadComponent: () => import('./pages/etsy/etsy.component').then(m => m.EtsyComponent)
  },
  {
    path: 'blog',
    canActivate: clickOnly,
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:slug',
    canActivate: clickOnly,
    loadComponent: () => import('./pages/blog-post/blog-post.component').then(m => m.BlogPostComponent)
  },
  {
    path: 'privacy-policy',
    canActivate: clickOnly,
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
