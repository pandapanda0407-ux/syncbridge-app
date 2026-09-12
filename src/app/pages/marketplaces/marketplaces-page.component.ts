import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChannelsComponent } from '../../components/channels/channels.component';

@Component({
  selector: 'app-marketplaces-page',
  standalone: true,
  imports: [NavbarComponent, ChannelsComponent, FooterComponent],
  templateUrl: './marketplaces-page.component.html'
})
export class MarketplacesPageComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Marketplaces — Etsy, Amazon, eBay & TikTok Shop | SynceBridge');
    this.metaService.updateTag({
      name: 'description',
      content:
        'The marketplaces SynceBridge connects to your Shopify store. Etsy is in early access and launches in October, with Amazon, eBay and TikTok Shop in development.'
    });
  }
}
