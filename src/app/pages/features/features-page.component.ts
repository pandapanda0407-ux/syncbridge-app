import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FeaturesComponent } from '../../components/features/features.component';

@Component({
  selector: 'app-features-page',
  standalone: true,
  imports: [NavbarComponent, FeaturesComponent, FooterComponent],
  templateUrl: './features-page.component.html'
})
export class FeaturesPageComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Features — Real-Time Inventory & Order Sync | SynceBridge');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Real-time inventory sync, unified order management, automatic stock level updates and multi-channel analytics across your Shopify store and every marketplace you sell on.'
    });
  }
}
