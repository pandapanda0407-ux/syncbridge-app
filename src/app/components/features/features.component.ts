import { IconComponent, IconName } from '../../shared/icon.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  imports: [CommonModule, IconComponent, RouterLink],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: 'box',
      title: 'Unified Order Management',
      description: 'Every marketplace order lands in one place alongside your Shopify orders. View, track, and manage shipments with customer communication tools — no more switching between platforms.',
      tag: 'Orders',
      color: 'purple'
    },
    {
      icon: 'sync',
      title: 'Real-Time Inventory Sync',
      description: 'Update inventory once and it propagates across every connected channel. Prevent overselling and stock discrepancies automatically.',
      tag: 'Inventory',
      color: 'cyan'
    },
    {
      icon: 'chart',
      title: 'Unified Analytics Dashboard',
      description: 'Combined sales metrics, revenue data, and customer purchase history across every channel in a single, actionable view with trend insights.',
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
      description: 'We authenticate via each platform’s official OAuth flow. Your account credentials are never stored — only scoped access tokens.',
      tag: 'Security',
      color: 'purple'
    },
    {
      icon: 'globe',
      title: 'Multi-Store Scalability',
      description: 'Manage multiple shops and stores simultaneously across every channel you sell on. Scale your multi-channel presence without proportionally increasing your workload.',
      tag: 'Scale',
      color: 'cyan'
    }
  ];
}
