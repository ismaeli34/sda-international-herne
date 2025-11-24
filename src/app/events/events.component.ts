import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {SeoServiceService} from '../services/seo-service.service';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

@Component({
  selector: 'app-events',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements  OnInit{

  isLoggedIn = false;


  events: Event[] = [
    {
      id: 1,
      title: '2019 Kids Church Camp',
      description: 'Et consequatur nihil odio odit voluptatem qui. Dolores doloribus cupiditate totam esse dolores quod...',
      date: 'Saturday, September 28, 2019',
      time: '8:00AM - 5:30PM',
      location: '1600 Amphitheatre Parkway, Mt. View'
    },
    // Add more events from the HTML content
  ];

  constructor( private authService:AuthService,
               private cdr: ChangeDetectorRef,
               private seo: SeoServiceService
  ) { }

  ngOnInit(): void {

    // 🔑 subscribe to login state
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });

    this.seo.setMeta(
      'Events - Lifeline SDA International Church, Herne',
      'Stay updated with upcoming church events, Sabbath services, baptisms, communion, and special programs.',
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.yoursite.com" },
          { "@type": "ListItem", "position": 2, "name": "Events", "item": "https://www.yoursite.com/events" }
        ]
      }
    );
  }

}
