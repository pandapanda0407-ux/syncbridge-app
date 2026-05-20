import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss'
})
export class SecurityComponent {
  pillars = [
    {
      icon: '🔑',
      title: 'OAuth 2.0 Authentication',
      description: 'We use Etsy\'s and Shopify\'s official OAuth 2.0 flows. You authorize us directly on their platforms — we receive scoped access tokens, never your password.'
    },
    {
      icon: '🔒',
      title: 'TLS/SSL Encryption',
      description: 'All data in transit is encrypted using TLS 1.3. API tokens are stored encrypted at rest using AES-256. We undergo regular security audits.'
    },
    {
      icon: '🎯',
      title: 'Minimum Scope Principle',
      description: 'We request only the API scopes essential to our core functionality. No payment data, no buyer personal information beyond shipping addresses.'
    },
    {
      icon: '🗑️',
      title: 'Data Retention Policy',
      description: 'Order and inventory data is retained only as long as your account is active. On account deletion, all data is permanently purged within 30 days.'
    }
  ];
}
