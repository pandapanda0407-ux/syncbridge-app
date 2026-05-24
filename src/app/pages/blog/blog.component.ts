import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BLOG_POSTS } from '../../data/blog-posts';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  posts = BLOG_POSTS;

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Blog — Etsy & Shopify Seller Guides | SynceBridge');
    this.metaService.updateTag({ name: 'description', content: 'Guides, strategies, and tips for sellers running both Etsy and Shopify stores. Learn how to sync inventory, prevent overselling, and grow multi-channel.' });
  }
}
