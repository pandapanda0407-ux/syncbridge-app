import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChannelsComponent } from '../../components/channels/channels.component';
import { SeoService } from '../../shared/seo.service';

@Component({
  selector: 'app-marketplaces-page',
  standalone: true,
  imports: [NavbarComponent, ChannelsComponent, FooterComponent],
  templateUrl: './marketplaces-page.component.html'
})
export class MarketplacesPageComponent implements OnInit {
  /**
   * The channel-agnostic questions. Someone searching "sync inventory across
   * marketplaces" has not picked a channel yet, so this page answers the
   * category rather than any one integration.
   */
  faq = [
    {
      q: 'How do I sync inventory across multiple marketplaces?',
      a: 'Connect each marketplace to your Shopify store through its official API and let one system hold the stock count. SyncE Bridge treats Shopify as the hub: a sale on any connected channel reduces the quantity everywhere else in real time, so two channels cannot sell the same last unit.'
    },
    {
      q: 'Which marketplaces can I connect to Shopify?',
      a: 'eBay is available today, with two-way inventory and order sync plus eBay to Shopify migration. Etsy launches in October. Amazon and TikTok Shop are in active development. If you need a channel we have not shipped, we will scope and build it for you.'
    },
    {
      q: 'What is multi-channel inventory sync?',
      a: 'It is keeping one stock figure accurate across every place you sell. Without it, each channel holds its own count and they drift apart the moment an order lands, which is how overselling and cancellations start.'
    },
    {
      q: 'Will connecting a marketplace change my Shopify catalogue?',
      a: 'No. Shopify stays the source of truth for your products. The integration reads your catalogue and pushes listings outward; nothing rewrites your Shopify products without you asking for it.'
    },
    {
      q: 'Do I need a developer to set this up?',
      a: 'No. You authorise each connection on the marketplace\'s own page through OAuth, and we handle the mapping between your catalogue and the channel. For channels built as custom integrations, we scope the build against your real catalogue first.'
    }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.apply({
      title: 'Marketplace Integration for Shopify — Sync Inventory & Orders | SyncE Bridge',
      description:
        'Connect eBay, Etsy, Amazon and TikTok Shop to your Shopify store and keep inventory, orders and listings in sync in real time from one dashboard. Multi-channel sync built on each marketplace\'s official API.',
      path: '/marketplaces',
      faq: this.faq,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Marketplace integration for Shopify',
        serviceType: 'Multi-channel inventory and order synchronisation',
        description:
          'Real-time inventory, order and listing sync between a Shopify store and the marketplaces a seller trades on.',
        areaServed: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Ireland'],
        provider: { '@type': 'Organization', name: 'SyncE Bridge' }
      }
    });
  }
}
