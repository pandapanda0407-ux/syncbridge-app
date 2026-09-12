import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IconComponent, IconName } from '../../shared/icon.component';

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
        'Connect your stores, map your catalog and let SynceBridge keep them in step. Four steps, no technical knowledge required.',
      linkLabel: 'See the setup'
    },
    {
      route: '/marketplaces',
      icon: 'store',
      title: 'Marketplaces',
      description:
        'Etsy is in early access and launches in October. Amazon, eBay and TikTok Shop are in active development.',
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

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('SynceBridge — Multi-Marketplace Inventory & Order Sync for Shopify');
    this.metaService.updateTag({
      name: 'description',
      content: 'SynceBridge syncs inventory, orders and listings between Shopify and the marketplaces you sell on, in real time. Etsy in early access, launching October; Amazon, eBay and TikTok Shop in development. Stop overselling. Start scaling.'
    });
  }
}
