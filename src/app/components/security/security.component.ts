import { IconComponent, IconName } from '../../shared/icon.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss'
})
export class SecurityComponent {
  pillars: { icon: IconName; title: string; description: string }[] = [
    {
      icon: 'key',
      title: 'OAuth 2.0 Authentication',
      description: 'We use Etsy\'s and Shopify\'s official OAuth 2.0 flows. You authorize us directly on their platforms — we receive scoped access tokens, never your password.'
    },
    {
      icon: 'lock',
      title: 'TLS/SSL Encryption',
      description: 'All data in transit is encrypted using TLS. API tokens are stored encrypted at rest, never in plain text.'
    },
    {
      icon: 'target',
      title: 'Minimum Scope Principle',
      description: 'We request only the API scopes essential to our core functionality. No payment data, no buyer personal information beyond shipping addresses.'
    },
    {
      icon: 'trash',
      title: 'Data Retention Policy',
      description: 'Order and inventory data is retained only as long as your account is active. On account deletion, all data is permanently purged within 30 days.'
    }
  ];
}
