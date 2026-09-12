import { Component, OnInit, inject, signal } from '@angular/core';
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
    });
  }
}
