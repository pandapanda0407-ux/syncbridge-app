import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IconComponent, IconName } from '../../shared/icon.component';
import { SeoService, ORIGIN } from '../../shared/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    HeroComponent,
    ContactComponent,
    FooterComponent,
    IconComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  /**
   * The homepage is the hero and the contact form. These cards carry the
   * visitor into the pages that hold the detail, so the gap between the two
   * does the work of a landing page instead of sitting empty.
   */
  exploreCards: {
    route: string;
    icon: IconName;
    title: string;
    description: string;
    linkLabel: string;
  }[] = [
    {
      route: '/features',
      icon: 'sync',
      title: 'Features',
      description:
        'Real-time inventory sync, unified order management and automatic stock updates across every connected marketplace.',
      linkLabel: 'See the features'
    },
    {
      route: '/how-it-works',
      icon: 'plug',
      title: 'How It Works',
      description:
        'Connect your stores, map your catalog and let SyncE Bridge keep them in step. Four steps, no technical knowledge required.',
      linkLabel: 'See the setup'
    },
    {
      route: '/marketplaces',
      icon: 'store',
      title: 'Marketplaces',
      description:
        'eBay is available now as a custom integration. Etsy launches in October, with Amazon and TikTok Shop in development.',
      linkLabel: 'See the channels'
    },
    {
      route: '/security',
      icon: 'lock',
      title: 'Security',
      description:
        'Your store credentials are never stored. Official API channels and industry-standard practices on every connection.',
      linkLabel: 'See our approach'
    }
  ];

  /**
   * These three were in index.html as FAQ schema on every prerendered route,
   * answering questions no page actually asked. They belong to the homepage,
   * and they are rendered below so the markup describes visible content.
   */
  faq = [
    {
      q: 'Can I manage multiple marketplaces from one dashboard?',
      a: 'Yes. Orders, inventory and listings across your Shopify store and every connected marketplace are managed from a single dashboard, rather than a tab per channel.'
    },
    {
      q: 'How does marketplace inventory sync prevent overselling?',
      a: 'One stock figure is held for each product and updated on every connected channel the moment a sale happens anywhere. Because no channel keeps its own separate count, two of them cannot sell the same last unit.'
    },
    {
      q: 'Which marketplaces can I sync with Shopify?',
      a: 'eBay is available today with two-way sync and eBay to Shopify migration. Etsy launches in October. Amazon and TikTok Shop are in active development, and we will scope a channel we have not shipped if you need one.'
    },
    {
      q: 'How long does it take to connect a store?',
      a: 'Connecting is four steps and needs no technical knowledge: authorise Shopify, authorise the marketplace, map your catalogue, and let the first sync run. Custom-scoped channels start with a short call about how your listings are structured.'
    }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.apply({
      title: 'Shopify Marketplace Sync — Multi-Channel Inventory & Order Integration | SyncE Bridge',
      description:
        'Sync inventory, orders and listings between Shopify and every marketplace you sell on, in real time from one dashboard. eBay integration and eBay to Shopify migration available now, Etsy launching October, Amazon and TikTok Shop in development. Stop overselling.',
      path: '/',
      faq: this.faq,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SyncE Bridge',
        url: `${ORIGIN}/`,
        description:
          'SyncE Bridge syncs orders, inventory, and listings between Shopify and the marketplaces you sell on, in real time from a single unified dashboard.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        inLanguage: 'en',
        featureList: [
          'Real-time inventory sync between Shopify and connected marketplaces',
          'Two-way eBay and Shopify listing, inventory and order sync',
          'eBay to Shopify catalogue migration',
          'AI-assisted listing improvement',
          'Unified order management dashboard',
          'Automatic stock level updates',
          'Multi-channel analytics',
          'Etsy Open API v3 integration',
          'Shopify API integration'
        ],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: 19,
          description: 'eBay integration plans start at $19 a month with a 7-day free trial.',
          url: `${ORIGIN}/integrations/ebay#pricing`
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'support@syncebridge.com',
          contactType: 'customer support'
        }
      }
    });
  }
}
