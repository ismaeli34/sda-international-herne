import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WhatsappComponent} from '../whatsapp/whatsapp.component';

import { trigger, style, animate, transition, query, group } from '@angular/animations';
@Component({
  selector: 'app-home',
  imports: [CommonModule, WhatsappComponent],
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
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Joshua 24:15 – "But as for me and my house, we will serve the Lord."', img: '/sda_17.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Matthew 22:37–39 – Jesus said to him, You shall love the Lord your God with all your heart, with all your soul, and with all your mind. This is the first and great commandment. And the second is like it: You shall love your neighbor as yourself."', img: '/sda_12.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'John 13:34–35 - "A new commandment I give to you, that you love one another; as I have loved you, that you also love one another. By this all will know that you are My disciples, if you have love for one another."', img: '/sda_19.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Galatians 6:9 – "And let us not grow weary while doing good, for in due season we shall reap if we do not lose heart."', img: '/sda_4.jpeg' }
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
