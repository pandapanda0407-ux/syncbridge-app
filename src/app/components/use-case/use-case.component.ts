import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DataScope {
  icon: string;
  name: string;
  access: string;
  purpose: string;
  readOnly: boolean;
}

@Component({
  selector: 'app-use-case',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './use-case.component.html',
  styleUrl: './use-case.component.scss'
})
export class UseCaseComponent {
  dataScopes: DataScope[] = [
    {
      icon: '🧾',
      name: 'ShopReceipts (Orders)',
      access: 'Read & Write',
      purpose: 'Pull open orders, mark as shipped, add tracking numbers, and sync fulfillment status with Shopify.',
      readOnly: false
    },
    {
      icon: '📋',
      name: 'Listings',
      access: 'Read & Write',
      purpose: 'Fetch active listings to build product catalog and push price/quantity updates when inventory changes on Shopify.',
      readOnly: false
    },
    {
      icon: '📦',
      name: 'ShopInventory',
      access: 'Read & Write',
      purpose: 'Read current stock levels and decrement inventory when an order is fulfilled on either platform to prevent overselling.',
      readOnly: false
    },
    {
      icon: '🏪',
      name: 'Shop Profile',
      access: 'Read Only',
      purpose: 'Identify the seller\'s shop name and currency to display correctly in the unified dashboard. No data is modified.',
      readOnly: true
    }
  ];

  benefits = [
    { icon: '🛍️', text: 'Sellers save hours per week by eliminating manual copy-paste between platforms.' },
    { icon: '❌', text: 'Buyers receive accurate inventory counts — no more oversold listings or cancellations.' },
    { icon: '📉', text: 'Etsy platform benefits from healthier seller operations and reduced policy violations from stock issues.' },
    { icon: '🔒', text: 'All access is via official OAuth; no scraping, no credential sharing, fully within API Terms of Use.' }
  ];
}
