import {ChangeDetectionStrategy, ChangeDetectorRef, Component, signal} from '@angular/core';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import {SeoServiceService} from '../services/seo-service.service';

@Component({
  selector: 'app-donation',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    CommonModule,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss'
})
export class DonationComponent {
  readonly panelOpenState = signal(false);
 // bankdetails = environment.bankDetails;
emailAddress ="kontakt@herne-international-sda.de";
  bankDetailsImage: string | null = null;

  constructor(private firestore: Firestore, private cdr: ChangeDetectorRef,
              private seo: SeoServiceService
  ) {}

  async ngOnInit() {
    const donationWebPage = {
      "@context": "https://schema.org",
      "@type": "DonateAction",
      "url": "https://seventh-day-adventist-international.vercel.app/donation",
      "name": "Support & Donation - Lifeline SDA International Church",
      "description": "Support the mission and community work of Lifeline SDA International Church, Herne through donations."
    };

    const donationBreadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seventh-day-adventist-international.vercel.app/" },
        { "@type": "ListItem", "position": 2, "name": "Donation", "item": "https://seventh-day-adventist-international.vercel.app/donation" }
      ]
    };

    this.seo.setMeta(
      'Donation | Lifeline SDA International Church',
      'Support the mission and community activities of Lifeline SDA International Church, Herne through donations.',
      [donationWebPage, donationBreadcrumb],
      'https://seventh-day-adventist-international.vercel.app/donation'
    );
    this.bankDetailsImage = "./d.png"
  }

  // Load bank details image from Firestore


  // Open image in a new tab (optional)
  openBankDetails() {
    if (this.bankDetailsImage) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(`<img src="${this.bankDetailsImage}" style="width:100%">`);
      }
    }
  }


}
