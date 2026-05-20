import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  stats = [
    { value: '10k+', label: 'Active Sellers' },
    { value: '2M+', label: 'Orders Synced' },
    { value: '99.9%', label: 'Uptime' },
    { value: '< 2s', label: 'Sync Speed' }
  ];

  scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToFeatures() {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }
}
