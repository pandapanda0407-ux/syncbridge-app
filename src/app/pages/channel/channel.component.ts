import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IconComponent } from '../../shared/icon.component';
import { SeoService } from '../../shared/seo.service';
import { ChannelPage, channelPage } from '../../data/channel-pages';

/**
 * One template for the marketplace pages whose content lives in
 * channel-pages.ts. The channel is taken from the route's `slug` data rather
 * than the URL, so the route table stays the single place a page exists.
 */
@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, IconComponent],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss'
})
export class ChannelComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  channel!: ChannelPage;

  ngOnInit() {
    const slug = this.route.snapshot.data['slug'] as string;
    const page = channelPage(slug);
    if (!page) return;
    this.channel = page;

    this.seo.apply({
      title: page.title,
      description: page.metaDescription,
      path: `/integrations/${page.slug}`,
      breadcrumbs: [{ name: 'Marketplaces', path: '/marketplaces' }],
      faq: page.faq
    });
  }
}
