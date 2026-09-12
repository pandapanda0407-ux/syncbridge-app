import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SecurityComponent } from '../../components/security/security.component';

@Component({
  selector: 'app-security-page',
  standalone: true,
  imports: [NavbarComponent, SecurityComponent, FooterComponent],
  templateUrl: './security-page.component.html'
})
export class SecurityPageComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Security — Official API Access, No Stored Credentials | SynceBridge');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Your store credentials are never stored. SynceBridge uses industry-standard security practices and official API channels for every marketplace connection.'
    });
  }
}
