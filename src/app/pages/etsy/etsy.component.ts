import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UseCaseComponent } from '../../components/use-case/use-case.component';
import { IconComponent, IconName } from '../../shared/icon.component';
import { SeoService } from '../../shared/seo.service';

interface EtsyHighlight {
  icon: IconName;
  title: string;
  description: string;
}

@Component({
  selector: 'app-etsy',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, UseCaseComponent, IconComponent],
  templateUrl: './etsy.component.html',
  styleUrl: './etsy.component.scss'
})
export class EtsyComponent implements OnInit {
  highlights: EtsyHighlight[] = [
    {
      icon: 'sync',
      title: 'Two-way inventory sync',
      description:
        'Sell on Etsy and the Shopify stock drops. Sell on Shopify and the Etsy listing updates. Quantities stay in step both directions, without anyone editing a number twice.'
    },
    {
      icon: 'box',
      title: 'Orders in one queue',
      description:
        'Etsy receipts land in the same fulfilment queue as your Shopify orders, with shipping addresses and line items intact, so you pick and pack from one screen.'
    },
    {
      icon: 'file-text',
      title: 'Listing and catalogue mapping',
      description:
        'Match Etsy listings to Shopify products once — including variations — and SyncE Bridge keeps the pairing from then on, including for new listings.'
    },
    {
      icon: 'x-circle',
      title: 'Overselling prevention',
      description:
        'The most expensive problem in multi-channel selling. Stock is reconciled continuously, so two buyers cannot claim the same last item on two platforms.'
    },
    {
      icon: 'key',
      title: 'Official OAuth, no passwords',
      description:
        'You connect through Etsy’s own OAuth screen and approve the scopes. We never see or store your Etsy password, and you can revoke access from Etsy at any time.'
    },
    {
      icon: 'lifebuoy',
      title: 'Monitoring and support',
      description:
        'Sync failures raise alerts rather than sitting silently. If something needs a human, you have a named contact rather than a ticket queue.'
    }
  ];

  faq = [
    {
      q: 'How do I sync Etsy and Shopify inventory?',
      a: 'Authorise both shops through their official APIs and SyncE Bridge keeps one stock figure across the two. A sale on Etsy reduces the Shopify quantity and a Shopify sale updates the Etsy listing, in real time, so neither shop can sell stock the other has just sold.'
    },
    {
      q: 'Can I sell the same products on Etsy and Shopify?',
      a: 'Yes, and you do not have to split your stock between them. Both shops can carry the full quantity because the sync adjusts the other side the moment an order lands.'
    },
    {
      q: 'Which Etsy permissions does the integration need?',
      a: 'Only the scopes needed for listings, orders and inventory: listings_r, listings_w, transactions_r, transactions_w, shops_r, inventory_r and inventory_w. We do not request financial reports or payment information, and you authorise on Etsy\'s own page.'
    },
    {
      q: 'When does the Etsy integration launch?',
      a: 'It launches in October. It is built on the Etsy Open API v3 and is the most complete integration we run.'
    }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.apply({
      title: 'Etsy Shopify Integration — Sync Etsy & Shopify Inventory | SyncE Bridge',
      description:
        'Connect Etsy to Shopify and keep inventory, orders and listings in sync in real time through the official Etsy Open API v3. OAuth-only access with clearly scoped permissions and no stored credentials.',
      path: '/integrations/etsy',
      breadcrumbs: [{ name: 'Marketplaces', path: '/marketplaces' }],
      faq: this.faq
    });
  }
}
