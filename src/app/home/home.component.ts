import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WhatsappComponent} from '../whatsapp/whatsapp.component';
import { trigger, style, animate, transition, query, group } from '@angular/animations';
import {HomeGalleryComponent} from './home-gallery/home-gallery.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {FormsModule} from '@angular/forms';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  getDoc,
  doc,
  runTransaction,
  increment, setDoc,
} from '@angular/fire/firestore';
import {LanguageService} from '../services/language.service';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import {ChurchLeadersComponent} from '../about/church-leaders/church-leaders.component';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [CommonModule, WhatsappComponent, HomeGalleryComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [ // when element enters DOM
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),

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
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {

  isLoggedIn = false;
  showPreloader = false;
  showForm = false;
  newTime = '';
  serviceTime = '10:00 AM';
  // **New dynamic fields**
  serviceAddress = 'Bochumer Str. 229, 44625 Herne';
  private intervalId: any;
  currentIndex = 0;
   slides = [
     { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Philippians 4:4: "Rejoice in the Lord always. I will say it again: Rejoice!', img: '/sda_39.jpeg', vision:'Loving God, serving people, and making disciples for His glory.\n' },
     {
       author: 'Welcome to',
       title: 'SDA International',
       topic: 'Church',
       des: 'Psalm 86:9: “All the nations you have made will come and worship before you, Lord; they will bring glory to your name.”',
       img: '/sda_37.jpeg',
       vision: 'Love God deeply, love people genuinely, and lead others to Jesus faithfully.'

     },

     { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Ephesians 6:2: “Honor your father and mother” — which is the first commandment with a promise.', img: '/sda_44.jpeg'
       ,vision: 'Love God with all your heart, love others with grace, and share Christ with the world.'
     },

     { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Hebrews 11:1 – "Now faith is the substance of things hoped for, the evidence of things not seen.', img: '/sda_38.jpeg',        vision: 'Love God deeply, love people genuinely, and lead others to Jesus faithfully.'
     },


     { author: 'Welcome to', title: 'SDA International', topic: 'Church',
       des: 'Revelation 7:9: "After this I looked, and there before me was a great multitude that no one could count, from every nation, tribe, people and language, standing before the throne and before the Lamb. They were wearing white robes and were holding palm branches in their hands."',
       img: '/sda_45.jpeg',
       vision: 'Love God deeply, love people genuinely, and lead others to Jesus faithfully.'
     },



    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Romans 12:10 – "Be devoted to one another in love. Honor one another above yourselves."', img: '/sda_31.jpeg',
      vision: 'Loving God, serving people, and making disciples for His glory.'

    },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Jeremiah 29:11 – "For I know the plans I have for you… plans to give you hope and a future."', img: '/sda_27.jpeg'
    ,vision: 'Love God with all your heart, love others with grace, and share Christ with the world.'
    },

    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'John 13:34–35 – "Love one another as I have loved you. By this everyone will know you are My disciples."', img: '/sda_11.jpeg',
    vision:'We honor God with our hearts, love people with grace, and share His love with all nations.'
    },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Joshua 24:15 – "As for me and my house, we will serve the Lord."', img: '/sda_28.jpeg', vision:'Faithful to God, compassionate to people, committed to the mission.' },
     { author: 'Welcome to', title: 'SDA International', topic: 'Church',  des: 'Hebrews 13:16 – "Do not forget to do good and to share with others, for with such sacrifices God is pleased."', img: '/sda_36.jpeg', vision:'Love God. Cherish people. Help others walk with Jesus.' },
     { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Psalm 133:1 – "How good and pleasant it is when God’s people live together in unity!"', img: '/sda_2.jpeg', vision:'Guided by love — for God, for people, and for the world He loves.' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Ephesians 4:2–3 – "Be humble, gentle, and patient. Keep the unity of the Spirit through the bond of peace."', img: '/sda_12.jpeg', vision:'Love God with joy, love people with kindness, and make disciples with grace.' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'Colossians 3:14 – "Above all, put on love, which binds everything together in perfect unity."', img: '/sda_49.jpeg',vision: 'Together, we love God, care for one another, and share the good news everywhere' },
    { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: 'James 2:17 – "Faith by itself, if it is not accompanied by action, is dead."', img: '/sda_35.jpeg', vision:'Adore God, embrace people, share His hope' },
     { author: 'Welcome to', title: 'SDA International', topic: 'Church', des: '1 Corinthians 1:10 – "Let there be no divisions among you, but be perfectly united in mind and thought."', img: '/sda_17.jpeg', vision: 'Love God deeply, love people genuinely, and lead others to Jesus faithfully.'
     },
   ];
  lang = '';


  youtubeLink ="https://www.youtube.com/@LIFELINE-Herne"
  facebookLink = "https://www.facebook.com/InternationalSDAChurchinHerne/";
  instagramLink ="https://www.instagram.com/internationalsdachurchinherne/"
  emailLink="kontakt@herne-international-sda.de";
  private langSubscription!: Subscription;

  @ViewChild('aboutSection', { static: true }) aboutSection!: ElementRef;

  constructor(     private languageService: LanguageService,        // Inject the service
               private authService:AuthService,
                   private cdr: ChangeDetectorRef,
                   private fireStore: Firestore  // 🔑 inject Firestore


  ) {
  }

  ngOnInit() {
    this.lang = this.languageService.getCurrentLang();

    this.langSubscription = this.languageService.currentLang$.subscribe(lang => {
      this.lang = lang;
      this.cdr.detectChanges(); // Trigger change detection
      console.log("HOME LANG", this.lang);
    });

    // 🔑 subscribe to login state
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });

    this.loadServiceTimeAndAddress();
  }



  goToSlide(index: number) {
    this.currentIndex = index;
  }

  async loadServiceTimeAndAddress() {
    try {
      const docRef = doc(this.fireStore, 'churchTimingAddress', 'main');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        this.serviceTime = data['time'] || this.serviceTime;
        this.serviceAddress = data['address'] || this.serviceAddress;
        this.cdr.detectChanges(); // Update UI
      } else {
        console.log('No church timing document found.');
      }
    } catch (error) {
      console.error('Error loading service info:', error);
    }
  }

  async updateTime() {
    if (this.newTime.trim() && this.serviceAddress.trim()) {
      this.serviceTime = this.newTime;
      this.showForm = false;

      try {
        const docRef = doc(this.fireStore, 'churchTimingAddress', 'main');
        await setDoc(docRef, {
          time: this.serviceTime,
          address: this.serviceAddress
        });
        console.log('Service time and address updated in Firestore');

        // Immediately reload the values for UI
        await this.loadServiceTimeAndAddress();
      } catch (error) {
        console.error('Error updating service info:', error);
      }

      this.newTime = '';
    }
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




  ngAfterViewInit(): void {
    this.intervalId = setInterval(() => this.nextSlide(), 6000);

  }


  toggleForm() {
    this.showForm = !this.showForm;
  }

}
