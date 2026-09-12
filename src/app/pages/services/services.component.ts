import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IconComponent } from '../../shared/icon.component';
import {
  SERVICE_GROUPS,
  ACCOUNT_MANAGEMENT,
  FEATURED_SERVICE,
  CHANNEL_ROADMAP,
  EARLY_ACCESS_NOTE,
  FEEDBACK_NOTE
} from '../../data/services';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, IconComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  featured = FEATURED_SERVICE;
  roadmap = CHANNEL_ROADMAP;
  earlyAccessNote = EARLY_ACCESS_NOTE;
  feedbackNote = FEEDBACK_NOTE;
  groups = SERVICE_GROUPS;
  accountManagement = ACCOUNT_MANAGEMENT;

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Services — Shopify Marketplace Integration, SEO & Custom Apps | SynceBridge');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Marketplace integration for Shopify — real-time Etsy and Shopify inventory and order sync — plus SEO, paid ads, custom app development, cloud, and dedicated account management for multi-channel sellers.'
    });
  }
}
