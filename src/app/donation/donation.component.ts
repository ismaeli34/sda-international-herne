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
    await this.loadBankDetails();
    this.seo.setMeta(
      'Support Us - Lifeline SDA International Church, Herne',
      'Support our church and community programs by donating online. Your contribution makes a difference.',
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seventh-day-adventist-international.vercel.app" },
          { "@type": "ListItem", "position": 2, "name": "Support Us", "item": "https://seventh-day-adventist-international.vercel.app/donation" }
        ]
      }
    );
  }

  // Load bank details image from Firestore
  async loadBankDetails() {
    try {
      // Assuming the bankdetails collection has a single document with id "main"
      const docRef = doc(this.firestore, 'bankdetails', '1');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.bankDetailsImage = docSnap.data()['bank_details'];
        this.cdr.detectChanges(); // manually trigger change detection
      } else {
        console.warn('No bank details found!');
      }
    } catch (error) {
      console.error('Error loading bank details:', error);
    }
  }

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
