import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../services/auth.service';
import {SeoServiceService} from '../services/seo-service.service';

@Component({
  selector: 'app-about',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit{

  isLoggedIn= false;
  constructor(private authService:AuthService,
              private seo: SeoServiceService,
              private cdr: ChangeDetectorRef,) {
  }
    ngOnInit(): void {

      // 🔑 subscribe to login state
      this.authService.isLoggedIn().subscribe(status => {
        this.isLoggedIn = status;
        this.cdr.detectChanges();
      });


      this.seo.setMeta(
        'About Us - Lifeline SDA Church, Herne',
        'Learn about Lifeline SDA Church, our mission, vision, history, and dedicated team.',
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seventh-day-adventist-international.vercel.app" },
            { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://seventh-day-adventist-international.vercel.apph/about/about-us" }
          ]
        }
      );
    }



}
