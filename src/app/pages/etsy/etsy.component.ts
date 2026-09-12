import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UseCaseComponent } from '../../components/use-case/use-case.component';
import { IconComponent, IconName } from '../../shared/icon.component';

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
        'Match Etsy listings to Shopify products once — including variations — and SynceBridge keeps the pairing from then on, including for new listings.'
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

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Etsy Integration — Sync Etsy & Shopify Inventory | SynceBridge');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Connect Etsy to Shopify with SynceBridge. Real-time two-way inventory and order sync via the official Etsy Open API v3, with OAuth-only access and clearly scoped permissions. In early access now, launching October.'
    });
  }
}
