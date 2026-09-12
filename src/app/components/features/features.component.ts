import { IconComponent, IconName } from '../../shared/icon.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: IconName;
  title: string;
  description: string;
  tag: string;
  color: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: 'box',
      title: 'Unified Order Management',
      description: 'All your Etsy and Shopify orders in one place. View, track, and manage shipments with customer communication tools — no more switching between platforms.',
      tag: 'Orders',
      color: 'purple'
    },
    {
      icon: 'sync',
      title: 'Real-Time Inventory Sync',
      description: 'Update inventory once and it propagates instantly across both Etsy and Shopify. Prevent overselling and stock discrepancies automatically.',
      tag: 'Inventory',
      color: 'cyan'
    },
    {
      icon: 'chart',
      title: 'Unified Analytics Dashboard',
      description: 'Combined sales metrics, revenue data, and customer purchase history across both stores in a single, actionable view with trend insights.',
      tag: 'Analytics',
      color: 'amber'
    },
    {
      icon: 'bolt',
      title: 'Workflow Automation',
      description: 'Triggers fire automatically when inventory changes, orders arrive, or listings update — no manual intervention required. Works 24/7.',
      tag: 'Automation',
      color: 'green'
    },
    {
      icon: 'lock',
      title: 'OAuth-Secured Access',
      description: 'We authenticate via official OAuth flows for both Etsy and Shopify. Your account credentials are never stored — only scoped access tokens.',
      tag: 'Security',
      color: 'purple'
    },
    {
      icon: 'globe',
      title: 'Multi-Store Scalability',
      description: 'Manage multiple Etsy shops and Shopify stores simultaneously. Scale your multi-channel presence without proportionally increasing your workload.',
      tag: 'Scale',
      color: 'cyan'
    }
  ];
}
