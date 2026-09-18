import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IconComponent, IconName } from '../../shared/icon.component';

interface EbayHighlight {
  icon: IconName;
  title: string;
  description: string;
}

@Component({
  selector: 'app-ebay',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, IconComponent],
  templateUrl: './ebay.component.html',
  styleUrl: './ebay.component.scss'
})
export class EbayComponent implements OnInit {
  highlights: EbayHighlight[] = [
    {
      icon: 'sync',
      title: 'Two-way inventory sync',
      description:
        'Sell on eBay and the Shopify stock drops. Sell on Shopify and the eBay listing updates. Quantities stay in step in both directions, so the same last item cannot be sold twice.'
    },
    {
      icon: 'box',
      title: 'Orders in one queue',
      description:
        'eBay orders land in the same fulfilment queue as your Shopify orders, with buyer details and line items intact, so you pick and pack from one screen.'
    },
    {
      icon: 'trending-up',
      title: 'eBay to Shopify migration',
      description:
        'Bring an existing eBay catalogue across to Shopify — listings, variations, images and item specifics — without rebuilding each product by hand.'
    },
    {
      icon: 'pen',
      title: 'AI-assisted listing improvement',
      description:
        'Draft titles, item specifics and descriptions from what you already have, so a catalogue moving between platforms does not arrive thin. You review before anything publishes.'
    },
    {
      icon: 'sliders',
      title: 'Mapped to how your shop works',
      description:
        'Scoped per shop rather than a fixed template: your SKU scheme, your variation structure, your business policies and the fields you actually use.'
    },
    {
      icon: 'key',
      title: 'Official API access',
      description:
        'You authorise through eBay, and access is limited to the scopes the integration needs. We never see or store your eBay password, and you can revoke access from eBay at any time.'
    }
  ];

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('eBay Integration — Sync eBay & Shopify, and Migrate | SynceBridge');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Connect eBay to Shopify with SynceBridge: two-way inventory and order sync, eBay to Shopify migration, and AI-assisted listing improvement. Available now as a custom integration scoped to your shop.'
    });
  }
}
