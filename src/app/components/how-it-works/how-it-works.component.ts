import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {
  steps: Step[] = [
    {
      number: '01',
      title: 'Authorize Your Stores',
      description: 'Connect Etsy and Shopify via their official OAuth flows.',
      detail: 'Click "Connect" and you\'ll be redirected to Etsy\'s and Shopify\'s authorization pages. SynceBridge requests only the minimum scopes needed: listings, receipts, and inventory. Your login credentials are never shared with us.',
      icon: '🔑'
    },
    {
      number: '02',
      title: 'Auto-Sync Products & Orders',
      description: 'Your listings and orders are imported automatically.',
      detail: 'Once authorized, SynceBridge pulls your existing products and open orders from both platforms. All data is mapped and deduplicated in our secure database. The initial sync completes within minutes.',
      icon: '⚡'
    },
    {
      number: '03',
      title: 'Manage From One Dashboard',
      description: 'View, fulfill, and update everything in one place.',
      detail: 'See all your orders in a unified queue. Update inventory quantities once — changes propagate to both Etsy and Shopify via their respective APIs. Ship orders, add tracking, and message customers from a single interface.',
      icon: '🎛️'
    },
    {
      number: '04',
      title: 'Grow With Confidence',
      description: 'Analytics and automation keep you ahead of demand.',
      detail: 'Monitor unified revenue, best-selling items, and customer trends across platforms. Set low-stock alerts and automation rules. SynceBridge keeps your stores consistent 24/7 so you can focus on what matters: your products.',
      icon: '📈'
    }
  ];
}
