import { Component, OnInit, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IconComponent } from '../../shared/icon.component';
import { Service, ServiceGroup, findService, groupForService } from '../../data/services';
import { CHANNELS, EARLY_ACCESS_NOTE, FEEDBACK_NOTE } from '../../data/channels';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, IconComponent],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss'
})
export class ServiceDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private doc = inject(DOCUMENT);

  service = signal<Service | undefined>(undefined);
  group = signal<ServiceGroup | undefined>(undefined);
  related = signal<Service[]>([]);

  /** The marketplace-integration page also carries the channel roadmap. */
  isMarketplaceIntegration = signal(false);
  channels = CHANNELS;
  earlyAccessNote = EARLY_ACCESS_NOTE;
  feedbackNote = FEEDBACK_NOTE;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') ?? '';
      const service = findService(slug);

      if (!service) {
        this.router.navigate(['/services']);
        return;
      }

      const group = groupForService(slug);
      this.service.set(service);
      this.group.set(group);
      this.related.set(
        (group?.services ?? []).filter(s => s.slug !== slug).slice(0, 3)
      );
      this.isMarketplaceIntegration.set(slug === 'marketplace-integration');

      this.titleService.setTitle(`${service.title} — SynceBridge`);
      this.metaService.updateTag({ name: 'description', content: service.description });
      this.setSchema(service, group);
    });
  }

  /**
   * Service + breadcrumb schema, so the result line reads
   * "SynceBridge › Services › <service>" rather than a bare URL.
   */
  private setSchema(service: Service, group: ServiceGroup | undefined) {
    const url = `https://syncebridge.com/services/${service.slug}`;

    const existing = this.doc.getElementById('service-schema');
    if (existing) existing.remove();

    const crumbs: unknown[] = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syncebridge.com/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://syncebridge.com/services' }
    ];
    if (group) {
      crumbs.push({
        '@type': 'ListItem',
        position: 3,
        name: group.label,
        item: `https://syncebridge.com/services#${group.id}`
      });
    }
    crumbs.push({
      '@type': 'ListItem',
      position: crumbs.length + 1,
      name: service.title,
      item: url
    });

    const script = this.doc.createElement('script');
    script.id = 'service-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          url,
          provider: { '@id': 'https://syncebridge.com/#organization' },
          areaServed: 'Worldwide'
        },
        { '@type': 'BreadcrumbList', itemListElement: crumbs }
      ]
    });
    this.doc.head.appendChild(script);
  }
}
