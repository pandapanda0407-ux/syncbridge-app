import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [NavbarComponent, ContactComponent, FooterComponent],
  templateUrl: './contact-page.component.html'
})
export class ContactPageComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Contact Us — Talk to the SynceBridge Team');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Tell us about your shop setup and what you need. We typically respond within 24 hours.'
    });
  }
}
