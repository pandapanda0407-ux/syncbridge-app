import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BLOG_POSTS, BlogPost } from '../../data/blog-posts';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit {
  post: BlogPost | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  /**
   * Post bodies are raw HTML, so their internal links are plain <a href> tags.
   * Left alone those trigger a full document load, which reaches the app as a
   * fresh bootstrap and is refused by the navigation guard. Hand them to the
   * router instead so they count as an in-app click.
   */
  onContentClick(event: MouseEvent) {
    const anchor = (event.target as HTMLElement).closest('a');
    const href = anchor?.getAttribute('href');
    if (!href || !href.startsWith('/')) return;

    event.preventDefault();
    this.router.navigateByUrl(href);
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.post = BLOG_POSTS.find(p => p.slug === slug && !p.draft);

    if (!this.post) {
      // Unknown or unpublished slug — send them to the index rather than a blank page.
      this.router.navigate(['/blog']);
      return;
    }

    {
      const pageTitle = `${this.post.title} | SynceBridge Blog`;
      const url = `https://syncebridge.com/blog/${this.post.slug}`;

      this.titleService.setTitle(pageTitle);
      this.metaService.updateTag({ name: 'description', content: this.post.excerpt });
      this.metaService.updateTag({ property: 'og:title', content: pageTitle });
      this.metaService.updateTag({ property: 'og:description', content: this.post.excerpt });
      this.metaService.updateTag({ property: 'og:url', content: url });
      this.metaService.updateTag({ name: 'twitter:title', content: pageTitle });
      this.metaService.updateTag({ name: 'twitter:description', content: this.post.excerpt });

      // Article schema for Google rich results
      const existing = this.doc.getElementById('article-schema');
      if (existing) existing.remove();
      const script = this.doc.createElement('script');
      script.id = 'article-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: this.post.title,
        description: this.post.excerpt,
        url,
        datePublished: this.post.date,
        author: { '@type': 'Organization', name: 'SynceBridge', url: 'https://syncebridge.com' },
        publisher: { '@type': 'Organization', name: 'SynceBridge', url: 'https://syncebridge.com' }
      });
      this.doc.head.appendChild(script);
    }
  }
}
