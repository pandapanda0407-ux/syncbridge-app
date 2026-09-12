import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { ChannelsComponent } from '../../components/channels/channels.component';
import { SecurityComponent } from '../../components/security/security.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    FeaturesComponent,
    HowItWorksComponent,
    ChannelsComponent,
    SecurityComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('SynceBridge — Multi-Marketplace Inventory & Order Sync for Shopify');
    this.metaService.updateTag({
      name: 'description',
      content: 'SynceBridge syncs inventory, orders and listings between Shopify and the marketplaces you sell on, in real time. Etsy in early access, launching October; Amazon, eBay and TikTok Shop in development. Stop overselling. Start scaling.'
    });
  }
}
