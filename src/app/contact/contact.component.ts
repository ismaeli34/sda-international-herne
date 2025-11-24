import { Component } from '@angular/core';
import {ChurchInfoService} from '../services/church-info.service';
import {SeoServiceService} from '../services/seo-service.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  standalone: true,
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  email1 ="kontakt@herne-international-sda.de";
  email2 ="lifeline.herne@gmail.com";

  phone1="+49-1621948601";
  phone2="+49-1621948601";

  address ="Bochumer Str. 229,\n" +
    "            44625 Herne"


  serviceTime = '';
  serviceAddress = '';

  constructor(private churchInfoService: ChurchInfoService,
              private seo: SeoServiceService
              ) {}

  ngOnInit() {
    const contactWebPage = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "url": "https://seventh-day-adventist-international.vercel.app/contact",
      "name": "Contact Us - Lifeline SDA International Church",
      "description": "Contact Lifeline SDA International Church, Herne via email, phone, or visit us at our location."
    };

    const contactBreadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seventh-day-adventist-international.vercel.app/" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://seventh-day-adventist-international.vercel.app/contact" }
      ]
    };

    this.seo.setMeta(
      'Contact | Lifeline SDA International Church',
      'Contact Lifeline SDA International Church, Herne via email, phone, or visit us at our location.',
      [contactWebPage, contactBreadcrumb],
      'https://seventh-day-adventist-international.vercel.app/contact'
    );
  }


}
