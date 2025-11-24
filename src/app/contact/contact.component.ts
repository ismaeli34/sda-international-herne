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

    const contactPage = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "url": "https://seventh-day-adventist-international.vercel.app/contact",
      "name": "Contact - Lifeline SDA International Church, Herne",
      "description": "Contact Lifeline SDA International Church Herne for questions, prayer requests, and service info.",
      "mainEntity": {
        "@type": "Organization",
        "name": "Lifeline SDA International Church Herne",
        "url": "https://seventh-day-adventist-international.vercel.app/",
        "logo": "https://seventh-day-adventist-international.vercel.app/sda_icon.svg",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+49-xxxx-xxxxxx",
            "contactType": "General inquiries",
            "availableLanguage": ["English","German"]
          }
        ]
      }
    };

    this.seo.setMeta(
      'Contact - Lifeline SDA International Church, Herne',
      'Get in touch with Lifeline SDA International Church in Herne.',
      contactPage,
      'https://seventh-day-adventist-international.vercel.app/contact'
    );


    this.churchInfoService.churchInfo$.subscribe(info => {
      this.serviceTime = info.englishServiceTime;
      this.serviceAddress = info.address;
    });

  }
}
