import {Component, OnInit} from '@angular/core';
import {MapComponent} from '../../map/map.component';
import {SeoServiceService} from '../../services/seo-service.service';

@Component({
  selector: 'app-about-us',
  imports: [
    MapComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit{

  constructor( private seo: SeoServiceService,
  ) {
  }



  ngOnInit() {
    const aboutWebPage = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "url": "https://seventh-day-adventist-international.vercel.app/about/about-us",
      "name": "About Us - Lifeline SDA International Church",
      "description": "Learn about our church mission, vision, and community initiatives at Lifeline SDA International Church, Herne."
    };

    const aboutBreadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seventh-day-adventist-international.vercel.app/" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://seventh-day-adventist-international.vercel.app/about/about-us" }
      ]
    };

    this.seo.setMeta(
      'About Us | Lifeline SDA International Church',
      'Learn about our mission, vision, and community activities at Lifeline SDA International Church, Herne.',
      [aboutWebPage, aboutBreadcrumb],
      'https://seventh-day-adventist-international.vercel.app/about/about-us'
    );
  }

}
