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
    ngOnInit(): void {

      const aboutPage = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://seventh-day-adventist-international.vercel.app/about/about-us",
        "name": "About Lifeline SDA International Church - Herne",
        "description": "Learn about Lifeline SDA International Church in Herne, our mission, vision, and multicultural Christian community."
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seventh-day-adventist-international.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "About", "item": "https://seventh-day-adventist-international.vercel.app/about/about-us" }
        ]
      };

      this.seo.setMeta(
        'About Lifeline SDA International Church - Herne',
        'Learn about our church mission, vision, and community in Herne.',
        [aboutPage, breadcrumb],
        'https://seventh-day-adventist-international.vercel.app/about/about-us'
      );

    }

}
