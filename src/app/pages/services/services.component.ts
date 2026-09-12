import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IconComponent } from '../../shared/icon.component';
import { SERVICE_GROUPS, ACCOUNT_MANAGEMENT } from '../../data/services';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, IconComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  groups = SERVICE_GROUPS;
  accountManagement = ACCOUNT_MANAGEMENT;

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Services — SEO, Ads, Custom Apps & IT | SynceBridge');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Digital marketing and software services for multi-channel sellers: SEO, paid ads management, social and email marketing, custom app development, integrations, cloud, and dedicated account management.'
    });
  }
}
