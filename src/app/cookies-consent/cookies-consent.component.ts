import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-cookies-consent',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './cookies-consent.component.html',
  styleUrl: './cookies-consent.component.scss'
})
export class CookiesConsentComponent  implements OnInit  {
  showBanner: boolean = false;

  ngOnInit(): void {
    const consent = localStorage.getItem('cookiesConsent');
    if (!consent) {
      this.showBanner = true;
    }
  }

  acceptCookies(): void {
    localStorage.setItem('cookiesConsent', 'true');
    this.showBanner = false;
  }

  closeBanner(): void {
    this.showBanner = false;
  }

}
