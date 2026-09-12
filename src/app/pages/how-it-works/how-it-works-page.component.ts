import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';

@Component({
  selector: 'app-how-it-works-page',
  standalone: true,
  imports: [NavbarComponent, HowItWorksComponent, FooterComponent],
  templateUrl: './how-it-works-page.component.html'
})
export class HowItWorksPageComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('How It Works — Connected in Four Steps | SynceBridge');
    this.metaService.updateTag({
      name: 'description',
      content:
        'A straightforward four-step setup connects your stores, syncs your data and puts you in control — no technical knowledge required.'
    });
  }
}
