import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SeoServiceService} from '../services/seo-service.service';

@Component({
  selector: 'app-connect',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,

  ],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss'
})
export class ConnectComponent implements OnInit{

  constructor(private seo: SeoServiceService) {}

  ngOnInit(): void {
// connect.component.ts
    const connectPage = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": "https://seventh-day-adventist-international.vercel.app/connect",
      "name": "Connect with Lifeline SDA International Church - Herne",
      "description": "Join our community groups, Bible studies, and fellowship opportunities at Lifeline SDA International Church."
    };

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://seventh-day-adventist-international.vercel.app/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Connect",
          "item": "https://seventh-day-adventist-international.vercel.app/connect"
        }
      ]
    };

    this.seo.setMeta(
      'Connect with Lifeline SDA International Church',
      'Join community groups, Bible studies, and fellowship opportunities at Lifeline SDA International Church.',
      [connectPage, breadcrumb],
      'https://seventh-day-adventist-international.vercel.app/connect'
    );
  }

}
