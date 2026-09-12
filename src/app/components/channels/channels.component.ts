import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { CHANNELS, SHOPIFY_HUB } from '../../data/channels';

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss'
})
export class ChannelsComponent {
  hub = SHOPIFY_HUB;
  channels = CHANNELS;
}
