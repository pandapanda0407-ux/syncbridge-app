import { Component, Input } from '@angular/core';

export type IconName =
  | 'box' | 'sync' | 'chart' | 'bolt' | 'lock' | 'globe'
  | 'key' | 'target' | 'trash' | 'sliders'
  | 'trending-up' | 'trending-down'
  | 'file-text' | 'clipboard' | 'store' | 'bag'
  | 'x-circle' | 'alert' | 'check';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (name) {
        @case ('box') {
          <path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8z"/>
          <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>
        }
        @case ('sync') {
          <path d="M23 4v6h-6M1 20v-6h6"/>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
        }
        @case ('chart') {
          <path d="M18 20V10M12 20V4M6 20v-4"/>
        }
        @case ('bolt') {
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
        }
        @case ('lock') {
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        }
        @case ('globe') {
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        }
        @case ('key') {
          <path d="M11.39 11.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78z"/>
          <path d="m11.39 11.61 4.11-4.11m0 0 3 3L22 7l-3-3-3.5 3.5z"/>
        }
        @case ('target') {
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        }
        @case ('trash') {
          <path d="M3 6h18"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        }
        @case ('sliders') {
          <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"/>
          <path d="M1 14h6M9 8h6M17 16h6"/>
        }
        @case ('trending-up') {
          <path d="M23 6l-9.5 9.5-5-5L1 18"/>
          <path d="M17 6h6v6"/>
        }
        @case ('trending-down') {
          <path d="M23 18l-9.5-9.5-5 5L1 6"/>
          <path d="M17 18h6v-6"/>
        }
        @case ('file-text') {
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        }
        @case ('clipboard') {
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <rect x="8" y="2" width="8" height="4" rx="1"/>
        }
        @case ('store') {
          <path d="M3 9l1-5h16l1 5M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9M3 9h18"/>
          <path d="M9 21v-6h6v6"/>
        }
        @case ('bag') {
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <path d="M3 6h18"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        }
        @case ('x-circle') {
          <circle cx="12" cy="12" r="10"/>
          <path d="M15 9l-6 6M9 9l6 6"/>
        }
        @case ('alert') {
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <path d="M12 9v4M12 17h.01"/>
        }
        @case ('check') {
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <path d="M22 4 12 14.01l-3-3"/>
        }
      }
    </svg>
  `
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 24;
}
