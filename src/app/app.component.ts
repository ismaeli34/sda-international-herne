import {AfterViewInit, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {CookiesConsentComponent} from './cookies-consent/cookies-consent.component';
import {FooterComponent} from './footer/footer.component';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import {CommonModule, NgForOf} from '@angular/common';
gsap.registerPlugin(CustomEase);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CookiesConsentComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{


  // Preloader images using your slides
  preloaderImages = [
    '/sda_17.jpeg',
    '/sda_31.jpeg',
    '/sda_27.jpeg',
    '/sda_11.jpeg',
    '/sda_28.jpeg',
    '/sda_36.jpeg',
    '/sda_2.jpeg',
    '/sda_12.jpeg',
    '/sda_16.jpeg',
    '/sda_35.jpeg'
  ];

  ngAfterViewInit(): void {

    window.addEventListener('load', () => this.startPreloader());
  }

  private startPreloader() {
    const preloader = document.querySelector('.preloader') as HTMLElement;
    const preloaderTextCosmic = document.querySelector('.preloader__text-cosmic') as HTMLElement;
    const preloaderTextReflections = document.querySelector('.preloader__text-reflections') as HTMLElement;
    const preloaderImages = document.querySelectorAll('.preloader__image') as NodeListOf<HTMLImageElement>;

    const masterTimeline = gsap.timeline();

    // Show first image
    gsap.set(preloaderImages[0], { opacity: 1, scale: 1 });

    // Animate remaining images
    preloaderImages.forEach((img, i) => {
      if (i > 0) {
        masterTimeline.fromTo(img,
          { opacity: 0, scale: 0.05 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' }
        );
        masterTimeline.to(preloaderImages[i - 1], { opacity: 0, duration: 0.15 }, '<0.1');
      }
    });

    const windowWidth = window.innerWidth;

    // Animate text split
    masterTimeline.to(preloaderTextCosmic, { x: -windowWidth/3, color: 'var(--color-text-primary)', duration: 0.8, ease: 'customEase' }, '-=0.5');
    masterTimeline.to(preloaderTextReflections, { x: windowWidth/3, color: 'var(--color-text-primary)', duration: 0.8, ease: 'customEase' }, '<');

    // Hide preloader
    masterTimeline.to(preloader, { y: '-100%', duration: 0.5, ease: 'power3.inOut', onComplete: () => {
        preloader.style.display = 'none';
      }});
  }


}
