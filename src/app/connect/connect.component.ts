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

  ngOnInit() {
    const connectWebPage = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "url": "https://seventh-day-adventist-international.vercel.app/connect",
      "name": "Connect with Us - Lifeline SDA International Church",
      "description": "Get in touch with Lifeline SDA International Church, Herne. Reach out for spiritual guidance, prayer, or community support."
    };

    const connectBreadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seventh-day-adventist-international.vercel.app/" },
        { "@type": "ListItem", "position": 2, "name": "Connect", "item": "https://seventh-day-adventist-international.vercel.app/connect" }
      ]
    };

    this.seo.setMeta(
      'Connect | Lifeline SDA International Church',
      'Reach out to Lifeline SDA International Church, Herne for prayer, spiritual guidance, or community support.',
      [connectWebPage, connectBreadcrumb],
      'https://seventh-day-adventist-international.vercel.app/connect'
    );
  }

}
