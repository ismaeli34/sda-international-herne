import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WhatsappComponent} from '../whatsapp/whatsapp.component';

import { trigger, style, animate, transition, query, group } from '@angular/animations';
import {HomeGalleryComponent} from './home-gallery/home-gallery.component';
@Component({
  selector: 'app-home',
  imports: [CommonModule, WhatsappComponent, HomeGalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('carouselFade', [
      transition(':increment', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        group([
          query(':leave', [
            animate('600ms ease', style({ opacity: 0, transform: 'translateY(50px)' })) // slide down
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, transform: 'translateY(-50px)' }), // start above
            animate('600ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true })
        ])
      ]),
      transition(':decrement', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        group([
          query(':leave', [
            animate('600ms ease', style({ opacity: 0, transform: 'translateY(-50px)' })) // slide up
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, transform: 'translateY(50px)' }), // start below
            animate('600ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  private intervalId: any;
   currentIndex = 0;


   slides = [
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: '1 Corinthians 1:10 – "Let there be no divisions among you, but be perfectly united in mind and thought."', img: '/sda_17.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Romans 12:10 – "Be devoted to one another in love. Honor one another above yourselves."', img: '/sda_31.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Matthew 22:37–39 – "Love the Lord your God with all your heart, soul, & mind and love your neighbor as yourself."', img: '/sda_27.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'John 13:34–35 – "Love one another as I have loved you. By this everyone will know you are My disciples."', img: '/sda_11.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Joshua 24:15 – "As for me and my house, we will serve the Lord."', img: '/sda_28.jpeg' },
     { author: 'Welcome to', title: 'SDA International', topic: 'Church',  des: 'Hebrews 13:16 – "Do not forget to do good and to share with others, for with such sacrifices God is pleased."', img: '/sda_36.jpeg' },
     { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Psalm 133:1 – "How good and pleasant it is when God’s people live together in unity!"', img: '/sda_2.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Ephesians 4:2–3 – "Be humble, gentle, and patient. Keep the unity of the Spirit through the bond of peace."', img: '/sda_12.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Colossians 3:14 – "Above all, put on love, which binds everything together in perfect unity."', img: '/sda_16.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'James 2:17 – "Faith by itself, if it is not accompanied by action, is dead."', img: '/sda_35.jpeg' },

   ];


  youtubeLink ="https://www.youtube.com/@LIFELINE-Herne"
  facebookLink = "https://www.facebook.com/InternationalSDAChurchinHerne/";
  instagramLink ="https://www.instagram.com/internationalsdachurchinherne/"
  emailLink="kontakt@herne-international-sda.de";


  constructor() {
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  ngAfterViewInit(): void {


    this.intervalId = setInterval(() => this.nextSlide(), 6000);
  }

  ngOnDestroy(): void {
    // Clear interval when navigating away to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
}
