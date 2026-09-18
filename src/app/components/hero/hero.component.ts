import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CHANNELS } from '../../data/channels';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  /**
   * Driven from the channel data rather than hardcoded, so a status change in
   * channels.ts reaches the hero chips too. These previously drifted: eBay read
   * as a plain chip for a while after it became available.
   */
  channels = CHANNELS;

  /**
   * The contact form is the one section still on the homepage, so this stays a
   * scroll. Everything else the hero points at is now its own page and is
   * linked with routerLink instead.
   */
  scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
