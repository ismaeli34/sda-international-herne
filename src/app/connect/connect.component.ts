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
    this.seo.setMeta(
      'Connect - Lifeline SDA International Church, Herne',
      'Connect with our church community, join Bible studies, ministries, prayer meetings, and service teams.',
      {
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
      }
    );


    }

}
