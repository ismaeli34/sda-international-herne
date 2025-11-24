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

  ngOnInit(): void {

    this.seo.setMeta(
      'Contact Us - Lifeline SDA Church, Herne',
      'Get in touch with Lifeline SDA Church, Herne. Find our address, phone number, email, and service timings.',
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seventh-day-adventist-international.vercel.app" },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://seventh-day-adventist-international.vercel.app/contact" }
        ]
      }
    );

    this.churchInfoService.churchInfo$.subscribe(info => {
      this.serviceTime = info.englishServiceTime;
      this.serviceAddress = info.address;
    });

  }
}
