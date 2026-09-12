import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { UseCaseComponent } from '../../components/use-case/use-case.component';
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
    UseCaseComponent,
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
    this.titleService.setTitle('SynceBridge — Etsy & Shopify Inventory and Order Sync Tool');
    this.metaService.updateTag({
      name: 'description',
      content: 'SynceBridge syncs your Etsy and Shopify inventory, orders and listings automatically in real time. Manage both stores from one dashboard. Stop overselling. Start scaling.'
    });
  }
}
