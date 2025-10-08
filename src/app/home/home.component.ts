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
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: '1 Corinthians 1:10 – "I appeal to you, brothers and sisters, in the name of our Lord Jesus Christ, that all of you agree with one another so that there may be no divisions among you and that you may be perfectly united in mind and thought."', img: '/sda_17.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Romans 12:10 – "Be devoted to one another in love. Honor one another above yourselves."', img: '/sda_31.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Matthew 22:37–39 – Jesus said to him, You shall love the Lord your God with all your heart, with all your soul, and with all your mind. This is the first and great commandment. And the second is like it: You shall love your neighbor as yourself."', img: '/sda_27.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'John 13:34–35 - "A new commandment I give to you, that you love one another; as I have loved you, that you also love one another. By this all will know that you are My disciples, if you have love for one another."', img: '/sda_11.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Joshua 24:15 – "But as for me and my house, we will serve the Lord."', img: '/sda_28.jpeg' },

    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Psalm 133:1 – "Behold, how good and how pleasant it is for brethren to dwell together in unity!"', img: '/sda_2.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Ephesians 4:2–3 – "Be completely humble and gentle; be patient, bearing with one another in love. Make every effort to keep the unity of the Spirit through the bond of peace."', img: '/sda_12.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Colossians 3:14 – "And over all these virtues put on love, which binds them all together in perfect unity."', img: '/sda_16.jpeg' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Philippians 2:2 – "Then make my joy complete by being like-minded, having the same love, being one in spirit and of one mind."', img: '/sda_34.jpeg' },
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
